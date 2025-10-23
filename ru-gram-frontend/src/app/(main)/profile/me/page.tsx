'use client';

import { RefObject, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { ProfileInfo } from '@/entities/profile-info';
import { ProfilePostsList } from '@/entities/profile-posts-list';
import {
  useFindAllByMeQuery,
  useFindMeQuery,
} from '@/graphql/generated/output';
import {
  POSTS_PER_PAGE,
  PostSortOrder,
} from '@/shared/constants/post.constants';
import { ListPost } from '@/shared/libs/types';

export default function ProfileMePage() {
  const { data: meData, loading: meLoading, error: meError } = useFindMeQuery();

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
  } = useFindAllByMeQuery({
    variables: {
      filter: {
        take: POSTS_PER_PAGE,
        skip: 0,
        sortBy: PostSortOrder.NEWEST,
      },
    },
  });

  useEffect(() => {
    if (postsData?.findAllByMe) {
      setPosts(postsData?.findAllByMe);
      setCurrentSkip(POSTS_PER_PAGE);
      setHasMore(postsData?.findAllByMe?.length === POSTS_PER_PAGE);
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

          const newPosts = fetchMoreResult.findAllByMe || [];
          const allPosts = [...posts, ...newPosts];

          setPosts(allPosts);
          setCurrentSkip(currentSkip + POSTS_PER_PAGE);
          setHasMore(newPosts.length === POSTS_PER_PAGE);

          return {
            findAllByMe: allPosts,
          };
        },
      });
    }
  }, [inView, hasMore, postsLoading, currentSkip, posts, fetchMorePosts]);

  console.log('meData?.findMe =>', meData?.findMe);

  return (
    <div className='flex flex-col gap-4'>
      <ProfileInfo
        profile={meData?.findMe}
        loading={meLoading}
        error={meError}
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
