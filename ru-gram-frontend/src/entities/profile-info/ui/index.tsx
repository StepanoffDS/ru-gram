'use client';

import Link from 'next/link';

import { PencilIcon } from 'lucide-react';

import { Role } from '@/features/auth/types';
import { FindMeQuery } from '@/graphql/generated/output';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { S3_URL } from '@/shared/constants/api.constants';
import { Nullable } from '@/shared/libs/types';
import { getInitials } from '@/shared/utils/get-initials';

import { copyProfileLink } from '../utils';

interface ProfileInfoProps {
  profile: Nullable<FindMeQuery['findMe']>;
  loading: boolean;
  error: Nullable<Error>;
}

export function ProfileInfo({ profile, loading, error }: ProfileInfoProps) {
  if (loading) {
    return (
      <div className='border-b border-gray-200 dark:border-gray-800'>
        <div className='mx-auto max-w-4xl px-4 py-8'>
          <div className='flex items-center space-x-6'>
            <Skeleton className='h-24 w-24 rounded-full' />
            <div className='space-y-3'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-4 w-32' />
              <Skeleton className='h-4 w-64' />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className='border-b border-gray-200 dark:border-gray-800'>
        <div className='mx-auto max-w-4xl px-4 py-8'>
          <div className='text-center text-gray-500 dark:text-gray-400'>
            Не удалось загрузить информацию о профиле
          </div>
        </div>
      </div>
    );
  }

  const displayName = profile.name || profile.username;

  return (
    <div className='border-b border-gray-200 dark:border-gray-800'>
      <div className='mx-auto max-w-4xl px-4 py-8'>
        <div className='flex justify-between'>
          <div className='flex items-center space-x-6'>
            <Avatar className='h-24 w-24'>
              {profile.avatar ? (
                <AvatarImage
                  src={S3_URL + profile.avatar}
                  alt={displayName}
                  className='object-cover'
                />
              ) : (
                <AvatarFallback className='bg-gray-100 text-2xl font-semibold text-gray-700 dark:bg-gray-800 dark:text-gray-300'>
                  {getInitials(displayName)}
                </AvatarFallback>
              )}
            </Avatar>

            <div className='min-w-0 flex-1'>
              <div className='mb-0.5 flex items-center space-x-3'>
                <h1 className='mb-0 truncate text-2xl font-bold text-gray-900 dark:text-white'>
                  {displayName}
                </h1>
                {profile.role === Role.ADMIN ? (
                  <span className='inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200'>
                    {profile.role}
                  </span>
                ) : null}
              </div>

              <button
                className='mb-2 cursor-pointer text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
                onClick={() => copyProfileLink(profile.username)}
              >
                @{profile.username}
              </button>

              {profile.bio && (
                <p className='max-w-md text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
                  {profile.bio}
                </p>
              )}
            </div>
          </div>

          <Button
            variant='outline'
            size='sm'
            asChild
          >
            <Link href='/profile/me/edit'>
              <PencilIcon className='h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
