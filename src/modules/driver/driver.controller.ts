import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DriverService } from './driver.service';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/is-public.decorator';
import { FetchDrvierListSerializer } from './serializer/fetch-driver.serializer';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ListDriverQueryDto } from './dto/list-driver.dto';
import { FetchSingleDriverSerializer } from './serializer/fetch-single-drvier.serializer';

@ApiTags('Drivers')
@Controller('driver')
export class DriverController {
  constructor(private readonly driverService: DriverService) {}

  @Post()
  create(@Body() createDriverDto: CreateDriverDto) {
    return this.driverService.create(createDriverDto);
  }

  @Public()
  @Get()
  async findAll(@Query() query: ListDriverQueryDto) {
    // Promise<FetchDrvierListSerializer>
    const [result, count] = await this.driverService.findAll(query);

    // return plainToClass(FetchDrvierListSerializer, result, {
    //   strategy: "excludeAll",
    // });

    return {
      message: 'Successfully fetched inventory item list by stock',
      data: result,
      pagination: {
        total: count,
      },
    };
  }

  @Public()
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<FetchSingleDriverSerializer> {
    return plainToInstance(FetchSingleDriverSerializer, await this.driverService.findOne(+id), { strategy: 'excludeAll' });
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDriverDto: UpdateDriverDto) {
    return this.driverService.update(+id, updateDriverDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.driverService.remove(+id);
  }
}
