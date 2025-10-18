import { toast } from 'sonner';

import { useToggleHidePostMutation } from '@/graphql/generated/output';
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
import { Nullable } from '@/shared/libs/types';

interface HidePostProps {
  postId: string;
  hidden: Nullable<boolean>;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function HidePost({ postId, hidden, isOpen, setIsOpen }: HidePostProps) {
  const [hidePost, { loading: hideLoading }] = useToggleHidePostMutation();

  const handleHidePost = async () => {
    const result = await hidePost({
      variables: { postId },
      refetchQueries: ['findAllPosts'],
      awaitRefetchQueries: true,
    });
    if (result.data?.toggleHidePost) {
      toast.success(hidden ? 'Пост успешно показан' : 'Пост успешно скрыт');
      setIsOpen(false);
    } else {
      toast.error(
        hidden ? 'Не удалось показать пост' : 'Не удалось скрыть пост',
      );
    }
  };

  const getButtonText = () => {
    if (hideLoading) return hidden ? 'Показ...' : 'Скрытие...';
    return hidden ? 'Показать' : 'Скрыть';
  };

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {hidden ? 'Показать пост' : 'Скрыть пост'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {hidden
              ? 'Вы уверены, что хотите показать данный пост? Этот пост будет показан в ленты других пользователей.'
              : 'Вы уверены, что хотите скрыть данный пост? Этот пост будет скрыт из ленты других пользователей.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Отмена</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleHidePost}
            disabled={hideLoading}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            {getButtonText()}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
