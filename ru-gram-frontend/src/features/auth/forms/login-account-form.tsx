'use client';

import { useLoginUserMutation } from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import { Form, FormField } from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip';
import { zodResolver } from '@hookform/resolvers/zod';
import { HelpCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../auth-wrapper';

import { useRouter } from 'next/navigation';
import {
  loginAccountSchema,
  type LoginAccountSchema,
} from '../schemas/login-account.schema';
import { FieldWrapper } from '../ui/field-wrapper';
import { FormWrapper } from '../ui/form-wrapper';

export function LoginAccountForm() {
  const t = useTranslations('auth.login');
  const router = useRouter();
  const form = useForm<LoginAccountSchema>({
    resolver: zodResolver(loginAccountSchema),
    defaultValues: {
      login: '',
      password: '',
    },
  });
  const { isValid } = form.formState;

  const [loginUser, { loading: isLoadingLogin }] = useLoginUserMutation({
    onCompleted: () => {
      toast.success(t('successMessage'));
      router.push('/');
    },
    onError: () => {
      toast.error(t('errorMessage'));
    },
  });

  const onSubmit = (data: LoginAccountSchema) => {
    loginUser({ variables: { data } });
  };

  return (
    <AuthWrapper
      heading={t('heading')}
      backButtonLabel={t('backButtonLabel')}
      backButtonHref='/register'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormWrapper>
            <FieldWrapper
              label={
                <div className='flex items-center gap-2'>
                  <Label htmlFor='login'>{t('loginLabel')}</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent
                      side='top'
                      className='max-w-xs'
                    >
                      <div className='space-y-1'>
                        <p className='text-xs'>{t('loginTooltip.title')}</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              }
            >
              <FormField
                control={form.control}
                name='login'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder='john_doe'
                    disabled={isLoadingLogin}
                  />
                )}
              />
            </FieldWrapper>

            <FieldWrapper
              label={t('passwordLabel')}
              name='password'
            >
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder='********'
                    disabled={isLoadingLogin}
                  />
                )}
              />
            </FieldWrapper>

            <Button
              type='submit'
              disabled={!isValid || isLoadingLogin}
            >
              {t('submitButton')}
            </Button>
          </FormWrapper>
        </form>
      </Form>
    </AuthWrapper>
  );
}
