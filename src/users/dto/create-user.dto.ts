import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  Length,
  Validate,
} from 'class-validator'
import { PasswordConfirmValidator } from '@validators/password-confirm.validator'
import { UniqueEmailValidator } from '@validators/unique-email.validator'

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  @Validate(UniqueEmailValidator)
  email: string

  @IsNotEmpty()
  userName: string

  @IsNotEmpty()
  @Length(8, 24)
  password: string

  @IsNotEmpty()
  @Length(8, 100000)
  photoUrl: string
}
