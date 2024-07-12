import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadFilter, multerDiskStorage } from '../../utils/file-upload';
import { Public } from '../../decorators/is-public.decorator';

@Public()
@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: imageUploadFilter,
      // storage: multerDiskStorage,
    }),
  )
  async upload(@Body() createFile: CreateUploadDto, @UploadedFile() file?: Express.Multer.File) {
    return await this.uploadService.upload(file, createFile.userId, createFile.type);
  }
}
