/**
 * Проверяет, принадлежит ли пост текущему пользователю
 * @param post - объект поста
 * @param currentUserId - ID текущего пользователя
 * @returns true, если пост принадлежит пользователю, иначе false
 */
export function isPostOwnedByUser({
  postUserId,
  currentUserId,
}: {
  postUserId: string;
  currentUserId: string | null;
}): boolean {
  if (!currentUserId) {
    return false;
  }

  return postUserId === currentUserId;
}
