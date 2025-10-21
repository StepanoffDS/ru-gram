'use client';

import { useState } from 'react';

import { SearchInput } from '@/features/search/ui/search-input';
import { SearchResults } from '@/features/search/ui/search-results';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs';
import { useDebounce } from '@/shared/hooks/use-debounce';

export function SearchTabs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('posts');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className='container mx-auto max-w-4xl px-4 py-6'>
      <div className='mb-6'>
        <h1 className='mb-4 text-2xl font-bold'>Поиск</h1>
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder='Поиск по постам и пользователям...'
        />
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className='w-full'
      >
        <TabsList className='grid w-full grid-cols-2'>
          <TabsTrigger value='posts'>Посты</TabsTrigger>
          <TabsTrigger value='users'>Пользователи</TabsTrigger>
        </TabsList>

        <TabsContent
          value='posts'
          className='mt-6'
        >
          <SearchResults
            type='posts'
            searchTerm={debouncedSearchTerm}
            active={activeTab === 'posts'}
          />
        </TabsContent>

        <TabsContent
          value='users'
          className='mt-6'
        >
          <SearchResults
            type='users'
            searchTerm={debouncedSearchTerm}
            active={activeTab === 'users'}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
