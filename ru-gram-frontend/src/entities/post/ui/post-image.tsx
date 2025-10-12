'use client';

import Image from 'next/image';

import { useState } from 'react';

import { ImageWindow } from '@/features/image-window';
import { S3_URL } from '@/shared/constants/api.constants';
import { Nullable } from '@/shared/libs/types';
import { cn } from '@/shared/libs/utils';

interface PostImageProps {
  image: string;
  title: Nullable<string>;
}

export function PostImage({ image, title }: PostImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn('relative h-[300px] w-full overflow-hidden rounded-md')}
      >
        <Image
          src={S3_URL + image}
          alt={title || 'Post Image'}
          fill
          style={{ objectFit: 'cover' }}
          onClick={() => setIsOpen(true)}
          className='cursor-pointer'
        />
      </div>
      <ImageWindow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        src={S3_URL + image}
        alt={title || 'Post Image'}
      />
    </>
  );
}
