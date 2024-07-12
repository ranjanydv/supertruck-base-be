import { Expose } from 'class-transformer';

export class DeleteLoadSerializer {
  @Expose()
  message: string;
}
