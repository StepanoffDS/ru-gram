'use client';

import { useCreateUserMutation } from '@/graphql/generated/output';
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
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { AuthWrapper } from '../auth-wrapper';
import {
  CreateAccountSchema,
  createAccountSchema,
} from '../schemas/create-account.schema';
import { FieldWrapper } from '../ui/field-wrapper';
import { FormWrapper } from '../ui/form-wrapper';

export function CreateAccountForm() {
  const form = useForm<CreateAccountSchema>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });
  const { isValid } = form.formState;

  const [createUser, { loading: isLoadingCreate }] = useCreateUserMutation({
    onCompleted: () => {
      toast.success('Успешная регистрация');
    },
    onError: () => {
      toast.error('Не удалось зарегистрироваться');
    },
  });

  const onSubmit = (data: CreateAccountSchema) => {
    createUser({ variables: { data } });
  };

  return (
    <AuthWrapper
      heading='Регистрация'
      backButtonLabel='Есть аккаунт? Войти'
      backButtonHref='/login'
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormWrapper>
            <FieldWrapper
              label='Email'
              name='email'
            >
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder='example@gmail.com'
                    disabled={isLoadingCreate}
                  />
                )}
              />
            </FieldWrapper>

            <FieldWrapper
              label={
                <div className='flex items-center gap-2'>
                  <Label htmlFor='username'>Имя пользователя</Label>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <HelpCircle className='h-4 w-4 text-muted-foreground cursor-help' />
                    </TooltipTrigger>
                    <TooltipContent
                      side='top'
                      className='max-w-xs'
                    >
                      <div className='space-y-1'>
                        <p className='font-medium'>
                          Правила для имени пользователя:
                        </p>
                        <ul className='text-xs space-y-1'>
                          <li>• От 3 до 20 символов</li>
                          <li>• Только латинские буквы (a-z, A-Z)</li>
                          <li>• Цифры (0-9)</li>
                          <li>• Символы: дефис (-) и подчеркивание (_)</li>
                        </ul>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              }
            >
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value || ''}
                    placeholder='john_doe'
                    disabled={isLoadingCreate}
                  />
                )}
              />
            </FieldWrapper>

            <FieldWrapper
              label='Пароль'
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
                    disabled={isLoadingCreate}
                  />
                )}
              />
            </FieldWrapper>

            <Button
              type='submit'
              disabled={!isValid || isLoadingCreate}
            >
              Зарегистрироваться
            </Button>
          </FormWrapper>
        </form>
      </Form>
    </AuthWrapper>
  );
}
