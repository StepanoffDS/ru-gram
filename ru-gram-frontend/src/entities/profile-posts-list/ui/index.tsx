import { PostsList } from '@/entities/posts-list';
import { ListPost } from '@/shared/libs/types';

export function ProfilePostsList({
  posts,
  loading,
  error,
  hasMore,
  ref,
}: {
  posts: ListPost[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  ref: React.RefObject<HTMLDivElement>;
}) {
  return (
    <PostsList
      posts={posts}
      loading={loading}
      error={error}
      hasMore={hasMore}
      ref={ref}
    />
  );
}
