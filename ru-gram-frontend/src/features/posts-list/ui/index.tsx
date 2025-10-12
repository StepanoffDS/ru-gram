import { Post } from '@/entities/post';
import { PostModel } from '@/graphql/generated/output';

import { getPosts } from '../api/get-posts';

interface PostsListProps {}

export async function PostsList({}: PostsListProps) {
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
