import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from '../modules/user/user.service';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsPhoneAlreadyExistConstraint implements ValidatorConstraintInterface {
  constructor(protected userService: UserService) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async validate(phone: any) {
    try {
      const user = await this.userService.validationWithPhone(phone);

      if (user) return false;

      return true;
    } catch (err) {
      return false;
    }
  }
}

export function IsPhoneAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneAlreadyExistConstraint,
    });
  };
}
