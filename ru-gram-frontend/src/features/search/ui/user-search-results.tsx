'use client';

import { RefObject, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { useFindAllUsersQuery } from '@/graphql/generated/output';
import { POSTS_PER_PAGE } from '@/shared/constants/post.constants';

import { EmptySearchState } from './empty-search-state';
import { SearchLoadingIndicator } from './search-loading-indicator';
import { UserCard } from './user-card';

interface UserSearchResultsProps {
  searchTerm: string;
  active: boolean;
}

interface User {
  id: string;
  email: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export function UserSearchResults({
  searchTerm,
  active,
}: UserSearchResultsProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentSkip, setCurrentSkip] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const { data, loading, error, fetchMore } = useFindAllUsersQuery({
    variables: {
      filter: {
        take: POSTS_PER_PAGE,
        skip: 0,
        searchTerm: searchTerm || undefined,
      },
    },
    skip: !active || !searchTerm.trim(),
  });

  useEffect(() => {
    if (data?.findAllUsers && active) {
      setUsers(data.findAllUsers);
      setCurrentSkip(POSTS_PER_PAGE);
      setHasMore(data.findAllUsers.length === POSTS_PER_PAGE);
    }
  }, [data, active]);

  useEffect(() => {
    if (inView && hasMore && !loading && active) {
      fetchMore({
        variables: {
          filter: {
            take: POSTS_PER_PAGE,
            skip: currentSkip,
            searchTerm: searchTerm || undefined,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newUsers = fetchMoreResult.findAllUsers || [];
          const allUsers = [...users, ...newUsers];

          setUsers(allUsers);
          setCurrentSkip(currentSkip + POSTS_PER_PAGE);
          setHasMore(newUsers.length === POSTS_PER_PAGE);

          return {
            findAllUsers: allUsers,
          };
        },
      });
    }
  }, [
    inView,
    hasMore,
    loading,
    currentSkip,
    users,
    fetchMore,
    active,
    searchTerm,
  ]);

  // Reset state when search term changes
  useEffect(() => {
    if (active) {
      setUsers([]);
      setCurrentSkip(0);
      setHasMore(true);
    }
  }, [searchTerm, active]);

  if (!active) {
    return null;
  }

  if (!searchTerm.trim()) {
    return <EmptySearchState type='users' />;
  }

  if (loading && users.length === 0) {
    return <SearchLoadingIndicator message='Поиск пользователей...' />;
  }

  if (error) {
    return (
      <div className='py-8 text-center text-red-500'>
        Ошибка при загрузке пользователей: {error.message}
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className='text-muted-foreground py-8 text-center'>
        Пользователи не найдены
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}

      {hasMore && (
        <div
          ref={ref as unknown as RefObject<HTMLDivElement>}
          className='py-4 text-center'
        >
          {loading && <div className='text-muted-foreground'>Загрузка...</div>}
        </div>
      )}
    </div>
  );
}
