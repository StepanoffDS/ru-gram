import {
  AlertDialogCancel,
  AlertDialogFooter,
} from '@/shared/components/ui/alert-dialog';
import { Button } from '@/shared/components/ui/button';

interface UpdatePostFooterProps {
  setIsOpen: (isOpen: boolean) => void;
  isValid: boolean;
  loading?: boolean;
  uploadProgress?: string;
}

export function UpdatePostFooter({
  setIsOpen,
  isValid,
  loading = false,
  uploadProgress = '',
}: UpdatePostFooterProps) {
  const handleClose = () => {
    setIsOpen(false);
  };

  const getButtonText = () => {
    if (uploadProgress) return uploadProgress;
    if (loading) return 'Обновление...';
    return 'Обновить';
  };

  return (
    <AlertDialogFooter className='mt-2'>
      <AlertDialogCancel
        onClick={handleClose}
        disabled={loading}
      >
        Отмена
      </AlertDialogCancel>
      <Button
        disabled={!isValid || loading}
        type='submit'
      >
        {getButtonText()}
      </Button>
    </AlertDialogFooter>
  );
}
