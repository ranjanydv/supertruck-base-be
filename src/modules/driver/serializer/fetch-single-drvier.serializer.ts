import { Expose, Type } from 'class-transformer';
import { BaseSingleDriverSerializer } from './base-driver.serializer';

export class FetchSingleDriverSerializer {
  @Expose()
  @Type(() => BaseSingleDriverSerializer)
  data: BaseSingleDriverSerializer;

  @Expose()
  message: string;
}
