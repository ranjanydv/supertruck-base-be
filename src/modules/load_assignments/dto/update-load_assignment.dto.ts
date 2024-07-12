import { PartialType } from '@nestjs/swagger';
import { CreateLoadAssignmentDto } from './create-load_assignment.dto';

export class UpdateLoadAssignmentDto extends PartialType(CreateLoadAssignmentDto) {}
