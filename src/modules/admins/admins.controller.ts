import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ForbiddenException,
  Req,
} from '@nestjs/common';
import { AdminsService } from './admins.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';
import { SuperAdminGuard } from '../auth/guards/super-admin.guard';

@UseGuards(JwtAuthGuard, AdminRoleGuard)
@Controller('admins')
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  // 🟩 Seulement pour le super admin
  @UseGuards(SuperAdminGuard)
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminsService.create(createAdminDto);
  }

  // 🟩 Seulement pour le super admin
  @UseGuards(SuperAdminGuard)
  @Get()
  findAll() {
    return this.adminsService.findAll();
  }

  // 🟦 Accessible au super admin ou à soi-même
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    const user = req.user;

    if (user.type !== 'super_admin' && user.id !== id) {
      throw new ForbiddenException('You can only access your own profile');
    }

    return this.adminsService.findOne(id);
  }

  // 🟦 Accessible au super admin ou à soi-même
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto, @Req() req) {
    const user = req.user;

    if (user.type !== 'super_admin' && user.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }

    return this.adminsService.update(id, updateAdminDto);
  }

  // 🟩 Seulement pour le super admin
  @UseGuards(SuperAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminsService.remove(id);
  }
}
