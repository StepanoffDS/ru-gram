import Image from 'next/image';
import { PropsWithChildren } from 'react';

import Link from 'next/link';
import authDark from '../../../public/images/auth/auth-dark-bg.jpg';
import authLight from '../../../public/images/auth/auth-light-bg.jpg';

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
    <div className='min-h-screen flex'>
      <div className='hidden lg:flex lg:w-1/2 items-center justify-center relative'>
        <div className='w-full h-full flex items-center justify-center'>
          <div className='text-gray-500 text-center relative w-full h-full'>
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

      <div className='w-full lg:w-1/2 flex items-center justify-center p-8'>
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
