import { toast } from 'sonner';

import { useDeletePostMutation } from '@/graphql/generated/output';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/shared/components/ui/alert-dialog';

interface DeletePostProps {
  postId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function DeletePost({ postId, isOpen, setIsOpen }: DeletePostProps) {
  const [deletePost, { loading: deleteLoading }] = useDeletePostMutation();

  const handleDeletePost = async () => {
    const result = await deletePost({
      variables: { id: postId },
      refetchQueries: ['findAllPosts'],
      awaitRefetchQueries: true,
    });
    if (result.data?.deletePost) {
      toast.success('Пост успешно удален');
      setIsOpen(false);
    } else {
      toast.error('Не удалось удалить пост');
    }
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Удаление поста</AlertDialogTitle>
          <AlertDialogDescription>
            Вы уверены, что хотите удалить данный пост? Данная функция
            безвозвратна.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeletePost}
            disabled={deleteLoading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {deleteLoading ? 'Удаление...' : 'Удалить'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
