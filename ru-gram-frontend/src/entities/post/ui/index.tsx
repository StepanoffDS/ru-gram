import Link from 'next/link';

import { Heart } from 'lucide-react';

import { LikePost } from '@/features/post/like-post';
import { Button } from '@/shared/components/ui/button';
import { ListPost } from '@/shared/libs/types';
import { cn } from '@/shared/libs/utils';
import { formatTimeAgo } from '@/shared/utils/format-time';

import { PostDropdown } from './post-dropdown-client';
import { PostImage } from './post-image';

interface PostProps {
  post: ListPost;
}

export function Post({ post }: PostProps) {
  const { user } = post;
  return (
    <article
      className='flex flex-col gap-4 border-b pb-4'
      suppressHydrationWarning
    >
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <Link
            href={`/profile/@${user.username}`}
            className='flex size-10 items-center justify-center overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700'
          >
            <div className='flex size-full items-center justify-center bg-gradient-to-br from-blue-400 to-purple-500 text-sm font-semibold text-white'>
              {user.username.charAt(0).toUpperCase()}
            </div>
          </Link>
          <div className='flex flex-col'>
            <Link
              href={`/profile/@${user.username}`}
              className='text-sm font-semibold'
            >
              @{user.username} {user.name && `– ${user.name}`}
            </Link>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>
        <PostDropdown post={post} />
      </div>

      <div className='flex flex-col gap-2'>
        {post.title && (
          <h2
            className='text-2xl font-bold'
            data-heading-tag='H2'
          >
            {post.title}
          </h2>
        )}
        {post.text && <p className='text-sm opacity-80'>{post.text}</p>}
        {post.images && post.images.length > 0 && (
          <div className={cn('relative grid w-full grid-cols-2 gap-2')}>
            {post.images.map((image, index) => (
              <PostImage
                key={index}
                image={image}
                title={post.title}
              />
            ))}
          </div>
        )}
      </div>

      <div className='flex items-center gap-4'>
        <LikePost
          postId={post.id}
          isLiked={post.isLiked}
          likes={post.likes}
        />
      </div>
    </article>
  );
}
