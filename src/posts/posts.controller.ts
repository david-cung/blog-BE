import { Body, Controller, Post } from "@nestjs/common";
import { PostsService } from "./posts.service";
import { CreatePostDto } from "./dto/create-post.dto";
import { User } from "../decorators/auth.user.decorator";

@Controller("posts")
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(
    @User("id") userId: number,
    @Body() postData: CreatePostDto
  ): Promise<any> {
    return this.postsService.createPost(postData);
  }
}
