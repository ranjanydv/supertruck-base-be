import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDriverScheduleDto } from './dto/create-driver_schedule.dto';
import { UpdateDriverScheduleDto } from './dto/update-driver_schedule.dto';
import { DriverSchedule } from './entities/driver_schedule.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoadService } from '../load/load.service';
import { DriverService } from '../driver/driver.service';

@Injectable()
export class DriverScheduleService {
  constructor(
    private readonly loadService: LoadService,
    private readonly driverService: DriverService,
    @InjectRepository(DriverSchedule)
    private driverScheduleRepository: Repository<DriverSchedule>,
  ) {}

  async create(createDriverScheduleDto: UpdateDriverScheduleDto) {
    const { driverId, loadId, start, end } = createDriverScheduleDto;

    const newDriverSchedule = new DriverSchedule();
    newDriverSchedule.driverId = driverId;
    newDriverSchedule.loadId = loadId;
    newDriverSchedule.start = start;
    newDriverSchedule.end = end;

    return await this.driverScheduleRepository.save(newDriverSchedule);
  }

  async findAll(): Promise<DriverSchedule[]> {
    return await this.driverScheduleRepository.find();
  }

  async findOne(id: number): Promise<DriverSchedule> {
    const driverSchedule = await this.driverScheduleRepository.findOne({ where: { id: id } });
    if (!driverSchedule) {
      throw new NotFoundException(`DriverSchedule with ID ${id} not found`);
    }
    return driverSchedule;
  }

  async update(id: number, updateDriverScheduleDto: UpdateDriverScheduleDto): Promise<DriverSchedule> {
    const driverSchedule = await this.findOne(id);
    const { driverId, loadId, start, end } = updateDriverScheduleDto;

    if (driverId) {
      await this.driverService.findOne(driverId);
      driverSchedule.driverId = driverId;
    }
    if (loadId) {
      await this.loadService.findOne(loadId);
      driverSchedule.loadId = loadId;
    }
    if (start) {
      driverSchedule.start = start;
    }
    if (end) {
      driverSchedule.end = end;
    }
    return await this.driverScheduleRepository.save(driverSchedule);
  }

  async remove(id: number): Promise<void> {
    const result = await this.driverScheduleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`DriverSchedule with ID ${id} not found`);
    }
  }
}
