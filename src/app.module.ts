import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { ConfigModule, ConfigService} from "@nestjs/config";
import { Configuration } from "./utils"
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigEnum } from "./enum/config.enum";
import { User } from "./user/entities/user.entity";
import { ProfileModule } from './profile/profile.module';
import { Profile } from "./profile/entities/profile.entity";
import { LogsModule } from './logs/logs.module';
import { RolesModule } from './roles/roles.module';
import { Role } from "./roles/entities/role.entity";
import { Log } from "./logs/entities/log.entity";
import { AuthModule } from './auth/auth.module';
import { Menu } from "./menu/entities/menu.entity";
@Module({
  imports: [UserModule, MenuModule, ConfigModule.forRoot({isGlobal: true, load: [Configuration]}),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject:[ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type:'mysql',
          username: configService.get('mysql')[ConfigEnum.DB_USERNAME],
          password: configService.get('mysql')[ConfigEnum.DB_PASSWORD],
          host: configService.get('mysql')[ConfigEnum.DB_HOST],
          port: configService.get('mysql')[ConfigEnum.DB_PORT],
          database: configService.get('mysql')[ConfigEnum.DB_DATABASE],
          synchronize: configService.get('mysql')[ConfigEnum.DB_SYNC],
          logging: ['error'],
          entities: [User, Profile, Role, Log]
        }
      }
    }),
    // TypeOrmModule.forRoot(
    //   {  type: "mysql",
    //     host: '127.0.0.1',
    //     port: 3306,
    //     username: 'root',
    //     password: '123456',
    //     database: 'nest-dev',
    //     entities: [],
    //     synchronize: true,
    //     logging: ['error']
    //   })],
    ProfileModule,
    LogsModule,
    RolesModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
