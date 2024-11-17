import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  image: string;

  @IsString()
  category: string;

  @IsString()
  slug: string;
}
