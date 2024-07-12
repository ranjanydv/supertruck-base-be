import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DriverScheduleService } from './driver_schedule.service';
import { CreateDriverScheduleDto } from './dto/create-driver_schedule.dto';
import { UpdateDriverScheduleDto } from './dto/update-driver_schedule.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/is-public.decorator';
import { DriverOnboardDto } from '../dispatcher/dto/driverOnBoard.dto';

@Public()
@ApiTags('Driver Schedule')
@Controller('driver-schedule')
export class DriverScheduleController {
  constructor(private readonly driverScheduleService: DriverScheduleService) {}

  @Post()
  async create(@Body() createDriverScheduleDto: UpdateDriverScheduleDto) {
    return await this.driverScheduleService.create(createDriverScheduleDto);
  }

  @Get()
  async findAll() {
    return await this.driverScheduleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.driverScheduleService.findOne(+id);
  }

  @Patch(':id')
  async update(@Body() data: UpdateDriverScheduleDto, @Param('id') id: string) {
    return await this.driverScheduleService.update(+id, data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.driverScheduleService.remove(+id);
  }
}
