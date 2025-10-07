import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
  Upload: { input: any; output: any; }
};

export type AddImageResponseModel = {
  __typename?: 'AddImageResponseModel';
  allImages: Array<Scalars['String']['output']>;
  imageUrl: Scalars['String']['output'];
};

export type ChangeEmailInput = {
  newEmail: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type ChangePasswordInput = {
  confirmNewPassword: Scalars['String']['input'];
  currentPassword: Scalars['String']['input'];
  newPassword: Scalars['String']['input'];
};

export type ChangeProfileInfoInput = {
  bio: Scalars['String']['input'];
  name: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type ChangeRoleInput = {
  id: Scalars['String']['input'];
  role: Scalars['String']['input'];
};

export type CreatePostInput = {
  images?: InputMaybe<Array<Scalars['String']['input']>>;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type FilterPostsInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type FilterUsersInput = {
  searchTerm?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  take?: InputMaybe<Scalars['Int']['input']>;
};

export type LikeResponseModel = {
  __typename?: 'LikeResponseModel';
  isLiked: Scalars['Boolean']['output'];
  likesCount: Scalars['Int']['output'];
};

export type LikedUserModel = {
  __typename?: 'LikedUserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  likedAt: Scalars['DateTime']['output'];
  name?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type LikesPaginationInput = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type LoginInput = {
  login: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addImageToPost: AddImageResponseModel;
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeRole: UserModel;
  createPost: PostModel;
  createUser: UserModel;
  deletePost: Scalars['Boolean']['output'];
  loginUser: UserModel;
  logoutUser: Scalars['String']['output'];
  removeImageFromPost: RemoveImageResponseModel;
  removeProfileAvatar: Scalars['Boolean']['output'];
  toggleHidePost: PostModel;
  toggleLikePost: LikeResponseModel;
  updatePost: PostModel;
  updatePostImages: UpdateImagesResponseModel;
  updateProfileAvatar: Scalars['Boolean']['output'];
};


export type MutationAddImageToPostArgs = {
  file: Scalars['Upload']['input'];
  postId: Scalars['String']['input'];
};


export type MutationChangeEmailArgs = {
  data: ChangeEmailInput;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationChangeProfileInfoArgs = {
  data: ChangeProfileInfoInput;
};


export type MutationChangeRoleArgs = {
  data: ChangeRoleInput;
};


export type MutationCreatePostArgs = {
  data: CreatePostInput;
};


export type MutationCreateUserArgs = {
  data: CreateUserInput;
};


export type MutationDeletePostArgs = {
  id: Scalars['String']['input'];
};


export type MutationLoginUserArgs = {
  data: LoginInput;
};


export type MutationRemoveImageFromPostArgs = {
  imageUrl: Scalars['String']['input'];
  postId: Scalars['String']['input'];
};


export type MutationToggleHidePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationToggleLikePostArgs = {
  postId: Scalars['String']['input'];
};


export type MutationUpdatePostArgs = {
  data: UpdatePostInput;
  id: Scalars['String']['input'];
};


export type MutationUpdatePostImagesArgs = {
  files: Array<Scalars['Upload']['input']>;
  postId: Scalars['String']['input'];
};


export type MutationUpdateProfileAvatarArgs = {
  avatar: Scalars['Upload']['input'];
};

export type PaginatedLikedUsersModel = {
  __typename?: 'PaginatedLikedUsersModel';
  data: Array<LikedUserModel>;
  hasMore: Scalars['Boolean']['output'];
  skip: Scalars['Int']['output'];
  take: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PostLikesModel = {
  __typename?: 'PostLikesModel';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  post: PostModel;
  postId: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type PostModel = {
  __typename?: 'PostModel';
  createdAt: Scalars['DateTime']['output'];
  hidden: Scalars['Boolean']['output'];
  id: Scalars['ID']['output'];
  images?: Maybe<Array<Scalars['String']['output']>>;
  isLiked?: Maybe<Scalars['Boolean']['output']>;
  likes: Scalars['Int']['output'];
  postLikes: Array<PostLikesModel>;
  text?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  user: UserModel;
  userId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  findAllByUsername: Array<PostModel>;
  findAllPosts: Array<PostModel>;
  findAllUsers: Array<UserModel>;
  findMe: UserModel;
  findOneById: PostModel;
  getLikedUsersByPost: PaginatedLikedUsersModel;
};


export type QueryFindAllByUsernameArgs = {
  filter: FilterPostsInput;
  username: Scalars['String']['input'];
};


export type QueryFindAllPostsArgs = {
  filter: FilterPostsInput;
};


export type QueryFindAllUsersArgs = {
  filter: FilterUsersInput;
};


export type QueryFindOneByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetLikedUsersByPostArgs = {
  pagination?: LikesPaginationInput;
  postId: Scalars['String']['input'];
};

export type RemoveImageResponseModel = {
  __typename?: 'RemoveImageResponseModel';
  remainingImages: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdateImagesResponseModel = {
  __typename?: 'UpdateImagesResponseModel';
  images: Array<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type UpdatePostInput = {
  hidden: Scalars['Boolean']['input'];
  images: Array<Scalars['String']['input']>;
  text: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type UserModel = {
  __typename?: 'UserModel';
  avatar?: Maybe<Scalars['String']['output']>;
  bio?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  password: Scalars['String']['output'];
  postLikes: Array<PostLikesModel>;
  posts: Array<PostModel>;
  role: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
};

export type FindAllPostsQueryVariables = Exact<{
  filter: FilterPostsInput;
}>;


export type FindAllPostsQuery = { __typename?: 'Query', findAllPosts: Array<{ __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, createdAt: any, updatedAt: any, user: { __typename?: 'UserModel', id: string, username: string } }> };


export const FindAllPostsDocument = gql`
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
  }
}
    `;

/**
 * __useFindAllPostsQuery__
 *
 * To run a query within a React component, call `useFindAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPostsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAllPostsQuery(baseOptions: Apollo.QueryHookOptions<FindAllPostsQuery, FindAllPostsQueryVariables> & ({ variables: FindAllPostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPostsQuery, FindAllPostsQueryVariables>(FindAllPostsDocument, options);
      }
export function useFindAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPostsQuery, FindAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPostsQuery, FindAllPostsQueryVariables>(FindAllPostsDocument, options);
        }
export function useFindAllPostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllPostsQuery, FindAllPostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllPostsQuery, FindAllPostsQueryVariables>(FindAllPostsDocument, options);
        }
export type FindAllPostsQueryHookResult = ReturnType<typeof useFindAllPostsQuery>;
export type FindAllPostsLazyQueryHookResult = ReturnType<typeof useFindAllPostsLazyQuery>;
export type FindAllPostsSuspenseQueryHookResult = ReturnType<typeof useFindAllPostsSuspenseQuery>;
export type FindAllPostsQueryResult = Apollo.QueryResult<FindAllPostsQuery, FindAllPostsQueryVariables>;