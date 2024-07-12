import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { BrokerService } from './broker.service';
import { CreateBrokerDto } from './dto/create-broker.dto';
import { UpdateBrokerDto } from './dto/update-broker.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Broker } from './entities/broker.entity';
import { Public } from '../../decorators/is-public.decorator';

@ApiTags('Broker')
@Public()
@Controller('broker')
export class BrokerController {
  constructor(private readonly brokerService: BrokerService) {}

  @Post()
  @ApiOperation({ summary: 'Create broker' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The broker has been successfully created.', type: Broker })
  async create(@Body() createBrokerDto: CreateBrokerDto): Promise<Broker> {
    return this.brokerService.create(createBrokerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all brokers' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all brokers.', type: [Broker] })
  async findAll(): Promise<Broker[]> {
    return this.brokerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get broker by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the broker with the given ID.', type: Broker })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Broker not found.' })
  async findOne(@Param('id') id: string): Promise<Broker> {
    return this.brokerService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update broker' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The broker has been successfully updated.', type: Broker })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Broker not found.' })
  async update(@Param('id') id: string, @Body() updateBrokerDto: UpdateBrokerDto): Promise<Broker> {
    return this.brokerService.update(+id, updateBrokerDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete broker' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The broker has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Broker not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.brokerService.remove(+id);
  }
}
