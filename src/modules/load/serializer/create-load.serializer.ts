import { Expose, Type } from 'class-transformer';
import { BaseLoadSerializer } from './base-load.serializer';

export class CreateDriversSerializer {
  @Expose()
  @Type(() => BaseLoadSerializer)
  data: BaseLoadSerializer;

  @Expose()
  message: string;
}
