import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class BaseLoadSerializer {
  @Expose()
  id: number;

  @Expose()
  brokerId: number;

  // @ApiProperty({ type: () => Broker })
  // @Expose()
  // @Type(() => Broker)
  // broker: Broker;

  @Expose()
  details: string;

  @Expose()
  price: number;

  @Expose()
  rating: number;

  @Expose()
  status: string;

  @Expose()
  created_at: Date;
}

export class BaseSingleLoadSerializer {
  @Expose()
  id: number;

  @Expose()
  brokerId: number;

  // @ApiProperty({ type: () => Broker })
  // @Expose()
  // @Type(() => Broker)
  // broker: Broker;

  @Expose()
  details: string;

  @Expose()
  price: number;

  @Expose()
  rating: number;

  @Expose()
  status: string;

  @Expose()
  created_at: Date;
}
