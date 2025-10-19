import { PostSortOrder } from '@/shared/constants/post.constants';

export async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `
        query FindAllPosts($filter: FilterPostsInput!) {
          findAllPosts(filter: $filter) {
            id
            title
            text
            images
            createdAt
            updatedAt
            user {
              id
              username
            }
            isLiked
            likes
          }
        }
      `,
      variables: {
        filter: {
          take: 10,
          sortBy: PostSortOrder.NEWEST,
        },
      },
    }),
  });
  const data = await res.json();

  return data;
}
