'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { ProfileEdit } from '@/features/profile-edit';
import { useFindMeQuery } from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';

export default function ProfileEditPage() {
  const router = useRouter();
  const { data: meData, loading: meLoading, error: meError } = useFindMeQuery();

  if (meLoading) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-8'>
        <div className='space-y-6'>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-8 w-32' />
          </div>
          <Skeleton className='h-96 w-full' />
        </div>
      </div>
    );
  }

  if (meError || !meData?.findMe) {
    return (
      <div className='mx-auto max-w-2xl px-4 py-8'>
        <div className='text-center text-gray-500 dark:text-gray-400'>
          Не удалось загрузить информацию о профиле
        </div>
      </div>
    );
  }

  return (
    <div className='mx-auto max-w-2xl px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex items-center space-x-4'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => router.back()}
            className='p-2'
          >
            ← Назад
          </Button>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Редактировать профиль
          </h1>
        </div>

        <ProfileEdit
          profile={meData.findMe}
          onSuccess={() => router.push('/profile/me')}
        />
      </div>
    </div>
  );
}
