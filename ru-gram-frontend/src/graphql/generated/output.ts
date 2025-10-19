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
  sortBy?: InputMaybe<Scalars['String']['input']>;
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
  changeEmail: Scalars['Boolean']['output'];
  changePassword: Scalars['Boolean']['output'];
  changeProfileInfo: Scalars['Boolean']['output'];
  changeRole: UserModel;
  createPost: PostModel;
  createUser: Scalars['Boolean']['output'];
  deletePost: Scalars['Boolean']['output'];
  loginUser: UserModel;
  logoutUser: Scalars['String']['output'];
  toggleHidePost: PostModel;
  toggleLikePost: LikeResponseModel;
  updatePost: PostModel;
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
  findAllByMe: Array<PostModel>;
  findAllByMeHidden: Array<PostModel>;
  findAllByUsername: Array<PostModel>;
  findAllPosts: Array<PostModel>;
  findAllUsers: Array<UserModel>;
  findMe: UserModel;
  findOneById: PostModel;
  getLikedUsersByPost: PaginatedLikedUsersModel;
};


export type QueryFindAllByMeArgs = {
  filter: FilterPostsInput;
};


export type QueryFindAllByMeHiddenArgs = {
  filter: FilterPostsInput;
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

export type UpdatePostInput = {
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

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: boolean };

export type LoginUserMutationVariables = Exact<{
  data: LoginInput;
}>;


export type LoginUserMutation = { __typename?: 'Mutation', loginUser: { __typename?: 'UserModel', id: string, email: string, username: string, name?: string | null, avatar?: string | null, bio?: string | null, role: string } };

export type LogoutUserMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutUserMutation = { __typename?: 'Mutation', logoutUser: string };

export type CreatePostMutationVariables = Exact<{
  data: CreatePostInput;
}>;


export type CreatePostMutation = { __typename?: 'Mutation', createPost: { __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null } };

export type DeletePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type DeletePostMutation = { __typename?: 'Mutation', deletePost: boolean };

export type ToggleHidePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type ToggleHidePostMutation = { __typename?: 'Mutation', toggleHidePost: { __typename?: 'PostModel', id: string, hidden: boolean } };

export type ToggleLikePostMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type ToggleLikePostMutation = { __typename?: 'Mutation', toggleLikePost: { __typename?: 'LikeResponseModel', isLiked: boolean, likesCount: number } };

export type UpdatePostMutationVariables = Exact<{
  id: Scalars['String']['input'];
  data: UpdatePostInput;
}>;


export type UpdatePostMutation = { __typename?: 'Mutation', updatePost: { __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, hidden: boolean, likes: number, isLiked?: boolean | null, userId: string, createdAt: any, updatedAt: any, user: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null } } };

export type ChangeProfileInfoMutationVariables = Exact<{
  data: ChangeProfileInfoInput;
}>;


export type ChangeProfileInfoMutation = { __typename?: 'Mutation', changeProfileInfo: boolean };

export type FindAllByMeQueryVariables = Exact<{
  filter: FilterPostsInput;
}>;


export type FindAllByMeQuery = { __typename?: 'Query', findAllByMe: Array<{ __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, createdAt: any, updatedAt: any, isLiked?: boolean | null, likes: number, user: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null } }> };

export type FindAllByMeHiddenQueryVariables = Exact<{
  filter: FilterPostsInput;
}>;


export type FindAllByMeHiddenQuery = { __typename?: 'Query', findAllByMeHidden: Array<{ __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, createdAt: any, updatedAt: any, isLiked?: boolean | null, likes: number, user: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null } }> };

export type FindAllByUsernameQueryVariables = Exact<{
  filter: FilterPostsInput;
  username: Scalars['String']['input'];
}>;


export type FindAllByUsernameQuery = { __typename?: 'Query', findAllByUsername: Array<{ __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, createdAt: any, updatedAt: any, isLiked?: boolean | null, likes: number, user: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null, bio?: string | null, role: string } }> };

export type FindAllPostsQueryVariables = Exact<{
  filter: FilterPostsInput;
}>;


export type FindAllPostsQuery = { __typename?: 'Query', findAllPosts: Array<{ __typename?: 'PostModel', id: string, title?: string | null, text?: string | null, images?: Array<string> | null, createdAt: any, updatedAt: any, isLiked?: boolean | null, likes: number, user: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null } }> };

export type FindMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FindMeQuery = { __typename?: 'Query', findMe: { __typename?: 'UserModel', id: string, username: string, name?: string | null, avatar?: string | null, bio?: string | null, role: string } };


export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data)
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginUserDocument = gql`
    mutation LoginUser($data: LoginInput!) {
  loginUser(data: $data) {
    id
    email
    username
    name
    avatar
    bio
    role
  }
}
    `;
export type LoginUserMutationFn = Apollo.MutationFunction<LoginUserMutation, LoginUserMutationVariables>;

/**
 * __useLoginUserMutation__
 *
 * To run a mutation, you first call `useLoginUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginUserMutation, { data, loading, error }] = useLoginUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginUserMutation(baseOptions?: Apollo.MutationHookOptions<LoginUserMutation, LoginUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginUserMutation, LoginUserMutationVariables>(LoginUserDocument, options);
      }
export type LoginUserMutationHookResult = ReturnType<typeof useLoginUserMutation>;
export type LoginUserMutationResult = Apollo.MutationResult<LoginUserMutation>;
export type LoginUserMutationOptions = Apollo.BaseMutationOptions<LoginUserMutation, LoginUserMutationVariables>;
export const LogoutUserDocument = gql`
    mutation LogoutUser {
  logoutUser
}
    `;
export type LogoutUserMutationFn = Apollo.MutationFunction<LogoutUserMutation, LogoutUserMutationVariables>;

/**
 * __useLogoutUserMutation__
 *
 * To run a mutation, you first call `useLogoutUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutUserMutation, { data, loading, error }] = useLogoutUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutUserMutation(baseOptions?: Apollo.MutationHookOptions<LogoutUserMutation, LogoutUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutUserMutation, LogoutUserMutationVariables>(LogoutUserDocument, options);
      }
export type LogoutUserMutationHookResult = ReturnType<typeof useLogoutUserMutation>;
export type LogoutUserMutationResult = Apollo.MutationResult<LogoutUserMutation>;
export type LogoutUserMutationOptions = Apollo.BaseMutationOptions<LogoutUserMutation, LogoutUserMutationVariables>;
export const CreatePostDocument = gql`
    mutation CreatePost($data: CreatePostInput!) {
  createPost(data: $data) {
    id
    title
    text
    images
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, options);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: String!) {
  deletePost(id: $id)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const ToggleHidePostDocument = gql`
    mutation ToggleHidePost($postId: String!) {
  toggleHidePost(postId: $postId) {
    id
    hidden
  }
}
    `;
export type ToggleHidePostMutationFn = Apollo.MutationFunction<ToggleHidePostMutation, ToggleHidePostMutationVariables>;

/**
 * __useToggleHidePostMutation__
 *
 * To run a mutation, you first call `useToggleHidePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleHidePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleHidePostMutation, { data, loading, error }] = useToggleHidePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useToggleHidePostMutation(baseOptions?: Apollo.MutationHookOptions<ToggleHidePostMutation, ToggleHidePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleHidePostMutation, ToggleHidePostMutationVariables>(ToggleHidePostDocument, options);
      }
export type ToggleHidePostMutationHookResult = ReturnType<typeof useToggleHidePostMutation>;
export type ToggleHidePostMutationResult = Apollo.MutationResult<ToggleHidePostMutation>;
export type ToggleHidePostMutationOptions = Apollo.BaseMutationOptions<ToggleHidePostMutation, ToggleHidePostMutationVariables>;
export const ToggleLikePostDocument = gql`
    mutation ToggleLikePost($postId: String!) {
  toggleLikePost(postId: $postId) {
    isLiked
    likesCount
  }
}
    `;
export type ToggleLikePostMutationFn = Apollo.MutationFunction<ToggleLikePostMutation, ToggleLikePostMutationVariables>;

/**
 * __useToggleLikePostMutation__
 *
 * To run a mutation, you first call `useToggleLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikePostMutation, { data, loading, error }] = useToggleLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useToggleLikePostMutation(baseOptions?: Apollo.MutationHookOptions<ToggleLikePostMutation, ToggleLikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ToggleLikePostMutation, ToggleLikePostMutationVariables>(ToggleLikePostDocument, options);
      }
export type ToggleLikePostMutationHookResult = ReturnType<typeof useToggleLikePostMutation>;
export type ToggleLikePostMutationResult = Apollo.MutationResult<ToggleLikePostMutation>;
export type ToggleLikePostMutationOptions = Apollo.BaseMutationOptions<ToggleLikePostMutation, ToggleLikePostMutationVariables>;
export const UpdatePostDocument = gql`
    mutation UpdatePost($id: String!, $data: UpdatePostInput!) {
  updatePost(id: $id, data: $data) {
    id
    title
    text
    images
    hidden
    likes
    isLiked
    userId
    user {
      id
      username
      name
      avatar
    }
    createdAt
    updatedAt
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, options);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const ChangeProfileInfoDocument = gql`
    mutation ChangeProfileInfo($data: ChangeProfileInfoInput!) {
  changeProfileInfo(data: $data)
}
    `;
export type ChangeProfileInfoMutationFn = Apollo.MutationFunction<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;

/**
 * __useChangeProfileInfoMutation__
 *
 * To run a mutation, you first call `useChangeProfileInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeProfileInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeProfileInfoMutation, { data, loading, error }] = useChangeProfileInfoMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useChangeProfileInfoMutation(baseOptions?: Apollo.MutationHookOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>(ChangeProfileInfoDocument, options);
      }
export type ChangeProfileInfoMutationHookResult = ReturnType<typeof useChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationResult = Apollo.MutationResult<ChangeProfileInfoMutation>;
export type ChangeProfileInfoMutationOptions = Apollo.BaseMutationOptions<ChangeProfileInfoMutation, ChangeProfileInfoMutationVariables>;
export const FindAllByMeDocument = gql`
    query FindAllByMe($filter: FilterPostsInput!) {
  findAllByMe(filter: $filter) {
    id
    title
    text
    images
    createdAt
    updatedAt
    isLiked
    likes
    user {
      id
      username
      name
      avatar
    }
  }
}
    `;

/**
 * __useFindAllByMeQuery__
 *
 * To run a query within a React component, call `useFindAllByMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllByMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllByMeQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAllByMeQuery(baseOptions: Apollo.QueryHookOptions<FindAllByMeQuery, FindAllByMeQueryVariables> & ({ variables: FindAllByMeQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllByMeQuery, FindAllByMeQueryVariables>(FindAllByMeDocument, options);
      }
export function useFindAllByMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllByMeQuery, FindAllByMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllByMeQuery, FindAllByMeQueryVariables>(FindAllByMeDocument, options);
        }
export function useFindAllByMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllByMeQuery, FindAllByMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllByMeQuery, FindAllByMeQueryVariables>(FindAllByMeDocument, options);
        }
export type FindAllByMeQueryHookResult = ReturnType<typeof useFindAllByMeQuery>;
export type FindAllByMeLazyQueryHookResult = ReturnType<typeof useFindAllByMeLazyQuery>;
export type FindAllByMeSuspenseQueryHookResult = ReturnType<typeof useFindAllByMeSuspenseQuery>;
export type FindAllByMeQueryResult = Apollo.QueryResult<FindAllByMeQuery, FindAllByMeQueryVariables>;
export const FindAllByMeHiddenDocument = gql`
    query FindAllByMeHidden($filter: FilterPostsInput!) {
  findAllByMeHidden(filter: $filter) {
    id
    title
    text
    images
    createdAt
    updatedAt
    isLiked
    likes
    user {
      id
      username
      name
      avatar
    }
  }
}
    `;

/**
 * __useFindAllByMeHiddenQuery__
 *
 * To run a query within a React component, call `useFindAllByMeHiddenQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllByMeHiddenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllByMeHiddenQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useFindAllByMeHiddenQuery(baseOptions: Apollo.QueryHookOptions<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables> & ({ variables: FindAllByMeHiddenQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>(FindAllByMeHiddenDocument, options);
      }
export function useFindAllByMeHiddenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>(FindAllByMeHiddenDocument, options);
        }
export function useFindAllByMeHiddenSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>(FindAllByMeHiddenDocument, options);
        }
export type FindAllByMeHiddenQueryHookResult = ReturnType<typeof useFindAllByMeHiddenQuery>;
export type FindAllByMeHiddenLazyQueryHookResult = ReturnType<typeof useFindAllByMeHiddenLazyQuery>;
export type FindAllByMeHiddenSuspenseQueryHookResult = ReturnType<typeof useFindAllByMeHiddenSuspenseQuery>;
export type FindAllByMeHiddenQueryResult = Apollo.QueryResult<FindAllByMeHiddenQuery, FindAllByMeHiddenQueryVariables>;
export const FindAllByUsernameDocument = gql`
    query FindAllByUsername($filter: FilterPostsInput!, $username: String!) {
  findAllByUsername(filter: $filter, username: $username) {
    id
    title
    text
    images
    createdAt
    updatedAt
    isLiked
    likes
    user {
      id
      username
      name
      avatar
      bio
      role
    }
  }
}
    `;

/**
 * __useFindAllByUsernameQuery__
 *
 * To run a query within a React component, call `useFindAllByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllByUsernameQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useFindAllByUsernameQuery(baseOptions: Apollo.QueryHookOptions<FindAllByUsernameQuery, FindAllByUsernameQueryVariables> & ({ variables: FindAllByUsernameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>(FindAllByUsernameDocument, options);
      }
export function useFindAllByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>(FindAllByUsernameDocument, options);
        }
export function useFindAllByUsernameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>(FindAllByUsernameDocument, options);
        }
export type FindAllByUsernameQueryHookResult = ReturnType<typeof useFindAllByUsernameQuery>;
export type FindAllByUsernameLazyQueryHookResult = ReturnType<typeof useFindAllByUsernameLazyQuery>;
export type FindAllByUsernameSuspenseQueryHookResult = ReturnType<typeof useFindAllByUsernameSuspenseQuery>;
export type FindAllByUsernameQueryResult = Apollo.QueryResult<FindAllByUsernameQuery, FindAllByUsernameQueryVariables>;
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
      name
      avatar
    }
    isLiked
    likes
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
export const FindMeDocument = gql`
    query FindMe {
  findMe {
    id
    username
    name
    avatar
    bio
    role
  }
}
    `;

/**
 * __useFindMeQuery__
 *
 * To run a query within a React component, call `useFindMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useFindMeQuery(baseOptions?: Apollo.QueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
      }
export function useFindMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export function useFindMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<FindMeQuery, FindMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<FindMeQuery, FindMeQueryVariables>(FindMeDocument, options);
        }
export type FindMeQueryHookResult = ReturnType<typeof useFindMeQuery>;
export type FindMeLazyQueryHookResult = ReturnType<typeof useFindMeLazyQuery>;
export type FindMeSuspenseQueryHookResult = ReturnType<typeof useFindMeSuspenseQuery>;
export type FindMeQueryResult = Apollo.QueryResult<FindMeQuery, FindMeQueryVariables>;