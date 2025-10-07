import { CreateAccountForm } from '@/features/auth/forms/create-account-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Создание аккаунта',
};

export default function CreateAccountPage() {
  return <CreateAccountForm />;
}
