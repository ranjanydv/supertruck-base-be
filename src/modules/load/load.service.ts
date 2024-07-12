import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { Load } from './entities/load.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { I18nService } from 'nestjs-i18n';
import { LoadStatus } from '../../constants/status.enum';

@Injectable()
export class LoadService {
  constructor(
    @InjectRepository(Load)
    private readonly loadsRepository: Repository<Load>,
    private readonly i18n: I18nService,
  ) {}

  async create(createLoadDto: CreateLoadDto) {
    const { brokerId, details, price, rating, status } = createLoadDto;
    const newLoad = new Load();
    if (createLoadDto.brokerId) newLoad.brokerId = createLoadDto.brokerId;
    // newLoad.brokerId = brokerId;
    newLoad.details = details;
    newLoad.price = price;
    newLoad.rating = rating;
    newLoad.status = LoadStatus.UNASSIGNED;

    return await this.loadsRepository.save(newLoad);
  }

  async findAll(): Promise<Load[]> {
    return await this.loadsRepository.find();
  }

  async findOne(id: number): Promise<{ data: Load; message: string }> {
    const load = await this.loadsRepository.findOne({ where: { id: id }, relations: { loadAssignments: { load: true, driver: { user: true } } } });

    // delete load.loadAssignments.driver.user.password;
    if (!load) {
      throw new BadRequestException(
        this.i18n.t('error.NOT_FOUND_IN_DATABASE', {
          args: { label: 'Load' },
        }),
      );
    }

    return {
      data: load,
      message: this.i18n.t('messages.ORGANIZATION_FETCHED'),
    };
  }

  async update(id: number, updateLoadDto: UpdateLoadDto) {
    const load = (await this.findOne(id)).data;
    if (!load) {
      throw new Error(`Load with ID ${id} not found`);
    }
    const { brokerId, details, price, rating, status } = updateLoadDto;

    if (updateLoadDto.brokerId) {
      load.brokerId = brokerId;
    }
    if (updateLoadDto.details) {
      load.details = details;
    }
    if (updateLoadDto.price) {
      load.price = price;
    }
    if (updateLoadDto.rating) {
      load.rating = rating;
    }
    if (updateLoadDto.status) {
      load.status = status;
    }
    return await this.loadsRepository.save(load);
  }

  async remove(id: number): Promise<void> {
    const load = await this.loadsRepository.findOne({ where: { id: id }, relations: { invoices: true, loadAssignments: true, schedules: true } });
    if (load.loadAssignments || load.invoices.length || load.schedules.length) {
      throw new BadRequestException(
        this.i18n.t('error.ASSOCIATED_ENTITY', {
          args: { label: 'Load' },
        }),
      );
    }
    const result = await this.loadsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Load with ID ${id} not found`);
    }
  }

  async updateLoadStatus(status: LoadStatus, id: number) {
    const load = (await this.findOne(id)).data;
    load.status = status;

    return await this.loadsRepository.save(load);
  }
}
