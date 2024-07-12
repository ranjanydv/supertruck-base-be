import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoadAssignmentDto } from './dto/create-load_assignment.dto';
import { UpdateLoadAssignmentDto } from './dto/update-load_assignment.dto';
import { LoadAssignment, Status } from './entities/load_assignment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DriverService } from '../driver/driver.service';
import { LoadService } from '../load/load.service';
import { UserService } from '../user/user.service';
import { Load } from '../load/entities/load.entity';
import { LoadStatus } from '../../constants/status.enum';

@Injectable()
export class LoadAssignmentsService {
  constructor(
    private readonly driverService: DriverService,
    private readonly userService: UserService,
    private readonly loadService: LoadService,
    @InjectRepository(LoadAssignment)
    private loadAssignmentsRepository: Repository<LoadAssignment>,
    @InjectRepository(LoadAssignment)
    private loadRepository: Repository<Load>,
  ) {}

  async create(createLoadAssignmentDto: CreateLoadAssignmentDto, assignedBy: number): Promise<LoadAssignment> {
    const loadAssignment = new LoadAssignment();
    loadAssignment.driverId = createLoadAssignmentDto.driverId;
    loadAssignment.loadId = createLoadAssignmentDto.loadId;
    loadAssignment.assignedById = assignedBy;

    // Set default status if not provided
    loadAssignment.status = createLoadAssignmentDto.status || Status.PENDING;

    // Check if assignedBy user exists (optional, depends on business logic)
    const assignedUser = await this.userService.findOne(assignedBy);
    if (!assignedUser) {
      throw new Error(`User with id ${assignedBy} not found`);
    }
    const saved = await this.loadAssignmentsRepository.save(loadAssignment);
    if (saved) await this.loadService.updateLoadStatus(LoadStatus.ASSIGNED, createLoadAssignmentDto.loadId);
    return saved;
  }

  async findAll(): Promise<LoadAssignment[]> {
    return await this.loadAssignmentsRepository.find();
  }

  async findOne(id: number): Promise<LoadAssignment> {
    const loadAssignment = await this.loadAssignmentsRepository.findOne({ where: { id: id }, relations: ['load', 'driver', 'assignedBy'] });
    if (!loadAssignment) {
      throw new NotFoundException(`LoadAssignment with ID ${id} not found`);
    }
    return loadAssignment;
  }

  async loadsOfDriver(id: number): Promise<LoadAssignment[]> {
    return await this.loadAssignmentsRepository.find({ where: { driverId: id }, relations: ['load'] });
  }

  async driversOfLoads(id: number): Promise<LoadAssignment[]> {
    return await this.loadAssignmentsRepository.find({ where: { loadId: id }, relations: ['driver'] });
  }

  async update(id: number, updateLoadAssignmentDto: UpdateLoadAssignmentDto): Promise<LoadAssignment> {
    const findLoadAssignment = await this.findOne(id);
    if (updateLoadAssignmentDto.driverId) {
      await this.driverService.findOne(updateLoadAssignmentDto.driverId);
      findLoadAssignment.driverId = updateLoadAssignmentDto.driverId;
    }

    if (updateLoadAssignmentDto.loadId) {
      await this.loadService.findOne(updateLoadAssignmentDto.loadId);
      findLoadAssignment.loadId = updateLoadAssignmentDto.loadId;
    }

    if (updateLoadAssignmentDto.status) {
      findLoadAssignment.status = updateLoadAssignmentDto.status;
    }

    if (updateLoadAssignmentDto.onboarding_date) {
      findLoadAssignment.onboarding_date = new Date(updateLoadAssignmentDto.onboarding_date);
    }

    if (updateLoadAssignmentDto.completion_date) {
      findLoadAssignment.completion_date = new Date(updateLoadAssignmentDto.completion_date);
    }

    if (updateLoadAssignmentDto.assignedById) {
      await this.userService.findOne(updateLoadAssignmentDto.assignedById);
      findLoadAssignment.assignedById = updateLoadAssignmentDto.assignedById;
    }

    if (updateLoadAssignmentDto.notes) {
      findLoadAssignment.notes = updateLoadAssignmentDto.notes;
    }

    await this.loadAssignmentsRepository.save(findLoadAssignment);
    return findLoadAssignment;
  }

  async remove(id: number): Promise<void> {
    const result = await this.loadAssignmentsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`LoadAssignment with ID ${id} not found`);
    }
  }
}
