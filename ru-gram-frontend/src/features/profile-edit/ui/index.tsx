'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
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

import { AvatarUpload } from './avatar-upload';

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

export function ProfileEdit({ profile, onSuccess }: ProfileEditFormProps) {
  const router = useRouter();
  const [currentAvatar, setCurrentAvatar] = useState(profile.avatar);

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
        <div className='space-y-4'>
          <FormLabel>Аватар</FormLabel>
          <AvatarUpload
            currentAvatar={currentAvatar}
            onAvatarChange={setCurrentAvatar}
            disabled={isLoading}
          />
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
