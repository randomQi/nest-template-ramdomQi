import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { UserService } from "../user/user.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('signin')
  async signin(@Body() dto: any) {
    const token = await this.authService.signin(dto)
    return { access_token: token }
  }

  @Post('signup')
  async signup(@Body() dto: any) {
    const {username} = dto
    let promise = await this.userService.findAll(username);
    console.log(promise);
    return this.authService.signup(dto)
  }
}
