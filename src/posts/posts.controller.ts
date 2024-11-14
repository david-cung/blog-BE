import { Body, Controller, Post } from '@nestjs/common'
import { PostsService } from './posts.service'
import { CreatePostDto } from './dto/create-post.dto'

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  createPost(@Body() postData: CreatePostDto): Promise<any> {
    return this.postsService.createPost(postData)
  }
}
