import { PrismaService } from '@/core/prisma/prisma.service';
import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { type Prisma } from 'prisma/generated';
import { CreatePostInput } from './inputs/create-post.input';
import { FilterPostsInput } from './inputs/filter.input';
import { UpdatePostInput } from './inputs/update-post.input';

@Injectable()
export class PostsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(filterPostsInput: FilterPostsInput = {}) {
    const { take, skip, searchTerm } = filterPostsInput;

    const whereClause = searchTerm
      ? this.findBySearchTermFilter(searchTerm)
      : undefined;

    return this.prismaService.post.findMany({
      take: take ?? 15,
      skip: skip ?? 0,
      where: {
        ...whereClause,
      },
      include: {
        user: true,
      },
    });
  }

  private findBySearchTermFilter(searchTerm: string): Prisma.PostWhereInput {
    return {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          text: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          user: {
            username: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            name: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
        {
          user: {
            email: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    };
  }

  public async findOneById(id: string) {
    return this.prismaService.post.findUnique({
      where: { id },
      include: {
        user: true,
      },
    });
  }

  public async findAllByUsername(
    username: string,
    filterPostsInput: FilterPostsInput = {},
  ) {
    const { take, skip, searchTerm } = filterPostsInput;

    const whereClause = searchTerm
      ? this.findBySearchTermFilter(searchTerm)
      : undefined;

    const posts = await this.prismaService.post.findMany({
      where: {
        ...whereClause,
        user: {
          username: username,
        },
      },
      include: {
        user: true,
      },
      take: take ?? 15,
      skip: skip ?? 0,
    });

    return posts;
  }

  public async create(userId: string, createPostInput: CreatePostInput) {
    const post = await this.prismaService.post.create({
      data: {
        ...createPostInput,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (!post) {
      throw new InternalServerErrorException('Ошибка при создании поста');
    }

    return post;
  }

  public async update(
    id: string,
    userId: string,
    updatePostInput: UpdatePostInput,
  ) {
    const existingPost = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException('Пост не найден');
    }

    if (existingPost.userId !== userId) {
      throw new ForbiddenException('Вы можете редактировать только свои посты');
    }

    const post = await this.prismaService.post.update({
      where: { id },
      data: updatePostInput,
      include: {
        user: true,
      },
    });

    return post;
  }

  public async delete(id: string, userId: string) {
    const existingPost = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      throw new NotFoundException('Пост не найден');
    }

    if (existingPost.userId !== userId) {
      throw new ForbiddenException('Вы можете удалять только свои посты');
    }

    await this.prismaService.post.delete({
      where: { id },
    });

    return true;
  }
}
