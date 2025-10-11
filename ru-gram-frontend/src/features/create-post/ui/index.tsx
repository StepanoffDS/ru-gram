'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

interface CreatePostProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function CreatePost({ isOpen, setIsOpen }: CreatePostProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Создать пост</AlertDialogTitle>
          <AlertDialogDescription>
            Создайте новый пост для вашей аудитории
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className='space-y-4'>
          {/* Здесь будет форма создания поста */}
          <p className='text-sm text-muted-foreground'>
            Форма создания поста будет добавлена здесь
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleClose}>Отмена</AlertDialogCancel>
          <Button>Создать</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
