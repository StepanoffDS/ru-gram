'use client';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { AuthWarning } from '@/shared/components/auth-warning';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/shared/components/ui/alert-dialog';

import { CreatePostFooter } from './footer';
import { CreatePostHeader } from './header';

interface CreatePostProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CreatePost({ isOpen, setIsOpen }: CreatePostProps) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <AuthWarning
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    );
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <CreatePostHeader />

        <div className='space-y-4'>
          <p className='text-muted-foreground text-sm'>
            Форма создания поста будет добавлена здесь
          </p>
        </div>

        <CreatePostFooter setIsOpen={setIsOpen} />
      </AlertDialogContent>
    </AlertDialog>
  );
}
