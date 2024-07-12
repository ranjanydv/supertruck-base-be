import { Injectable } from '@nestjs/common';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FirebaseService } from './firebase-service.service';
import { UserService } from '../user/user.service';
import { DcoumentTypeService } from '../dcoument-type/dcoument-type.service';
import { Document } from '../document/entities/document.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { generateSlug } from '../../utils/utils';
import { DocumentType } from '../dcoument-type/entities/dcoument-type.entity';

@Injectable()
export class UploadService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
    @InjectRepository(DocumentType)
    private readonly documentTypeRepo: Repository<DocumentType>,
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  async upload(file: any, userId: number, type: string) {
    const storage = this.firebaseService.getStorageInstance();
    const bucket = storage.bucket();
    const fileName = `${Date.now()}_${file.originalname}`;
    const fileUpload = bucket.file(fileName);

    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    let typeFind;
    const findUser = (await this.userService.findOne(userId)).data;
    typeFind = await this.documentTypeRepo.findOne({ where: { slug: generateSlug(type) } });
    if (!typeFind) {
      const newType = new DocumentType();
      newType.name = type;
      newType.slug = generateSlug(type);
      newType.description = type;

      typeFind = await this.documentTypeRepo.save(newType);
    }
    const document = new Document();
    document.typeId = typeFind.id;
    document.userId = findUser.id;
    await this.documentRepo.save(document);

    new Promise((resolve, reject) => {
      stream.on('error', (error) => {
        reject(error);
      });
      stream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${{ fileName }}`;
        resolve(imageUrl);
      });
      stream.end(file.buffer);
    });
  }

  create(createUploadDto: CreateUploadDto) {
    return 'This action adds a new upload';
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
