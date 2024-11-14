/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common'
import { plainToClass } from 'class-transformer'
import { User } from '../entity/user.entity'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthService } from './auth.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { UserService } from '../users/user.service'
import { AuthUser } from '../decorators/auth.user.decorator'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Body() user): Promise<{ accessToken: string }> {
    return this.authService.generateJwtToken(user)
  }

  // @UseGuards(LocalAuthGuard)
  @Post('/google')
  google(@Body() user): Promise<any> {
    return this.authService.google(user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async myProfile(@Request() request, @AuthUser() authUser): Promise<any> {
    const user = await this.userService.findById(authUser.sub)

    return {
      ...plainToClass(User, user),
      authUser,
    }
  }
}
