import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsBoolean, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class UpdatePostInput {
  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  title: string;

  @Field(() => String)
  @IsString()
  @IsNotEmpty()
  text: string;

  @Field(() => [String])
  @IsArray()
  @IsNotEmpty()
  images: string[];

  @Field(() => Boolean)
  @IsBoolean()
  @IsNotEmpty()
  hidden: boolean;
}
