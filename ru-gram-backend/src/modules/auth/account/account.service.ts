import { PrismaService } from '@/core/prisma/prisma.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { type User } from 'prisma/generated';
import { ChangeEmailInput } from './inputs/change-email.input';
import { ChangePasswordInput } from './inputs/change-password.input';
import { ChangeRoleInput } from './inputs/change-role.input';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  public async me(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    return user;
  }

  public async changeRole(changeRoleInput: ChangeRoleInput) {
    const { id, role } = changeRoleInput;

    const user = await this.prisma.user.update({
      where: { id },
      data: { role },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  public async create(createUserInput: CreateUserInput) {
    const { email, username, password } = createUserInput;

    const isUsernameExists = await this.prisma.user.findUnique({
      where: { username },
    });

    if (isUsernameExists) {
      throw new BadRequestException('Данный username уже занят');
    }

    const isEmailExists = await this.prisma.user.findUnique({
      where: { email },
    });

    if (isEmailExists) {
      throw new BadRequestException('Данный email уже занят');
    }

    const user = await this.prisma.user.create({
      data: { email, username, password: await hash(password) },
    });

    return user;
  }

  public async changeEmail(user: User, changeEmailInput: ChangeEmailInput) {
    const { newEmail, password } = changeEmailInput;

    const isUserExists = await this.prisma.user.findUnique({
      where: { id: user.id },
    });

    if (!isUserExists) {
      throw new NotFoundException('Пользователь не найден');
    }

    const isValidPassword = await verify(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { email: newEmail },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException('Не удалось изменить email');
    }

    return true;
  }

  public async changePassword(
    user: User,
    changePasswordInput: ChangePasswordInput,
  ) {
    const { currentPassword, newPassword, confirmNewPassword } =
      changePasswordInput;

    const isNewPassword = await verify(user.password, newPassword);

    if (isNewPassword) {
      throw new BadRequestException(
        'Новый пароль должен отличаться от текущего',
      );
    }

    const isValidPassword = await verify(user.password, currentPassword);

    if (!isValidPassword) {
      throw new UnauthorizedException('Неверный пароль');
    }

    if (newPassword !== confirmNewPassword) {
      throw new BadRequestException('Новые пароли не совпадают');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: user.id },
      data: { password: await hash(newPassword) },
    });

    if (!updatedUser) {
      throw new InternalServerErrorException('Не удалось изменить пароль');
    }

    return true;
  }
}
