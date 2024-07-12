import { Expose, Type } from 'class-transformer';
import { BaseDriverSerializer } from './base-driver.serializer';

class Pagination {
  @Expose()
  total: number;
}

export class FetchDrvierListSerializer {
  @Expose()
  @Type(() => BaseDriverSerializer)
  data: BaseDriverSerializer[];

  @Expose()
  @Type(() => Pagination)
  pagination: Pagination;

  @Expose()
  message: string;
}
