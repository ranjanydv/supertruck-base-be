import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoadRequestEntity } from './entities/load-request.entity';
import { CreateLoadRequestDto } from './dto/create-load-request.dto';
import { UpdateLoadRequestDto } from './dto/update-load-request.dto';
import { DriverService } from '../driver/driver.service';
import { LoadService } from '../load/load.service';

@Injectable()
export class LoadRequestsService {
  constructor(

    private readonly loadService:LoadService,
    private readonly driverService: DriverService,

    @InjectRepository(LoadRequestEntity)
    private readonly loadRequestRepository: Repository<LoadRequestEntity>,
  ) {}

  async create(createLoadRequestDto: CreateLoadRequestDto): Promise<LoadRequestEntity> {

    const loadRequest = new LoadRequestEntity()
    const load= (await this.loadService.findOne(createLoadRequestDto.loadId)).data
    loadRequest.loadId = load.id

    const driver= (await this.driverService.findOne(createLoadRequestDto.driverId)).data
    loadRequest.driverId = driver.id
    return this.loadRequestRepository.save(loadRequest);
  }

  async findAll(): Promise<LoadRequestEntity[]> {
    return this.loadRequestRepository.find();
  }

  async findOne(id: number): Promise<LoadRequestEntity> {


    const loadRequest = await this.loadRequestRepository.findOne({ where: { id:id } });
    if (!loadRequest) {
      throw new NotFoundException(`LoadRequest with ID ${id} not found`);
    }
    return loadRequest;
  }

  async update(id: number, updateLoadRequestDto: UpdateLoadRequestDto): Promise<LoadRequestEntity> {

    const loadRequest = await this.findOne(id);
    if(updateLoadRequestDto.loadId){
      const load= (await this.loadService.findOne(updateLoadRequestDto.loadId)).data
      loadRequest.loadId = load.id
    }

    if(updateLoadRequestDto.driverId){
      const driver= (await this.driverService.findOne(updateLoadRequestDto.driverId)).data
      loadRequest.driverId = driver.id
    }

    if(updateLoadRequestDto.status) loadRequest.status = updateLoadRequestDto.status

    return await this.loadRequestRepository.save(loadRequest)
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.loadRequestRepository.delete(id);
    if (deleteResult.affected === 0) {
      throw new NotFoundException(`LoadRequest with ID ${id} not found`);
    }
  }
}
