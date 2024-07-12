import { Expose } from 'class-transformer';

export class DeleteDriverSerializer {
  @Expose()
  message: string;
}
