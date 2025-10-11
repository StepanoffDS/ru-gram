import Image from 'next/image';
import Link from 'next/link';

import { PropsWithChildren } from 'react';

import authDark from '../../../../public/images/auth/auth-dark-bg.jpg';
import authLight from '../../../../public/images/auth/auth-light-bg.jpg';

interface AuthWrapperProps {
  heading: string;
  backButtonLabel?: string;
  backButtonHref?: string;
}

export function AuthWrapper({
  children,
  heading,
  backButtonLabel,
  backButtonHref,
}: PropsWithChildren<AuthWrapperProps>) {
  return (
    <div className='flex min-h-screen'>
      <div className='relative hidden items-center justify-center lg:flex lg:w-1/2'>
        <div className='flex h-full w-full items-center justify-center'>
          <div className='relative h-full w-full text-center text-gray-500'>
            {/* Светлая тема */}
            <Image
              src={authLight}
              alt='auth'
              fill
              className='dark:hidden'
            />
            {/* Темная тема */}
            <Image
              src={authDark}
              alt='auth'
              fill
              className='hidden dark:block'
            />
          </div>
        </div>
      </div>

      <div className='flex w-full items-center justify-center p-8 lg:w-1/2'>
        <div className='w-full max-w-md space-y-4'>
          <h1
            className='text-3xl font-bold'
            data-heading-tag='H1'
          >
            {heading}
          </h1>
          {children}
          {backButtonLabel && backButtonHref && (
            <Link
              href={backButtonHref}
              className='text-sm text-gray-500'
            >
              {backButtonLabel}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
