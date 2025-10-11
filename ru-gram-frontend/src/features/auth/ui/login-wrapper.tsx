import { useTranslations } from 'next-intl';

import { LoginAccountForm } from '../forms/login-account-form';
import { AuthWrapper } from './auth-wrapper';

export function LoginWrapper() {
  const t = useTranslations('auth.login');
  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref='/register'
    >
      <LoginAccountForm />
    </AuthWrapper>
  );
}
