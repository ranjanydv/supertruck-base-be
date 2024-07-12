import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { BaseSingleLoadSerializer } from './base-load.serializer';

export class FetchSingleLoadSerializer {
  @ApiProperty({
    description: 'Fetch Brand Message',
    example: 'Drvier Abc is Fetched.',
    type: String,
  })
  @Expose()
  message: string;

  @ApiProperty({
    description: 'Base Driver Data',
    type: BaseSingleLoadSerializer,
  })
  @Expose()
  @Type(() => BaseSingleLoadSerializer)
  data: BaseSingleLoadSerializer;
}
