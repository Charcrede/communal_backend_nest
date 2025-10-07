import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { AdminsService } from '../admins/admins.service';
import { User } from '../users/entities/user.entity';
import { Admin } from '../admins/entities/admin.entity';
import { Logger } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private usersService: UsersService,
    private adminsService: AdminsService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateAdmin(email: string, password: string): Promise<Admin | null> {
    try {
      const admin = await this.adminsService.findByEmail(email);
      if (admin && await bcrypt.compare(password, admin.password)) {
        return admin;
      }
      return null;
    } catch (error) {
      this.logger.error('Error in validateAdmin', error);
      throw error; // pour voir le stack complet
    }
  }



  async loginUser(user: User) {
    const payload = { email: user.email, sub: user.id, type: 'user' };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
        updated_at: user.updated_at,
      },
    };
  }

  async loginAdmin(admin: Admin) {
    const payload = { email: admin.email, sub: admin.id, type: 'admin', role: admin.role };
    this.logger.log("Payload for admin login: " + JSON.stringify(payload));
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.JWT_SECRET, expiresIn: process.env.JWT_EXPIRES_IN }),
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        created_at: admin.created_at,
        updated_at: admin.updated_at,
      },
    };
  }
}