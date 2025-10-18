'use client';

import Image from 'next/image';

import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon, XIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { FieldWrapper } from '@/features/auth/ui/field-wrapper';
import { PostModel, useUpdatePostMutation } from '@/graphql/generated/output';
import { AuthWarning } from '@/shared/components/auth-warning';
import {
  AlertDialog,
  AlertDialogContent,
} from '@/shared/components/ui/alert-dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Textarea } from '@/shared/components/ui/textarea';
import { addImageToPost } from '@/shared/libs/post-images-api';

import {
  updatePostSchema,
  type UpdatePostSchema,
} from '../schemas/update-post.schema';
import { UpdatePostFooter } from './footer';
import { UpdatePostHeader } from './header';

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const fileList = event.target.files;
  if (!fileList || fileList.length === 0) {
    return { files: [], displayUrls: [] };
  }

  const files = Array.from(fileList);
  const displayUrls = files.map((file) => URL.createObjectURL(file));

  return { files, displayUrls };
}

interface EditPostProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: PostModel;
}

export function EditPost({ isOpen, setIsOpen, post }: EditPostProps) {
  const { isAuthenticated } = useAuth();
  const [updatePost, { loading: updateLoading }] = useUpdatePostMutation();
  const [uploadLoading, setUploadLoading] = useState(false);
  const form = useForm<UpdatePostSchema>({
    resolver: zodResolver(updatePostSchema),
    defaultValues: {
      title: post.title || '',
      text: post.text || '',
    },
  });

  const [uploadProgress, setUploadProgress] = useState<string>('');

  const loading = updateLoading || uploadLoading;

  const onSubmit = async (data: UpdatePostSchema) => {
    try {
      setUploadLoading(true);

      const { data: postData } = await updatePost({
        variables: {
          id: post.id,
          data: {
            title: data.title || '',
            text: data.text || '',
          },
        },
      });

      if (!postData?.updatePost) {
        throw new Error('Не удалось обновить пост');
      }

      toast.success('Пост успешно обновлен');
      form.reset();
      setUploadProgress('');
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Не удалось обновить пост');
      setUploadProgress('');
    } finally {
      setUploadLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <AuthWarning
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    );
  }

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent>
        <UpdatePostHeader />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-4'>
              <FieldWrapper
                label='Заголовок'
                name='title'
              >
                <Input
                  {...form.register('title')}
                  placeholder='Заголовок'
                />
              </FieldWrapper>
              <FieldWrapper
                label='Текст'
                name='text'
              >
                <Textarea
                  {...form.register('text')}
                  placeholder='Текст'
                />
              </FieldWrapper>
            </div>

            <UpdatePostFooter
              setIsOpen={setIsOpen}
              isValid={!loading}
              loading={loading}
              uploadProgress={uploadProgress}
            />
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
