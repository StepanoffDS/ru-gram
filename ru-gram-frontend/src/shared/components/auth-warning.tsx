'use client';

import Link from 'next/link';

import { useTranslations } from 'next-intl';

import { LoginAccountForm } from '@/features/auth';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
} from '@/shared/components/ui/alert-dialog';

interface AuthWarningProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function AuthWarning({ isOpen, setIsOpen }: AuthWarningProps) {
  const t = useTranslations('auth.login');
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className='mb-2 text-2xl font-semibold'>
          Необходимо авторизоваться
        </AlertDialogHeader>
        <LoginAccountForm
          cancelButton={
            <AlertDialogCancel
              onClick={() => setIsOpen(false)}
              className='mr-2'
            >
              Отмена
            </AlertDialogCancel>
          }
        />
        <p className='text-sm text-gray-500'>
          Нет аккаунта?{' '}
          <Link
            href='/register'
            className='text-primary'
          >
            Зарегистрироваться
          </Link>
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}
