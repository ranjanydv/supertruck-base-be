import { Controller, Get,Post, Body, Patch, Param, Delete, HttpStatus, HttpCode, Req } from '@nestjs/common';
import { LoadService } from './load.service';
import { CreateLoadDto } from './dto/create-load.dto';
import { UpdateLoadDto } from './dto/update-load.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/is-public.decorator';
import { Load } from './entities/load.entity';
import { FetchSingleDriverSerializer } from '../driver/serializer/fetch-single-drvier.serializer';
import { FetchSingleLoadSerializer } from './serializer/fetch-single-load.serializer';
import { Request } from "express";



@ApiBearerAuth()
@ApiSecurity("access-token")
@ApiTags('Loads')
@Controller('load')
export class LoadController {
  constructor(private readonly loadsService: LoadService) {}

  @Post()
  @ApiOperation({ summary: 'Create load' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'The load has been successfully created.', type: Load })
  async create(@Body() createLoadDto: CreateLoadDto): Promise<Load> {
    return await this.loadsService.create(createLoadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loads' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return all loads.', type: [Load] })
  async findAll(
    @Req() request: Request,

  ): Promise<Load[]> {
    console.log(request.user);
    return await this.loadsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get load by ID' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Return the load with the given ID.', type: Load })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load not found.' })
  async findOne(@Param('id') id: string): Promise<FetchSingleLoadSerializer> {
    return await this.loadsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update load' })
  @ApiResponse({ status: HttpStatus.OK, description: 'The load has been successfully updated.', type: Load })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load not found.' })
  async update(@Param('id') id: string, @Body() updateLoadDto: UpdateLoadDto): Promise<Load> {
    return await this.loadsService.update(+id, updateLoadDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete load' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'The load has been successfully deleted.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Load not found.' })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.loadsService.remove(+id);
  }
}
