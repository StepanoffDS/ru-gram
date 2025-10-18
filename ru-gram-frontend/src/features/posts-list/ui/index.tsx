'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { Post } from '@/entities/post';
import { useFindAllPostsQuery } from '@/graphql/generated/output';
import { PostSortOrder } from '@/shared/constants/post-sort';
import { ListPost } from '@/shared/libs/types';

const POSTS_PER_PAGE = 15;

export function PostsList() {
  const [posts, setPosts] = useState<ListPost[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [currentSkip, setCurrentSkip] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '100px',
  });

  const { loading, error, fetchMore } = useFindAllPostsQuery({
    variables: {
      filter: {
        take: POSTS_PER_PAGE,
        skip: 0,
        sortBy: PostSortOrder.NEWEST,
      },
    },
    onCompleted: (data) => {
      setPosts(data.findAllPosts || []);
      setCurrentSkip(POSTS_PER_PAGE);
      setHasMore(data.findAllPosts?.length === POSTS_PER_PAGE);
    },
  });

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMore({
        variables: {
          filter: {
            take: POSTS_PER_PAGE,
            skip: currentSkip,
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
  }, [inView, hasMore, loading, currentSkip, posts, fetchMore]);

  if (loading && posts.length === 0) {
    return (
      <div className='absolute top-0 right-0 bottom-0 left-0 flex items-center justify-center'>
        <Loader2 className='size-8 animate-spin' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-500'>
        Ошибка загрузки постов: {error.message}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
        />
      ))}

      {hasMore && (
        <div
          ref={ref}
          className='flex justify-center py-4'
        >
          {loading && <Loader2 className='size-6 animate-spin' />}
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <div className='py-4 text-center text-gray-500'>
          Все посты загружены
        </div>
      )}
    </div>
  );
}
