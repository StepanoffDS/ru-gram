'use client';

import { RefObject, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { PostsList } from '@/entities/posts-list';
import { useFindAllPostsQuery } from '@/graphql/generated/output';
import {
  POSTS_PER_PAGE,
  PostSortOrder,
} from '@/shared/constants/post.constants';
import { ListPost } from '@/shared/libs/types';

import { EmptySearchState } from './empty-search-state';
import { SearchLoadingIndicator } from './search-loading-indicator';
import { UserSearchResults } from './user-search-results';

interface SearchResultsProps {
  type: 'posts' | 'users';
  searchTerm: string;
  active: boolean;
}

export function SearchResults({
  type,
  searchTerm,
  active,
}: SearchResultsProps) {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentSkip, setCurrentSkip] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const { data, loading, error, fetchMore } = useFindAllPostsQuery({
    variables: {
      filter: {
        take: POSTS_PER_PAGE,
        skip: 0,
        searchTerm: searchTerm || undefined,
        sortBy: PostSortOrder.NEWEST,
      },
    },
    skip: !active || type !== 'posts' || !searchTerm.trim(),
  });

  useEffect(() => {
    if (data?.findAllPosts && active && type === 'posts') {
      setPosts(data.findAllPosts);
      setCurrentSkip(POSTS_PER_PAGE);
      setHasMore(data.findAllPosts.length === POSTS_PER_PAGE);
    }
  }, [data, active, type]);

  useEffect(() => {
    if (inView && hasMore && !loading && active && type === 'posts') {
      fetchMore({
        variables: {
          filter: {
            take: POSTS_PER_PAGE,
            skip: currentSkip,
            searchTerm: searchTerm || undefined,
            sortBy: PostSortOrder.NEWEST,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newPosts = fetchMoreResult.findAllPosts || [];
          const allPosts = [...posts, ...newPosts];

          setPosts(allPosts);
          setCurrentSkip(currentSkip + POSTS_PER_PAGE);
          setHasMore(newPosts.length === POSTS_PER_PAGE);

          return {
            findAllPosts: allPosts,
          };
        },
      });
    }
  }, [
    inView,
    hasMore,
    loading,
    currentSkip,
    posts,
    fetchMore,
    active,
    type,
    searchTerm,
  ]);

  // Reset state when search term changes
  useEffect(() => {
    if (active && type === 'posts') {
      setPosts([]);
      setCurrentSkip(0);
      setHasMore(true);
    }
  }, [searchTerm, active, type]);

  if (!active) {
    return null;
  }

  if (type === 'posts') {
    if (!searchTerm.trim()) {
      return <EmptySearchState type='posts' />;
    }

    if (loading && posts.length === 0) {
      return <SearchLoadingIndicator message='Поиск постов...' />;
    }

    return (
      <PostsList
        posts={posts}
        loading={loading}
        error={error as Error}
        hasMore={hasMore}
        ref={ref as unknown as RefObject<HTMLDivElement>}
      />
    );
  }

  return (
    <UserSearchResults
      searchTerm={searchTerm}
      active={active}
    />
  );
}
