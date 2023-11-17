import { Body, Controller, Post, Req, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import * as requestIp from 'request-ip';
import SiginDto from './sigin.dto';
import { ApiQuery, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('用户管理')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiOperation({
    description: '用户登录',
    summary: '此接口用户登录使用',
  })
  @ApiQuery({
    name: 'username',
    description: '用户名',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'password',
    description: '密码',
    required: true,
    type: 'string',
  })
  @Post('signin')
  async signin(@Body() dto: SiginDto, @Req() req) {
    const token = await this.authService.signin(dto);
    return { access_token: token, ip: requestIp.getClientIp(req) };
  }

  @ApiOperation({
    description: '用户注册',
    summary: '此接口用户注册使用',
  })
  @ApiQuery({
    name: 'username',
    description: '用户名',
    required: true,
    type: 'string',
  })
  @ApiQuery({
    name: 'password',
    description: '密码',
    required: true,
    type: 'string',
  })
  @Post('signup')
  async signup(@Body() dto: SiginDto) {
    return this.authService.signup(dto);
  }
}
