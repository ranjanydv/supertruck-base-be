import { Expose, Type } from 'class-transformer';
import { BaseLoadSerializer } from './base-load.serializer';

export class DriverUpdateSerializer {
  @Expose()
  @Type(() => BaseLoadSerializer)
  data: BaseLoadSerializer;

  @Expose()
  message: string;
}
