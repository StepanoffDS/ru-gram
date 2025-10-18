import { FindAllPostsQuery } from '@/graphql/generated/output';

export type Nullable<T> = T | null | undefined;

export type ListPost = FindAllPostsQuery['findAllPosts'][number];
