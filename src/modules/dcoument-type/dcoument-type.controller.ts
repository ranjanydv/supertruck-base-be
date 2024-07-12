import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DcoumentTypeService } from './dcoument-type.service';
import { CreateDcoumentTypeDto } from './dto/create-dcoument-type.dto';
import { UpdateDcoumentTypeDto } from './dto/update-dcoument-type.dto';

@Controller('dcoument-type')
export class DcoumentTypeController {
  constructor(private readonly dcoumentTypeService: DcoumentTypeService) {}

  @Post()
  create(@Body() createDcoumentTypeDto: CreateDcoumentTypeDto) {
    return this.dcoumentTypeService.create(createDcoumentTypeDto);
  }

  @Get()
  findAll() {
    return this.dcoumentTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dcoumentTypeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDcoumentTypeDto: UpdateDcoumentTypeDto) {
    return this.dcoumentTypeService.update(+id, updateDcoumentTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dcoumentTypeService.remove(+id);
  }
}
