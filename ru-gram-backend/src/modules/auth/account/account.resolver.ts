import { Auth } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';
import { RolesAuth } from '@/shared/decorators/roles.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from 'prisma/generated';
import { AccountService } from './account.service';
import { ChangeRoleInput } from './inputs/change-role.input';
import { CreateUserInput } from './inputs/create-user.input';
import { UserModel } from './models/user.model';

@Resolver('Account')
export class AccountResolver {
  public constructor(private readonly accountService: AccountService) {}

  @Auth()
  @RolesAuth(Role.ADMIN)
  @Query(() => [UserModel], { name: 'findAllUsers' })
  public async findAll() {
    return await this.accountService.findAll();
  }

  @Auth()
  @Query(() => UserModel, { name: 'findMe' })
  public async me(@Authorized('id') id: string) {
    return await this.accountService.me(id);
  }

  @Auth()
  @RolesAuth(Role.ADMIN)
  @Mutation(() => UserModel, { name: 'changeRole' })
  public async changeRole(@Args('data') changeRoleInput: ChangeRoleInput) {
    return await this.accountService.changeRole(changeRoleInput);
  }

  @Mutation(() => UserModel, { name: 'createUser' })
  public async create(@Args('data') createUserInput: CreateUserInput) {
    return await this.accountService.create(createUserInput);
  }
}
