import { PartialType } from '@nestjs/mapped-types';
import { CreateDcoumentTypeDto } from './create-dcoument-type.dto';

export class UpdateDcoumentTypeDto extends PartialType(CreateDcoumentTypeDto) {}
