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
import { LikesPaginationInput } from './inputs/likes-pagination.input';
import { UpdatePostInput } from './inputs/update-post.input';

@Injectable()
export class PostsService {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    filterPostsInput: FilterPostsInput = {},
    userId?: string,
  ) {
    const { take, skip, searchTerm } = filterPostsInput;

    const whereClause = searchTerm
      ? this.findBySearchTermFilter(searchTerm)
      : undefined;

    const posts = await this.prismaService.post.findMany({
      take: take ?? 15,
      skip: skip ?? 0,
      where: {
        ...whereClause,
      },
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (userId) {
      return Promise.all(
        posts.map(async (post) => ({
          ...post,
          isLiked: await this.isPostLikedByUser(post.id, userId),
        })),
      );
    }

    return posts;
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
      orderBy: {
        createdAt: 'desc',
      },
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

  public async toggleLike(postId: string, userId: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    const existingLike = await this.prismaService.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existingLike) {
      await this.prismaService.postLike.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });

      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          likes: {
            decrement: 1,
          },
        },
      });

      return { isLiked: false, likesCount: post.likes - 1 };
    } else {
      await this.prismaService.postLike.create({
        data: {
          userId,
          postId,
        },
      });

      await this.prismaService.post.update({
        where: { id: postId },
        data: {
          likes: {
            increment: 1,
          },
        },
      });

      return { isLiked: true, likesCount: post.likes + 1 };
    }
  }

  private async isPostLikedByUser(
    postId: string,
    userId: string,
  ): Promise<boolean> {
    const like = await this.prismaService.postLike.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    return !!like;
  }

  public async toggleHide(postId: string, userId: string) {
    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    if (post.userId !== userId) {
      throw new ForbiddenException('Вы можете скрывать только свои посты');
    }

    const updatedPost = await this.prismaService.post.update({
      where: { id: postId },
      data: { hidden: !post.hidden },
    });

    if (!updatedPost) {
      throw new InternalServerErrorException('Ошибка при скрытии поста');
    }

    return updatedPost;
  }

  public async getLikedUsersByPost(
    postId: string,
    paginationInput: LikesPaginationInput = { skip: 0, take: 20 },
  ) {
    const { skip = 0, take = 20 } = paginationInput;

    const post = await this.prismaService.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Пост не найден');
    }

    const total = await this.prismaService.postLike.count({
      where: { postId },
    });

    const postLikes = await this.prismaService.postLike.findMany({
      where: { postId },
      skip,
      take,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    const likedUsers = postLikes.map((postLike) => ({
      id: postLike.user.id,
      username: postLike.user.username,
      name: postLike.user.name,
      avatar: postLike.user.avatar,
      likedAt: postLike.createdAt,
    }));

    return {
      data: likedUsers,
      total,
      skip,
      take,
      hasMore: skip + take < total,
    };
  }
}
