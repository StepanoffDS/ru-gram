import { PrismaService } from '@/core/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { CreateUserInput } from './inputs/create-user.input';

@Injectable()
export class AccountService {
  public constructor(private readonly prisma: PrismaService) {}

  public async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
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
}
