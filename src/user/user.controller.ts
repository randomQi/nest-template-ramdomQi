import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService} from "@nestjs/config";
import { User } from "./entities/user.entity";

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService, private  readonly configService: ConfigService) {}

  @Post()
  create(@Body() createUserDto: Partial<User>) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    console.log(this.configService.get('mysql'));
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
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
