import { Injectable } from '@nestjs/common';
import { CreateDcoumentTypeDto } from './dto/create-dcoument-type.dto';
import { UpdateDcoumentTypeDto } from './dto/update-dcoument-type.dto';

@Injectable()
export class DcoumentTypeService {
  create(createDcoumentTypeDto: CreateDcoumentTypeDto) {
    return 'This action adds a new dcoumentType';
  }

  findAll() {
    return `This action returns all dcoumentType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dcoumentType`;
  }

  update(id: number, updateDcoumentTypeDto: UpdateDcoumentTypeDto) {
    return `This action updates a #${id} dcoumentType`;
  }

  remove(id: number) {
    return `This action removes a #${id} dcoumentType`;
  }
}
