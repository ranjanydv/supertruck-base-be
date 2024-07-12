import { Expose, Type } from 'class-transformer';
import { BaseLoadSerializer } from './base-load.serializer';

class Pagination {
  @Expose()
  total: number;
}

export class FetchDrvierListSerializer {
  @Expose()
  @Type(() => BaseLoadSerializer)
  data: BaseLoadSerializer[];

  @Expose()
  @Type(() => Pagination)
  pagination: Pagination;

  @Expose()
  message: string;
}
