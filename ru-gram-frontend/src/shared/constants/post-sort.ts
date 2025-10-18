export enum PostSortOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  MOST_LIKED = 'most_liked',
  LEAST_LIKED = 'least_liked',
}

export const POST_SORT_OPTIONS = [
  { value: PostSortOrder.NEWEST, label: 'Сначала новые' },
  { value: PostSortOrder.OLDEST, label: 'Сначала старые' },
  { value: PostSortOrder.MOST_LIKED, label: 'Больше лайков' },
  { value: PostSortOrder.LEAST_LIKED, label: 'Меньше лайков' },
] as const;
