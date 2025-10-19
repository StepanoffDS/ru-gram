'use client';

import { Heart } from 'lucide-react';
import { useState } from 'react';

import { useToggleLikePostMutation } from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import { Nullable } from '@/shared/libs/types';
import { cn } from '@/shared/libs/utils';

interface LikePostProps {
  postId: string;
  isLiked?: Nullable<boolean>;
  likes?: Nullable<number>;
}

export function LikePost({ postId, isLiked, likes }: LikePostProps) {
  const [isLikedPost, setIsLikedPost] = useState(isLiked ?? false);
  const [likesPost, setLikesPost] = useState(likes ?? 0);
  const [toggleLike] = useToggleLikePostMutation();

  const handleToggleLike = async () => {
    const result = await toggleLike({ variables: { postId } });
    if (result.data?.toggleLikePost) {
      setIsLikedPost(result.data.toggleLikePost.isLiked);
      setLikesPost(result.data.toggleLikePost.likesCount);
    }
  };

  return (
    <Button
      variant='ghost'
      size='sm'
      className='flex cursor-pointer items-center gap-2 text-gray-600 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400'
      onClick={handleToggleLike}
    >
      {isLikedPost ? (
        <Heart className='size-4 fill-red-500 text-red-500' />
      ) : (
        <Heart className='size-4' />
      )}
      <span className={cn('text-sm', isLikedPost && 'text-red-500')}>
        {likesPost}
      </span>
    </Button>
  );
}
