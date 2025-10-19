'use client';

import { Loader2 } from 'lucide-react';

import { Post } from '@/entities/post';
import { ListPost } from '@/shared/libs/types';

export function PostsList({
  posts,
  loading,
  error,
  hasMore,
  ref,
}: {
  posts: ListPost[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  ref: React.RefObject<HTMLDivElement>;
}) {
  if (loading && posts.length === 0) {
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
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}

      {hasMore && (
        <div
          ref={ref}
          className='flex justify-center py-4'
        >
          {loading && <Loader2 className='size-6 animate-spin' />}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className='py-4 text-center text-gray-500'>
          Все посты загружены
        </div>
      )}
    </div>
  );
}
