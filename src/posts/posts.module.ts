import { Module } from "@nestjs/common";
import { PostsController } from "./posts.controller";
import { PostsService } from "./posts.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Post } from "../entity/post.entity";
import { AuthModule } from "../../src/auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [PostsService, TypeOrmModule],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
