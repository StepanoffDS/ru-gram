import { LoginAccountForm } from '@/features/auth';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('auth.login');
  return {
    title: t('heading'),
  };
}

export default function LoginAccountPage() {
  return <LoginAccountForm />;
}
