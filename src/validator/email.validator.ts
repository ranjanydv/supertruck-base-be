import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../modules/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsEmailAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(protected userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(userName: any) {
    try {
      const user = await this.userService.validationWithEmail(userName);

      if (user) return false;

      return true;
    } catch (err) {
      return false;
    }
  }
}

export function IsEmailAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint,
    });
  };
}
