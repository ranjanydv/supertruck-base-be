import { Expose, Type } from 'class-transformer';
import { UserType } from 'src/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Decimal128 } from 'typeorm';

class UserSerializer {
  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  middleName: string;

  @ApiProperty({ enum: UserType })
  @Expose()
  userType: UserType;
}

export class BaseDriverSerializer {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;

  @Expose()
  license: string;

  @Expose()
  rating: number;

  @Expose()
  documents: any;

  @Expose()
  specifications: any;

  @Expose()
  dispatcherId?: number;

  @Expose()
  created_at: Date;
}

export class BaseSingleDriverSerializer {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserSerializer)
  user: UserSerializer;

  @Expose()
  license: string;

  @Expose()
  vehicleType: string;

  @Expose()
  vehicleCapacity: number;

  @Expose()
  special_certification: string;

  @Expose()
  prefered_routes: string;

  @Expose()
  availability: string;

  @Expose()
  current_latitude: string;

  @Expose()
  current_longitude: string;

  @Expose()
  rating: number;

  @Expose()
  documents: any;

  @Expose()
  specifications: any;

  @Expose()
  dispatcherId?: number;

  @Expose()
  created_at: Date;
}
