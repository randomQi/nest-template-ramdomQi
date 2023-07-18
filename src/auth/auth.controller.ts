import { Body, Controller, Post, Req } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import * as requestIp from 'request-ip'
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signin')
  async signin(@Body() dto: any, @Req() req) {

    const token = await this.authService.signin(dto)
    return { access_token: token, ip: requestIp.getClientIp(req) }
  }

  @Post('signup')
  async signup(@Body() dto: any) {
    return this.authService.signup(dto)
  }
}
