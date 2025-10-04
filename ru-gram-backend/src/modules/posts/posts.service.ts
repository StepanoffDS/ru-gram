import { PrismaService } from '@/core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { type Prisma } from 'prisma/generated';
import { FilterPostsInput } from './inputs/filter.input';

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
}
