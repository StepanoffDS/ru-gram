import {
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

interface CreatePostFooterProps {
  setIsOpen: (isOpen: boolean) => void;
}

export function CreatePostFooter({ setIsOpen }: CreatePostFooterProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AlertDialogFooter>
      <AlertDialogCancel onClick={handleClose}>Отмена</AlertDialogCancel>
      <Button>Создать</Button>
    </AlertDialogFooter>
  );
}
