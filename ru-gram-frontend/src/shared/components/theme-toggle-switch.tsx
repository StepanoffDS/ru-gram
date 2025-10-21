'use client';

import { Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { SidebarMenuButton } from '@/shared/components/ui/sidebar';
import { cn } from '@/shared/libs/utils';

export function ThemeToggleSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <SidebarMenuButton
        size='lg'
        className='w-full'
      >
        <Moon className='size-4' />
        Темная тема
        <div className='relative ml-auto inline-flex h-5 w-9 items-center rounded-full bg-gray-200 dark:bg-gray-700'>
          <div className='h-3 w-3 translate-x-1 rounded-full bg-white transition-transform dark:translate-x-5' />
        </div>
      </SidebarMenuButton>
    );
  }

  const isDark = theme === 'dark';

  return (
    <SidebarMenuButton
      size='lg'
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className='w-full'
      role='switch'
      aria-checked={isDark}
      aria-label='Переключить тему'
    >
      <Moon className='size-4' />
      Темная тема
      <div
        className={cn(
          'relative ml-auto inline-flex h-5 w-9 items-center rounded-full transition-colors',
          isDark ? 'bg-blue-600' : 'bg-gray-200',
        )}
      >
        <span
          className={cn(
            'inline-block h-3 w-3 transform rounded-full bg-white transition-transform',
            isDark ? 'translate-x-5' : 'translate-x-1',
          )}
        />
      </div>
    </SidebarMenuButton>
  );
}
