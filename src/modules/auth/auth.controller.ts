import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthService.name);
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.loginUser(user);
  }

  @Post('admin/login')
  async adminLogin(@Body() loginDto: { email: string; password: string }) {
    const admin = await this.authService.validateAdmin(loginDto.email, loginDto.password);
    if (!admin) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.loginAdmin(admin);
  }
}