import { Authorized } from '@/shared/decorators/authorized.decorator';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreatePostInput } from './inputs/create-post.input';
import { FilterPostsInput } from './inputs/filter.input';
import { UpdatePostInput } from './inputs/update-post.input';
import { PostModel } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostModel], { name: 'findAllPosts' })
  public async findAll(@Args('filter') filterPostsInput: FilterPostsInput) {
    return this.postsService.findAll(filterPostsInput);
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
}
