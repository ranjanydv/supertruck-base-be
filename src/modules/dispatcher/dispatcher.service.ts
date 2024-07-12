import { BadRequestException, Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { UpdateDispatcherDto } from './dto/update-dispatcher.dto';
import { DriverService } from '../driver/driver.service';
import { DriverOnboardDto } from './dto/driverOnBoard.dto';
import { Driver } from '../driver/entities/driver.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { DispatcherEntity } from './entities/dispatcher.entity';
import { Public } from '../../decorators/is-public.decorator';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class DispatcherService {
  constructor(
    private readonly driverService: DriverService,
    @InjectRepository(Driver)
    private readonly driverRepo: Repository<Driver>,
    @InjectRepository(DispatcherEntity)
    private readonly dispatcherRepo: Repository<DispatcherEntity>,
    private readonly i18n: I18nService,
  ) {}

  create(createDispatcherDto: CreateDispatcherDto) {
    return 'This action adds a new dispatcher';
  }

  async driverOnboard(onBoardDto: DriverOnboardDto) {
    try {
      // Find the driver using the driver service
      const finDriverResponse = await this.driverService.findOne(onBoardDto.driverId);
      const finDriver = finDriverResponse.data;

      // Find the dispatcher
      const findDispatcherResponse = await this.findOne(onBoardDto.dispatcherId);
      const findDispatcher = findDispatcherResponse.data;

      // Update the driver's dispatcherId
      finDriver.dispatcherId = onBoardDto.dispatcherId;

      // Save the updated driver entity
      return await this.driverRepo.save(finDriver);
    } catch (error) {
      // Handle errors
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all dispatcher`;
  }

  async assignedWithDispatcher(id: number): Promise<Driver[]> {
    const findAssignedDriver = await this.driverRepo.find({ where: { dispatcherId: id }, relations: ['user'] });
    return findAssignedDriver;
  }

  async findOne(dispatcherId: number): Promise<{ data: DispatcherEntity; message: string }> {
    const dispatcher = await this.dispatcherRepo.findOne({ where: { id: dispatcherId } });

    if (!dispatcher) {
      throw new BadRequestException(
        this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
          args: { label: 'Dispatcher' },
        }),
      );
    }

    return {
      data: dispatcher,
      message: this.i18n.t('messages.ORGANIZATION_FETCHED'),
    };
  }

  update(id: number, updateDispatcherDto: UpdateDispatcherDto) {
    return `This action updates a #${id} dispatcher`;
  }

  remove(id: number) {
    return `This action removes a #${id} dispatcher`;
  }
}
