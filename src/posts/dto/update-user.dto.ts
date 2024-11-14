import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator'
import { UniqueEmailValidator } from '@validators/unique-email.validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string

  @IsOptional()
  userName: string

  @IsOptional()
  @Length(8, 24)
  password: string

  @IsOptional()
  @Length(8, 100000)
  photoURL: string
}
