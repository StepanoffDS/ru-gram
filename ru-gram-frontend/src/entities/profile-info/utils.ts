import { toast } from 'sonner';

export const copyProfileLink = async (username: string) => {
  const profileUrl = `${globalThis.location.origin}/profile/${username}`;
  try {
    await navigator.clipboard.writeText(profileUrl);
    toast.success('Ссылка на профиль скопирована в буфер обмена');
  } catch (error) {
    console.error('Failed to copy profile link:', error);
    toast.error('Не удалось скопировать ссылку');
  }
};
