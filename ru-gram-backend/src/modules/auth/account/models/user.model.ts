import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from 'prisma/generated';

@ObjectType()
export class UserModel {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  avatarUrl: string;

  @Field(() => String, { nullable: true })
  bio: string;

  @Field(() => String)
  role: Role;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
