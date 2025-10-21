'use client';

import { RefObject, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProfileInfo } from '@/entities/profile-info';
import { ProfilePostsList } from '@/entities/profile-posts-list';
import {
  useFindAllByUsernameQuery,
  UserModel,
} from '@/graphql/generated/output';
import {
  POSTS_PER_PAGE,
  PostSortOrder,
} from '@/shared/constants/post.constants';
import { ListPost, Nullable } from '@/shared/libs/types';

interface ProfilePageComponentProps {
  username: string;
}

export function ProfilePageComponent({ username }: ProfilePageComponentProps) {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentSkip, setCurrentSkip] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const {
    data: postsData,
    loading: postsLoading,
    error: postsError,
    fetchMore: fetchMorePosts,
  } = useFindAllByUsernameQuery({
    variables: {
      username,
      filter: {
        take: POSTS_PER_PAGE,
        skip: 0,
        sortBy: PostSortOrder.NEWEST,
      },
    },
  });

  useEffect(() => {
    if (postsData?.findAllByUsername) {
      setPosts(postsData?.findAllByUsername);
      setCurrentSkip(POSTS_PER_PAGE);
      setHasMore(postsData?.findAllByUsername?.length === POSTS_PER_PAGE);
    }
  }, [postsData]);

  useEffect(() => {
    if (inView && hasMore && !postsLoading) {
      fetchMorePosts({
        variables: {
          filter: {
            take: POSTS_PER_PAGE,
            skip: currentSkip,
            sortBy: PostSortOrder.NEWEST,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;

          const newPosts = fetchMoreResult.findAllByUsername || [];
          const allPosts = [...(prev.findAllByUsername || []), ...newPosts];

          setPosts(allPosts);
          setCurrentSkip(currentSkip + POSTS_PER_PAGE);
          setHasMore(newPosts.length === POSTS_PER_PAGE);

          return {
            findAllByUsername: allPosts,
          };
        },
      });
    }
  }, [inView, hasMore, postsLoading, currentSkip, posts, fetchMorePosts]);

  return (
    <div className='flex flex-col gap-4'>
      <ProfileInfo
        profile={postsData?.findAllByUsername[0]?.user as Nullable<UserModel>}
        loading={postsLoading}
        error={postsError as Error}
      />
      <ProfilePostsList
        posts={posts}
        loading={postsLoading}
        error={postsError as Error}
        hasMore={hasMore}
        ref={ref as unknown as RefObject<HTMLDivElement>}
      />
    </div>
  );
}
