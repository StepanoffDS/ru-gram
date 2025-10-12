'use client';

import Image from 'next/image';

import { X } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/shared/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/shared/components/ui/dialog';

interface ImageWindowProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  src: string;
  alt: string;
}

export function ImageWindow({ isOpen, setIsOpen, src, alt }: ImageWindowProps) {
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;

    const maxWidth = window.innerWidth * 0.9;
    const maxHeight = window.innerHeight * 0.9;

    const aspectRatio = naturalWidth / naturalHeight;

    let width = naturalWidth * 1.5;
    let height = naturalHeight * 1.5;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspectRatio;
    }

    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspectRatio;
    }

    setDimensions({ width, height });
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogContent
        showCloseButton={false}
        style={{
          maxWidth: dimensions ? `${dimensions.width + 48}px` : '90vw',
          width: 'auto',
        }}
        className='p-2'
      >
        <DialogTitle className='sr-only'>{alt}</DialogTitle>

        <Button
          variant='ghost'
          size='icon'
          className='absolute -top-7 -right-7 z-10 h-8 w-8 cursor-pointer rounded-full bg-black/50 text-white hover:bg-black/70'
          onClick={() => setIsOpen(false)}
          aria-label='Закрыть'
        >
          <X className='h-4 w-4' />
        </Button>

        <div
          className='relative w-full'
          style={{
            height: dimensions ? `${dimensions.height}px` : '70vh',
            width: dimensions ? `${dimensions.width}px` : 'auto',
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            style={{ objectFit: 'contain' }}
            className='rounded-md'
            onLoad={handleImageLoad}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
