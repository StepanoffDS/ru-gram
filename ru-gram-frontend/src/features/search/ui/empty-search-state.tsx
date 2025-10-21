'use client';

import { Search } from 'lucide-react';

interface EmptySearchStateProps {
  type: 'posts' | 'users';
}

export function EmptySearchState({ type }: EmptySearchStateProps) {
  const message =
    type === 'posts'
      ? 'Введите поисковый запрос для поиска постов'
      : 'Введите поисковый запрос для поиска пользователей';

  return (
    <div className='py-12 text-center'>
      <Search className='text-muted-foreground mx-auto mb-4 h-12 w-12' />
      <p className='text-muted-foreground text-lg'>{message}</p>
    </div>
  );
}
