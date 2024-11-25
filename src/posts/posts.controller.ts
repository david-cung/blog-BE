import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { JwtAuthGuard } from "../../src/guard/jwt-auth.guard";
import { User } from "../decorators/user.decorator";
import { AuthenticatedUser } from "../../src/shared/interfaces";

@Controller("posts")
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @User("id") user: AuthenticatedUser,
    @Body() postData: CreatePostDto
  ): Promise<any> {
    return this.postsService.createPost(user.userId, postData);
  }
}
