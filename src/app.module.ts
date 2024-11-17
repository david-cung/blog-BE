import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionFilter } from "./filter/exception.filter";
import appConfig from "@config/app.config";
import authConfig from "@config/auth.config";
import { LoggerModule } from "./logger/logger.module";
import { UserHttpModule } from "./users/user-http.module";
import { AuthModule } from "./auth/auth.module";
import { ValidatorModule } from "@validators/validator.module";
import { PostsModule } from "./posts/posts.module";
import { PostsService } from "./posts/posts.service";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import configurations from "./config";
const { NODE_ENV } = process.env;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig],
    }),
    ConfigModule.forRoot({
      load: configurations,
      isGlobal: true,
      envFilePath: [`.env${NODE_ENV ? `.${NODE_ENV}` : ""}`],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<TypeOrmModuleOptions>("db");
        console.log(config);
        if (!config) {
          throw new Error("Cannot start app without ORM config");
        }
        return config;
      },
      inject: [ConfigService],
    }),
    LoggerModule,
    UserHttpModule,
    AuthModule,
    ValidatorModule,
    PostsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    PostsService,
  ],
})
export class AppModule {}
