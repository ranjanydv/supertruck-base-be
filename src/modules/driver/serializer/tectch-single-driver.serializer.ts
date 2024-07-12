import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseDriverSerializer } from './base-driver.serializer';

export class FetchSingleDrvierSerializer {
  @ApiProperty({
    description: 'Fetch Brand Message',
    example: 'Drvier Abc is Fetched.',
    type: String,
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: 'Base Driver Data',
    type: BaseDriverSerializer,
  })
  @Expose()
  @Type(() => BaseDriverSerializer)
  data: BaseDriverSerializer;
}
