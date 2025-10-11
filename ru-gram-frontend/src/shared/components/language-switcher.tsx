'use client';

import { Language, languages } from '@/shared/libs/i18n/config';
import { setLanguage } from '@/shared/libs/i18n/language';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Language;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLanguageChange = async () => {
    const currentIndex = languages.indexOf(currentLocale);
    const nextIndex = (currentIndex + 1) % languages.length;
    const nextLanguage = languages[nextIndex];

    await setLanguage(nextLanguage);
    window.location.reload();
  };

  if (!mounted) {
    return (
      <Button
        variant='outline'
        size='icon'
        className='h-10 w-10'
      >
        <span className='text-sm font-semibold uppercase'>{currentLocale}</span>
      </Button>
    );
  }

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={handleLanguageChange}
      className='h-10 w-10'
    >
      <span className='text-sm font-semibold uppercase'>{currentLocale}</span>
      <span className='sr-only'>Switch language</span>
    </Button>
  );
}
