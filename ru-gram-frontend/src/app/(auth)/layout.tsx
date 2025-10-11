import { LanguageSwitcher } from '@/shared/components/language-switcher';
import { ThemeToggle } from '@/shared/components/theme-toggle';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import logo from '../../../public/images/logo.svg';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className='relative min-h-screen'>
      <div className='flex justify-between items-center absolute top-4 left-4 right-4 z-10'>
        <Image
          src={logo}
          alt='ru-gram logo'
          width={64}
          height={64}
        />
        <div className='flex gap-2'>
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>

      {children}
    </div>
  );
}
