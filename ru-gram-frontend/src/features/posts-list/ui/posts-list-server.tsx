'use client';

import { Loader2 } from 'lucide-react';

import { Post } from '@/entities/post';
import { useFindAllPostsQuery } from '@/graphql/generated/output';
import { PostSortOrder } from '@/shared/constants/post-sort';

export function PostsListServer() {
  const { data, loading, error } = useFindAllPostsQuery({
    variables: {
      filter: {
        take: 10,
        sortBy: PostSortOrder.NEWEST,
      },
    },
  });

  if (loading) {
    return (
      <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500'>
        Ошибка загрузки постов: {error.message}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {data?.findAllPosts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}
    </div>
  );
}
