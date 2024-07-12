import { verify } from 'argon2';
import { PinoLogger } from 'nestjs-pino';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException, Injectable } from '@nestjs/common';

//

import { ChangePassworDto } from './dto/change-password.dto';

import { IAuthUser } from '../../types/express';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { OtpService } from '../otp/otp.service';

//
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private logger: PinoLogger,
    private jwtService: JwtService,
    private otpService: OtpService,
    private usersService: UserService,
    private mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  /**
   *
   */
  async validateUser(email: string, pass: string): Promise<IAuthUser> {
    const user = await this.usersService.findOneByEmail(email);

    //
    if (!user) {
      throw new BadRequestException('User is not yet registered!');
    }

    //
    const isPasswordMatched = await verify(user.password, pass);
    if (!isPasswordMatched) {
      throw new BadRequestException('Invalid email or password!');
    }

    //
    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      type: user.userType,
    };
  }

  /**
   *
   */
  async login(user: any) {
    const payload = {
      sub: user.id,
      email: user.email,
      // username: user.username,
    };
    const userFind = await this.userRepository.findOne({
      where: {
        id: user.id,
        email: user.email,
      },
    });
    if (!userFind) {
      throw new BadRequestException('User is not yet registered!');
    }

    console.log(userFind);
    delete userFind.password;
    const token = await this.jwtService.sign({ payload });

    return {
      accessToken: this.jwtService.sign({ payload }),
      user: userFind,
    };
  }

  async changePassword(dto: ChangePassworDto, user: any) {
    const userInfo = await this.validateUser(user.email, dto.currentPassword);
    if (userInfo) {
      return this.usersService.changePassword(user.id, dto.newPassword);
    }
  }

  /**
   *
   */

  async register(user: CreateUserDto) {
    const newUser = await this.usersService.create(user);

    //TODO for sending welcome email
    // this.sendSignupEmail(newUser.email, name: newUser.email);

    //
    return {
      success: true,
      message: 'User registered successfully!',
    };
  }

  /**
   *
   */
  async forgetPasword(input: ForgetPasswordDto) {
    const { otp, code, user } = await this.otpService.createOrUpdateOtp(input);

    //
    const resetLink = await this.formatResetLink(code);

    await this.sendResetPasswordMail(user.email, user.firstName + ' ' + user.lastName, resetLink);

    //
    return {
      success: true,
      message: 'Reset link has been sent to your email!',
    };
  }

  //
  async sendResetPasswordMail(email: string, name: string, resetLink: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset Password',
        template: 'forget-password',
        context: { name, resetLink },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }

  /**
   *
   */
  formatResetLink(otp: string) {
    const webUrl = this.configService.get('app.webUrl');

    return `${webUrl}/reset-password/?code=${otp}`;
  }

  /**
   *
   */

  //
  private async sendSignupEmail(email: string, name: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to Seveti',
        template: 'signup',
        context: { name },
      });
    } catch (err) {
      this.logger.error(err);
    }
  }
}
