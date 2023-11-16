import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}
  async signin(dto: any) {
    const { username, password } = dto;
    const promise = await this.userService.findOne({ username });
    if (!promise) {
      throw new ForbiddenException('用户不存在，请注册！！！');
    }
    const booleanPromise = await argon2.verify(promise.password, password);
    if (!booleanPromise) {
      throw new ForbiddenException('用户名或密码错误！！！！');
    } else {
      return await this.jwtService.signAsync({ username: promise.username, sub: promise.id });
    }
  }
  async signup(dto: any) {
    // const { username } = dto
    // let promise = await this.userService.findOne({ username });
    // if (promise?.username === username) {
    //   throw new ForbiddenException('用户名已存在')
    // }
    dto.password = await argon2.hash(dto.password);
    const promise = await this.userService.create(dto);
    console.log(promise);
    // this.userService.
    return '注册成功';
  }
}
