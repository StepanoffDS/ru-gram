import { PostsList } from '@/features/posts-list';

export default async function MainPage() {
  return (
    <div className='mr-[3vw] ml-[15vw]'>
      <PostsList />
    </div>
  );
}
