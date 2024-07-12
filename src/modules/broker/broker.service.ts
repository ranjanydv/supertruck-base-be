import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { Broker } from './entities/broker.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BrokerService {
  constructor(
    @InjectRepository(Broker)
    private brokersRepository: Repository<Broker>,
  ) {}

  async create(createBrokerDto: CreateBrokerDto): Promise<Broker> {
    const broker = new Broker();
    broker.company_name = createBrokerDto.company_name;
    broker.rating = createBrokerDto.rating;

    return this.brokersRepository.save(broker);
  }

  async findAll(): Promise<Broker[]> {
    return this.brokersRepository.find();
  }

  async findOne(id: number): Promise<Broker> {
    const broker = await this.brokersRepository.findOne({ where: { id: id } });
    if (!broker) {
      throw new NotFoundException(`Broker with ID ${id} not found`);
    }
    return broker;
  }

  async update(id: number, updateBrokerDto: UpdateBrokerDto): Promise<Broker> {
    await this.brokersRepository.update(id, updateBrokerDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.brokersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Broker with ID ${id} not found`);
    }
  }
}
