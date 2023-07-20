import { Body, Controller, Post, Req, UseFilters } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";
import * as requestIp from 'request-ip'
import SiginDto from "./sigin.dto";
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signin')
  async signin(@Body() dto: SiginDto, @Req() req) {

    const token = await this.authService.signin(dto)
    return { access_token: token, ip: requestIp.getClientIp(req) }
  }

  @Post('signup')
  async signup(@Body() dto: SiginDto) {
    return this.authService.signup(dto)
  }
}
