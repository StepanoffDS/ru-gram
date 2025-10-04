import { Auth } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import { FileValidationPipe } from '@/shared/pipes/file-validation.pipe';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { User } from 'prisma/generated';
import { ChangeProfileInfoInput } from './inputs/change-profile-info.input';
import { ProfileService } from './profile.service';

@Auth()
@Resolver('Profile')
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Boolean, { name: 'updateProfileAvatar' })
  public async updateAvatar(
    @Authorized() user: User,
    @Args('avatar', { type: () => GraphQLUpload }, FileValidationPipe)
    avatar: Upload,
  ) {
    return await this.profileService.updateAvatar(user, avatar);
  }

  @Mutation(() => Boolean, { name: 'removeProfileAvatar' })
  public async removeAvatar(@Authorized() user: User) {
    return await this.profileService.removeAvatar(user);
  }

  @Mutation(() => Boolean, { name: 'changeProfileInfo' })
  public async changeProfileInfo(
    @Authorized() user: User,
    @Args('data') changeProfileInfoInput: ChangeProfileInfoInput,
  ) {
    return await this.profileService.changeInfo(user, changeProfileInfoInput);
  }
}
