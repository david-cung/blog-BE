import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { UserSubscriber } from "./subscriber/user.subscriber";
import { User } from "../../src/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, User])],
  providers: [UserSubscriber],
  exports: [TypeOrmModule],
})
export class UserModule {}
