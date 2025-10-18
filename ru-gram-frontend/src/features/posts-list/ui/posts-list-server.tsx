import { Post } from '@/entities/post';
import { PostModel } from '@/graphql/generated/output';

import { getPosts } from '../api/get-posts';

export async function PostsListServer() {
  const posts = await getPosts();

  return (
    <div className='flex flex-col gap-4'>
      {posts?.data?.findAllPosts.map((post: PostModel) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
