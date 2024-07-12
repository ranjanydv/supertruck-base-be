import { Expose, Type } from 'class-transformer';
import { BaseDriverSerializer } from './base-driver.serializer';

export class DriverUpdateSerializer {
  @Expose()
  @Type(() => BaseDriverSerializer)
  data: BaseDriverSerializer;

  @Expose()
  message: string;
}
