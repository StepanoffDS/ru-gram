import Image from 'next/image';
import Link from 'next/link';

import { PropsWithChildren } from 'react';

import { LanguageSwitcher } from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';

import logo from '../../../public/images/logo.svg';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='relative min-h-screen'>
      <div className='absolute top-4 right-4 left-4 z-10 flex items-center justify-between'>
        <Link href='/'>
          <Image
            src={logo}
            alt='ru-gram logo'
            width={64}
            height={64}
          />
        </Link>
        <div className='flex gap-2'>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {children}
    </div>
  );
}
