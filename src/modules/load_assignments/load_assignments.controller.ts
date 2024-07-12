import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, HttpCode } from '@nestjs/common';
import { LoadAssignmentsService } from './load_assignments.service';
import { CreateLoadAssignmentDto } from './dto/create-load_assignment.dto';
import { UpdateLoadAssignmentDto } from './dto/update-load_assignment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoadAssignment } from './entities/load_assignment.entity';
import { Public } from '../../decorators/is-public.decorator';
import { Request } from 'express';

@Public()
@ApiTags('Load Assignments')
@Controller('load-assignments')
export class LoadAssignmentsController {
  constructor(private readonly loadAssignmentsService: LoadAssignmentsService) {}

  @Post()
  @ApiOperation({ summary: 'Create load assignment' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The load assignment has been successfully created.', type: LoadAssignment })
  async create(@Body() createLoadAssignmentDto: CreateLoadAssignmentDto, @Req() req: Request): Promise<LoadAssignment> {
    console.log(req.user);
    return await this.loadAssignmentsService.create(createLoadAssignmentDto, 1);
  }

  @Get()
  @ApiOperation({ summary: 'Get all load assignments' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all load assignments.', type: [LoadAssignment] })
  async findAll(): Promise<LoadAssignment[]> {
    return await this.loadAssignmentsService.findAll();
  }

  @Public()
  @Get('/drivers/:loadId')
  findAssociatedDrivers(@Param('loadId') loadId: number) {
    return this.loadAssignmentsService.driversOfLoads(+loadId);
  }

  @Public()
  @Get('/loads/:driverId')
  async findAssociatedLoads(@Param('driverId') driverId: number) {
    return await this.loadAssignmentsService.loadsOfDriver(+driverId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get load assignment by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the load assignment with the given ID.', type: LoadAssignment })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load assignment not found.' })
  async findOne(@Param('id') id: string): Promise<LoadAssignment> {
    return await this.loadAssignmentsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update load assignment' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The load assignment has been successfully updated.', type: LoadAssignment })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load assignment not found.' })
  async update(@Param('id') id: string, @Body() updateLoadAssignmentDto: UpdateLoadAssignmentDto): Promise<LoadAssignment> {
    return await this.loadAssignmentsService.update(+id, updateLoadAssignmentDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete load assignment' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The load assignment has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load assignment not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.loadAssignmentsService.remove(+id);
  }
}
