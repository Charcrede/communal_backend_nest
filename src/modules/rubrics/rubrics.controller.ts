import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RubricsService } from './rubrics.service';
import { CreateRubricDto } from './dto/create-rubric.dto';
import { UpdateRubricDto } from './dto/update-rubric.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AdminRoleGuard } from '../auth/guards/admin-role.guard';

@Controller('rubrics')
export class RubricsController {
  constructor(private readonly rubricsService: RubricsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  create(@Body() createRubricDto: CreateRubricDto) {
    return this.rubricsService.create(createRubricDto);
  }

  @Get()
  findAll() {
    return this.rubricsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rubricsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  update(@Param('id') id: string, @Body() updateRubricDto: UpdateRubricDto) {
    return this.rubricsService.update(id, updateRubricDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, AdminRoleGuard)
  remove(@Param('id') id: string) {
    return this.rubricsService.remove(id);
  }
}