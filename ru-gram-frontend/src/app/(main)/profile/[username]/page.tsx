import { ProfilePageComponent } from '@/views/profile';

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;

  return <ProfilePageComponent username={username} />;
}
