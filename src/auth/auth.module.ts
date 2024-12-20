import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserHttpModule } from "../users/user-http.module";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../src/entity/user.entity";

@Global()
@Module({
  imports: [
    UserHttpModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule, TypeOrmModule.forFeature([User])],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwtSecretKey"),
        signOptions: { expiresIn: configService.get<string>("jwtExpiresIn") },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
