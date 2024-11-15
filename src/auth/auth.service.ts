import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../users/user.service'
import { User } from '../entity/user.entity'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Username or password is incorrect')
    }
    const compareResult = await bcrypt.compare(password, user.password)

    if (!compareResult) {
      throw new UnauthorizedException('Username or password is incorrect')
    }

    return user
  }

  async generateJwtToken(user: User): Promise<{ accessToken: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
    }

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('jwtExpiresIn'),
      }),
    }
  }

  async google(user: User): Promise<any> {
    const payload = {
      email: user.email,
      userName: user.userName,
      photoURL: user.photoURL,
      password: '123',
    }
    console.log('user00000', payload)
    const userExisted = await this.userService.findByEmail(user.email)
    if (userExisted) {
      return {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: this.configService.get<string>('jwtExpiresIn'),
        }),
        ...userExisted,
      }
    }
    const createdUser = await this.userService.store(payload)
    console.log('user114444', createdUser)

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: this.configService.get<string>('jwtExpiresIn'),
      }),
      ...createdUser,
    }
  }
}
