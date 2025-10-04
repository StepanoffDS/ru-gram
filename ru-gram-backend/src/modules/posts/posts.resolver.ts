import { Authorized } from '@/shared/decorators/authorized.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { CreatePostInput } from './inputs/create-post.input';
import { FilterPostsInput } from './inputs/filter.input';
import { LikesPaginationInput } from './inputs/likes-pagination.input';
import { UpdatePostInput } from './inputs/update-post.input';
import {
  AddImageResponseModel,
  RemoveImageResponseModel,
  UpdateImagesResponseModel,
} from './models/image-response.model';
import { LikeResponseModel } from './models/like-response.model';
import { PaginatedLikedUsersModel } from './models/liked-users.model';
import { PostModel } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostModel], { name: 'findAllPosts' })
  public async findAll(
    @Args('filter') filterPostsInput: FilterPostsInput,
    @Authorized('id') userId?: string,
  ) {
    return this.postsService.findAll(filterPostsInput, userId);
  }

  @Query(() => PostModel, { name: 'findOneById' })
  public async findOneById(@Args('id') id: string) {
    return this.postsService.findOneById(id);
  }

  @Query(() => [PostModel], { name: 'findAllByUsername' })
  public async findAllByUsername(
    @Args('username') username: string,
    @Args('filter') filterPostsInput: FilterPostsInput,
  ) {
    return this.postsService.findAllByUsername(username, filterPostsInput);
  }

  @Query(() => PaginatedLikedUsersModel, { name: 'getLikedUsersByPost' })
  public async getLikedUsersByPost(
    @Args('postId') postId: string,
    @Args('pagination', { defaultValue: { skip: 0, take: 20 } })
    paginationInput: LikesPaginationInput,
  ) {
    return this.postsService.getLikedUsersByPost(postId, paginationInput);
  }

  @Mutation(() => PostModel, { name: 'createPost' })
  public async createPost(
    @Authorized('id') userId: string,
    @Args('data') createPostInput: CreatePostInput,
  ) {
    return this.postsService.create(userId, createPostInput);
  }

  @Mutation(() => PostModel, { name: 'updatePost' })
  public async updatePost(
    @Args('id') id: string,
    @Authorized('id') userId: string,
    @Args('data') updatePostInput: UpdatePostInput,
  ) {
    return this.postsService.update(id, userId, updatePostInput);
  }

  @Mutation(() => Boolean, { name: 'deletePost' })
  public async deletePost(
    @Args('id') id: string,
    @Authorized('id') userId: string,
  ) {
    return this.postsService.delete(id, userId);
  }

  @Mutation(() => LikeResponseModel, { name: 'toggleLikePost' })
  public async toggleLikePost(
    @Args('postId') postId: string,
    @Authorized('id') userId: string,
  ) {
    return this.postsService.toggleLike(postId, userId);
  }

  @Mutation(() => PostModel, { name: 'toggleHidePost' })
  public async toggleHidePost(
    @Args('postId') postId: string,
    @Authorized('id') userId: string,
  ) {
    return this.postsService.toggleHide(postId, userId);
  }

  @Mutation(() => AddImageResponseModel, { name: 'addImageToPost' })
  public async addImageToPost(
    @Args('postId') postId: string,
    @Authorized('id') userId: string,
    @Args('file', { type: () => GraphQLUpload }) file: Upload,
  ) {
    return this.postsService.addImageToPost(postId, userId, file);
  }

  @Mutation(() => RemoveImageResponseModel, { name: 'removeImageFromPost' })
  public async removeImageFromPost(
    @Args('postId') postId: string,
    @Args('imageUrl') imageUrl: string,
    @Authorized('id') userId: string,
  ) {
    return this.postsService.removeImageFromPost(postId, userId, imageUrl);
  }

  @Mutation(() => UpdateImagesResponseModel, { name: 'updatePostImages' })
  public async updatePostImages(
    @Args('postId') postId: string,
    @Authorized('id') userId: string,
    @Args('files', { type: () => [GraphQLUpload] }) files: Upload[],
  ) {
    return this.postsService.updatePostImages(postId, userId, files);
  }
}
