import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // todo 业务逻辑
    const request = context.switchToHttp().getRequest();
    // 查询用户信息
    // const userProfile = await this.userService.getUserProfile(2);
    console.log(request.path);
    return true;
  }
}
