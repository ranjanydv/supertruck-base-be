import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DispatcherService } from './dispatcher.service';
import { CreateDispatcherDto } from './dto/create-dispatcher.dto';
import { UpdateDispatcherDto } from './dto/update-dispatcher.dto';
import { ApiTags } from '@nestjs/swagger';
import { DriverOnboardDto } from './dto/driverOnBoard.dto';
import { Public } from '../../decorators/is-public.decorator';

@ApiTags('dispatcher')
@Controller('dispatcher')
export class DispatcherController {
  constructor(private readonly dispatcherService: DispatcherService) {}

  @Public()
  @Get()
  findAll() {
    return this.dispatcherService.findAll();
  }

  @Public()
  @Get('/drivers/:dispatcherId')
  async associatedWithDispatcher(@Param('dispatcherId') dispatcherId: number) {
    return await this.dispatcherService.assignedWithDispatcher(dispatcherId);
  }

  @Public()
  @Patch('/driverOnboard')
  async driverOnboard(@Body() data: DriverOnboardDto) {
    return await this.dispatcherService.driverOnboard(data);
  }

  @Post()
  create(@Body() createDispatcherDto: CreateDispatcherDto) {
    return this.dispatcherService.create(createDispatcherDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dispatcherService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDispatcherDto: UpdateDispatcherDto) {
    return this.dispatcherService.update(+id, updateDispatcherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dispatcherService.remove(+id);
  }
}
