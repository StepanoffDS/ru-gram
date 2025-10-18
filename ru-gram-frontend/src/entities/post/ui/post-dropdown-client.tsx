'use client';

import dynamic from 'next/dynamic';

import { Loader2 } from 'lucide-react';

const PostDropdown = dynamic(
  () =>
    import('./post-dropdown').then((mod) => ({ default: mod.PostDropdown })),
  {
    ssr: false,
    loading: () => (
      <div className='flex h-8 w-8 items-center justify-center'>
        <Loader2 className='size-4 animate-spin' />
      </div>
    ),
  },
);

export { PostDropdown };
