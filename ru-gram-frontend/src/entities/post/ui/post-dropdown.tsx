'use client';

import { Edit, MoreVertical, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { EditPost } from '@/features/post/edit-post';
import { PostModel } from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { isPostOwnedByUser } from '@/shared/utils/is-post-owned-by-user';

export function PostDropdown({ post }: { post: PostModel }) {
  const [isEditPostOpen, setIsEditPostOpen] = useState(false);
  const { userId, isAdmin } = useAuth();
  const isOwnedByUser = isPostOwnedByUser({
    postUserId: post.user.id,
    currentUserId: userId,
  });

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
          <DropdownMenuItem
            onClick={() => console.log('Delete post')}
            variant='destructive'
            className='flex items-center gap-2'
          >
            <Trash2 className='size-4' />
            Удалить
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditPost
        isOpen={isEditPostOpen}
        setIsOpen={setIsEditPostOpen}
        post={post}
      />
    </>
  );
}
