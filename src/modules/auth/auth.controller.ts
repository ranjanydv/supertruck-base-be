import { Request } from 'express';
import { plainToClass } from 'class-transformer';
import { Controller, Post, UseGuards, Req, Body } from '@nestjs/common';
import { ApiBadRequestResponse, ApiBearerAuth, ApiBody, ApiOkResponse, ApiSecurity, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

//
import { AuthService } from './auth.service';

//
import { Public } from '../../decorators/is-public.decorator';
import { LocalAuthGuard } from '../../guards/local-auth.guard';

//
import { LoginDto } from './dto/login.dto';

//
import { ErrorResponse } from '../../ResponseDocs/ErrorResponse';
import { AuthLogInSerializer } from './serializer/login.serializer';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { ChangePassworDto } from './dto/change-password.dto';
import { RegisterDto } from './dto/register.dto';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { OtpService } from '../otp/otp.service';

//
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private otpService: OtpService, private userService: UserService, private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: () => LoginDto })
  @Post('/login')
  async login(@Req() req: Request) {
    return plainToClass(
      AuthLogInSerializer,

      await this.authService.login(req.user),
      // { strategy: 'excludeAll' },
    );
  }

  @Public()
  @Post('register')
  async register(@Body() input: CreateUserDto) {
    const resData = await this.userService.create(input);
    return {
      message: 'Registered Successfully.',
      data: resData,
    };
  }

  @Post('/change-password')
  @ApiBearerAuth()
  @ApiSecurity('access-token')
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() data: ChangePassworDto, @Req() request: Request) {
    return this.authService.changePassword(data, request.user);
  }

  // @Public()
  // @Post("/register")
  // async register(@Body() data: RegisterDto) {
  //   return this.authService.register(data);
  // }

  @Public()
  @Post('/forget-password')
  async forgetPassword(@Body() data: ForgetPasswordDto) {
    return this.authService.forgetPasword(data);
  }

  // @Post('/validate/otp')
  // async validateOtp(@Body() data:) {
  //   return this.otpService.validateOtp(data);
  // }
}
