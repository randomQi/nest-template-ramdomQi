import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '../guards/admin/admin.guard';
import { JwtGuard } from '../guards/jwt/jwt.guard';
import { doc } from 'prettier';
import isEmpty = doc.utils.isEmpty;
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private readonly configService: ConfigService) {}

  @Post()
  create(@Body() createUserDto: Partial<User>) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ description: '查询用户列表', summary: '查询用户列表' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(JwtGuard, AdminGuard)
  // @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  getUserProfile(@Query('id') id: number) {
    return this.userService.getUserProfile(id);
  }

  @ApiOperation({ description: '查询用户信息', summary: '查询用户信息' })
  // @UseGuards(AuthGuard('jwt'))
  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.userService.findOne({ id });
  }

  @ApiOperation({ description: '修改用户信息', summary: '修改用户信息' })
  @ApiQuery({ name: 'id', description: '用户id', required: true })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Partial<User>) {
    return this.userService.update(+id, updateUserDto);
  }

  @ApiOperation({ description: '删除用户', summary: '删除用户' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
