import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserType } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { Driver } from '../driver/entities/driver.entity';
import { DispatcherEntity } from '../dispatcher/entities/dispatcher.entity';
import * as argon from 'argon2';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
    @InjectRepository(DispatcherEntity)
    private readonly dispatcherRepo: DispatcherEntity,
    @InjectRepository(Driver)
    private readonly driverRepo: Driver,
    private readonly i18n: I18nService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    // const finUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    // if (User) {
    //   throw new BadRequestException('User already exists');
    // }
    let savedUser: User;
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const user = new User();
      user.email = createUserDto.email;
      user.phone = createUserDto.phone;
      user.firstName = createUserDto.firstName;
      user.lastName = createUserDto.lastName;
      user.middleName = createUserDto.middleName;
      user.dob = createUserDto.dob;
      user.password = await argon.hash(createUserDto.password);
      user.userType = createUserDto.userType;

      savedUser = await transactionalEntityManager.save(user);

      if (createUserDto.userType === UserType.DISPATCHER) {
        const newDispather = new DispatcherEntity();
        newDispather.userId = savedUser.id;

        await transactionalEntityManager.save(newDispather);
      }
      if (createUserDto.userType === UserType.DRIVER) {
        const newDriver = new Driver();
        newDriver.userId = savedUser.id;

        await transactionalEntityManager.save(newDriver);
      }
    });
    return savedUser;
  }

  async registerUser(createUserDto: CreateUserDto) {
    const user = new User();
    const savedUser = await this.userRepository.save(user);
    return savedUser;
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number): Promise<{ data: User; message: string }> {
    const findUser = await this.userRepository.findOne({ where: { id: id } });

    if (!findUser) {
      throw new BadRequestException(
        this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
          args: { label: 'User' },
        }),
      );
    }

    return {
      data: findUser,
      message: this.i18n.t('messages.ORGANIZATION_FETCHED'),
    };
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let savedUser: User;
    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const user = (await this.findOne(id)).data;
      user.email = updateUserDto.email;
      user.phone = updateUserDto.phone;
      user.firstName = updateUserDto.firstName;
      user.lastName = updateUserDto.lastName;
      user.middleName = updateUserDto.middleName;
      user.dob = updateUserDto.dob;
      savedUser = await transactionalEntityManager.save(user);
    });
    return savedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async changePassword(userId: number, newPassword: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    user.password = await argon.hash(newPassword);

    await this.userRepository.save(user);

    return 'Password changed successfully';
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { email },
      withDeleted: false,
    });
  }

  async validationWithEmail(email: string): Promise<User> {
    console.log('email', email);
    const userfind = await this.userRepository.findOne({
      where: { email: email },
      withDeleted: true,
    });

    return userfind;
  }

  async validationWithPhone(phone: string): Promise<User> {
    return this.userRepository.findOne({
      where: { phone },
      withDeleted: true,
    });
  }
}
