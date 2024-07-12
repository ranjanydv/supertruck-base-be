import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { LoadAssignment } from '../load_assignments/entities/load_assignment.entity';
import { imageUploadFilter, multerDiskStorage } from '../../utils/file-upload';
import { ListDriverQueryDto } from './dto/list-driver.dto';
import { I18nService } from 'nestjs-i18n';
import { User } from '../user/entities/user.entity';

@Injectable()
export class DriverService {
  constructor(
    @InjectRepository(Driver)
    private readonly driverRepository: Repository<Driver>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(LoadAssignment)
    private readonly loadAssignedRepo: Repository<LoadAssignment>,
    private readonly i18n: I18nService,
  ) {}

  create(createDriverDto: CreateDriverDto) {
    return 'This action adds a new drivers';
  }

  async findAll(query: ListDriverQueryDto) {
    const takeValue = query.limit ?? 10;
    const skipValue = query.offset ?? 0;

    const orderOptions: Record<string, string> = {};

    //
    if (query.orderBy) {
      orderOptions[query.orderBy] = query.sort ?? 'DESC';
    } else {
      orderOptions['created_at'] = 'DESC';
    }

    let filterOptions: FindOptionsWhere<Driver> | FindOptionsWhere<Driver>[] = {};
    if (query.search) {
      const searchParams = query.search.trim();

      filterOptions = [
        { license: ILike(`%${searchParams}%`) },
        { user: { firstName: ILike(`%${searchParams}%`) } },
        { user: { lastName: ILike(`%${searchParams}%`) } },
      ];
    }

    if (query.dispatcherId) {
      {
        filterOptions = { dispatcherId: query.dispatcherId };
      }
    }

    const resultWithCount = await this.driverRepository.findAndCount({
      take: takeValue,
      skip: skipValue,
      order: orderOptions,
      where: filterOptions,
      relations: { user: true, loadAssignments: { load: true } },
      select: {
        id: true,
        license: true,
        dispatcherId: true,
        created_at: true,
        updated_at: true,
        userId: true,
        user: {
          id: true,
          email: true,
          phone: true,
          firstName: true,
          lastName: true,
          middleName: true,
        },
      },
    });

    return resultWithCount;
  }

  async findOne(driverId: number): Promise<{ data: Driver; message: string }> {
    const driver = await this.driverRepository.findOne({ where: { id: driverId }, relations: { user: true, loadAssignments: { load: true } } });

    if (!driver) {
      throw new BadRequestException(
        this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
          args: { label: 'Driver' },
        }),
      );
    }

    return {
      data: driver,
      message: this.i18n.t('messages.ORGANIZATION_FETCHED'),
    };
  }

  async update(id: number, updateDriverDto: UpdateDriverDto) {
    const driver = (await this.findOne(id)).data;
    if (!driver) {
      throw new NotFoundException(`Driver with ID ${id} not found`);
    }

    const {
      vehicleType,
      vehicleCapacity,
      special_certification,
      prefered_routes,
      availability,
      current_latitude,
      current_longitude,
      rating,
      specifications,
      dispatcherId,
    } = updateDriverDto;

    const { firstName, lastName, middleName, dob } = updateDriverDto;

    if (firstName || lastName || middleName) {
      const user = driver.user;

      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }
      if (middleName) {
        user.middleName = middleName;
      }
      if (dob) {
        user.dob = dob;
      }
      await this.userRepository.save(user);
    }

    if (vehicleType) {
      driver.vehicleType = vehicleType;
    }
    if (vehicleCapacity) {
      driver.vehicleCapacity = vehicleCapacity;
    }
    if (special_certification) {
      driver.special_certification = special_certification;
    }
    if (prefered_routes) {
      driver.prefered_routes = prefered_routes;
    }
    if (availability) {
      driver.availability = availability;
    }
    if (current_latitude) {
      driver.current_latitude = current_latitude;
    }
    if (current_longitude) {
      driver.current_longitude = current_longitude;
    }
    if (rating) {
      driver.rating = rating;
    }

    if (specifications) {
      driver.specifications = specifications;
    }
    if (dispatcherId) {
      driver.dispatcherId = dispatcherId;
    }

    return await this.driverRepository.save(driver);
  }

  async remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
