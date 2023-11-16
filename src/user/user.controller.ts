import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin/admin.guard';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { doc } from 'prettier';
import isEmpty = doc.utils.isEmpty;

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createUserDto: Partial<User>) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(@Query('username') username: string) {
    console.log(username);
    return this.userService.findAll(username);
  }
  @UseGuards(JwtGuard, AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUserProfile(@Query('id') id: number) {
    console.log(id);
    return this.userService.getUserProfile(id);
  }

  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne({ id });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
