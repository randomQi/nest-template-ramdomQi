import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule} from "@nestjs/config";
import { Configuration } from "./utils"
@Module({
  imports: [UserModule, MenuModule, ConfigModule.forRoot({isGlobal: true, load: [Configuration]})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
