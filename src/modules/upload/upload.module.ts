import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FirebaseService } from './firebase-service.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../document/entities/document.entity';
import { DocumentType } from '../dcoument-type/entities/dcoument-type.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Document, DocumentType])],
  controllers: [UploadController],
  providers: [UploadService, FirebaseService],
})
export class UploadModule {}
