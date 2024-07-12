import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoadRequestsService } from './load-requests.service';
import { CreateLoadRequestDto } from './dto/create-load-request.dto';
import { UpdateLoadRequestDto } from './dto/update-load-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '../../decorators/is-public.decorator';


@Public()
@ApiTags("Load-Request")
@Controller('load-requests')
export class LoadRequestsController {
  constructor(private readonly loadRequestsService: LoadRequestsService) {}

  @Post()
  create(@Body() createLoadRequestDto: CreateLoadRequestDto) {
    return this.loadRequestsService.create(createLoadRequestDto);
  }

  @Get()
  findAll() {
    return this.loadRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loadRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoadRequestDto: UpdateLoadRequestDto) {
    return this.loadRequestsService.update(+id, updateLoadRequestDto);
  }

  @Patch('driver/accept/:id')
  updateByDriver(@Param('id') id: string, @Body() updateLoadRequestDto: UpdateLoadRequestDto) {
    return this.loadRequestsService.update(+id, updateLoadRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loadRequestsService.remove(+id);
  }
}
