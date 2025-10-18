'use client';

import { Edit, Eye, EyeOff, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { DeletePost } from '@/features/post/delete-post';
import { EditPost } from '@/features/post/edit-post';
import { HidePost } from '@/features/post/hide-post';
import { PostModel } from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ListPost } from '@/shared/libs/types';
import { isPostOwnedByUser } from '@/shared/utils/is-post-owned-by-user';

export function PostDropdown({ post }: { post: ListPost | PostModel }) {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const [isDeletePostOpen, setIsDeletePostOpen] = useState(false);
  const [isHidePostOpen, setIsHidePostOpen] = useState(false);
  const { userId, isAdmin } = useAuth();
  const isOwnedByUser = isPostOwnedByUser({
    postUserId: post.user.id,
    currentUserId: userId,
  });
  const hasAccessToDeletePost = isOwnedByUser || isAdmin;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon-sm'
            className='text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
          >
            <MoreVertical className='size-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-48'
        >
          {isOwnedByUser && (
            <DropdownMenuItem
              onClick={() => setIsEditPostOpen(true)}
              className='flex items-center gap-2'
            >
              <Edit className='size-4' />
              Редактировать
            </DropdownMenuItem>
          )}
          {isOwnedByUser && (
            <DropdownMenuItem
              className='flex items-center gap-2'
              onClick={() => setIsHidePostOpen(true)}
            >
              {(post as PostModel).hidden ? (
                <Eye className='size-4' />
              ) : (
                <EyeOff className='size-4' />
              )}
              {(post as PostModel).hidden ? 'Показать' : 'Скрыть'}
            </DropdownMenuItem>
          )}
          {hasAccessToDeletePost && (
            <DropdownMenuItem
              variant='destructive'
              className='flex items-center gap-2'
              onClick={() => setIsDeletePostOpen(true)}
            >
              <Trash2 className='size-4' />
              Удалить
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPost
        post={post}
        isOpen={isEditPostOpen}
        setIsOpen={setIsEditPostOpen}
      />
      <DeletePost
        postId={post.id}
        isOpen={isDeletePostOpen}
        setIsOpen={setIsDeletePostOpen}
      />
      <HidePost
        postId={post.id}
        hidden={(post as PostModel).hidden ?? false}
        isOpen={isHidePostOpen}
        setIsOpen={setIsHidePostOpen}
      />
    </>
  );
}
