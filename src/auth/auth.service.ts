import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService:JwtService) {
  }
  async signin(dto: any) {
    const { username, password } = dto
    const promise = await this.userService.findOne({ username });
    if (password === promise.password) {
      return  await  this.jwtService.signAsync({username: promise.username, sub: promise.id})
    }
    throw new UnauthorizedException()
  }
  signup(dto: any){
    return '你的注册信息是：' + JSON.stringify(dto)
  }
}
