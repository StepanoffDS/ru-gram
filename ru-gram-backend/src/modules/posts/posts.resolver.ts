import { Args, Query, Resolver } from '@nestjs/graphql';
import { FilterPostsInput } from './inputs/filter.input';
import { PostModel } from './models/post.model';
import { PostsService } from './posts.service';

@Resolver('Post')
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @Query(() => [PostModel], { name: 'findAllPosts' })
  public async findAll(@Args('filter') filterPostsInput: FilterPostsInput) {
    return this.postsService.findAll(filterPostsInput);
  }
}
