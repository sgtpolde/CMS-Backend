import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './models/register.dto';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt/dist';
import { Response, Request } from 'express';
import { Get, Req, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from './auth.guard';
import { UseInterceptors } from '@nestjs/common/decorators/core/use-interceptors.decorator';
import { AuthService } from './auth.service';
import { RoleService } from 'src/roles/role.service';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  //Constructor
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private authService: AuthService,
    private roleService: RoleService,
  ) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    // Check if passwords match
    if (body.password !== body.password_confirm) {
      throw new BadRequestException('Passwords do not match!');
    }

    // Hash password
    const hashed = await bcrypt.hash(body.password, 12);

    const roleName = body.roles || 'employee';;
    // Fetch the default 'employee' role from the database
    const selectedRole = await this.roleService.findOne({
      where: { name: roleName },
    });

    console.log(selectedRole);
    // Check if the default role exists
    if (!selectedRole) {
      throw new NotFoundException('Default role not found');
    }

    // Create the user with the default role assigned
    return this.userService.create({
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      password: hashed,
      roles: [selectedRole], // Assign the default role
    });
  }

  //Login Controller
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    //Get user email
    const user = await this.userService.findOne({ where: { email } });
    //If user does not exist, throw error
    if (!user) {
      throw new NotFoundException('user not found');
    }
    //If passwords don't match, throw error
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid credentials (password)');
    }
    //JwtToken for user id
    const jwtToken = await this.jwtService.signAsync({ id: user.id });
    response.cookie('jwt', jwtToken, { httpOnly: true });

    return user;
  }

  //Get logged in user (/me)
  @UseGuards(AuthGuard)
  @Get('me')
  async user(@Req() request: Request) {
    const id = await this.authService.userId(request);
    //Return user data by jwtToken (Search by userId)
    return this.userService.findOne({ where: { id } });
  }

  //Logout
  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success (Logged out)',
    };
  }
}
