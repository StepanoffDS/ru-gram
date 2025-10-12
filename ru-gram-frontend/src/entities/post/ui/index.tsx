import Image from 'next/image';

import { ImageWindow } from '@/features/image-window';
import { FindAllPostsQuery } from '@/graphql/generated/output';
import { S3_URL } from '@/shared/constants/api.constants';
import { cn } from '@/shared/libs/utils';

import { PostImage } from './post-image';

interface PostProps {
  post: FindAllPostsQuery['findAllPosts'][0];
}

// TODO: сделать адаптив картинок под их кол-во
export function Post({ post }: PostProps) {
  return (
    <article
      className='flex flex-col gap-4 border-b pb-4'
      suppressHydrationWarning
    >
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
    </article>
  );
}
