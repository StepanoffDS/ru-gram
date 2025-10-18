import { PostsListServer } from './posts-list-server';

export function PostsList() {
  return (
    <div className='flex flex-col gap-4'>
      <PostsListServer />
    </div>
  );
}
