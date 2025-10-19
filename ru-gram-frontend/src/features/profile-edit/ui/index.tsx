'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  FindMeQuery,
  useChangeProfileInfoMutation,
} from '@/graphql/generated/output';
import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';

const profileEditSchema = z.object({
  name: z.string().min(1, 'Имя обязательно').max(50, 'Имя слишком длинное'),
  username: z
    .string()
    .min(3, 'Имя пользователя должно содержать минимум 3 символа')
    .max(30, 'Имя пользователя слишком длинное')
    .regex(
      /^[a-zA-Z0-9_]+$/,
      'Имя пользователя может содержать только буквы, цифры и подчеркивания',
    ),
  bio: z.string().max(160, 'Биография слишком длинная').optional(),
});

type ProfileEditFormData = z.infer<typeof profileEditSchema>;

interface ProfileEditFormProps {
  profile: FindMeQuery['findMe'];
  onSuccess?: () => void;
}
// TODO: Add avatar upload
export function ProfileEdit({ profile, onSuccess }: ProfileEditFormProps) {
  const router = useRouter();

  const form = useForm<ProfileEditFormData>({
    resolver: zodResolver(profileEditSchema),
    defaultValues: {
      name: profile.name || '',
      username: profile.username,
      bio: profile.bio || '',
    },
  });

  const [changeProfileInfo, { loading: changeProfileLoading }] =
    useChangeProfileInfoMutation();

  const onSubmit = async (data: ProfileEditFormData) => {
    try {
      await changeProfileInfo({
        variables: {
          data: {
            name: data.name,
            username: data.username,
            bio: data.bio || '',
          },
        },
      });

      toast.success('Профиль успешно обновлен');
      onSuccess?.();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Ошибка при обновлении профиля');
    }
  };

  const isLoading = changeProfileLoading;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6'
      >
        {/* Аватар */}
        <div className='space-y-4'>
          <FormLabel>Аватар</FormLabel>
          <div className='flex items-center space-x-4'>
            <div className='relative'>
              {!profile.avatar && (
                <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'>
                  Нет фото
                </div>
              )}
            </div>
            <div className='space-y-2'>
              <input
                type='file'
                accept='image/*'
                className='hidden'
                id='avatar-upload'
              />
              <label
                htmlFor='avatar-upload'
                className='inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              >
                Выбрать фото
              </label>
              {profile.avatar && (
                <Button
                  type='button'
                  variant='outline'
                  size='sm'
                  disabled={isLoading}
                >
                  Удалить
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Имя */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя</FormLabel>
              <FormControl>
                <Input
                  placeholder='Введите ваше имя'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl>
                <Input
                  placeholder='Введите имя пользователя'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Биография</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Расскажите о себе...'
                  className='min-h-[100px]'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='flex justify-end space-x-4'>
          <Button
            type='button'
            variant='outline'
            onClick={() => router.back()}
            disabled={isLoading}
          >
            Отмена
          </Button>
          <Button
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
