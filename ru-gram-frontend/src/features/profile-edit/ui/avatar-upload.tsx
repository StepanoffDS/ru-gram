'use client';

import Image from 'next/image';

import { CameraIcon, XIcon } from 'lucide-react';
import { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import { S3_URL } from '@/shared/constants/api.constants';
import { removeAvatar, updateAvatar } from '@/shared/libs/profile-avatar-api';

interface AvatarUploadProps {
  currentAvatar?: string | null;
  onAvatarChange: (avatarUrl: string | null) => void;
  disabled?: boolean;
}

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  const fileList = event.target.files;
  if (!fileList || fileList.length === 0) {
    return null;
  }

  const file = fileList[0];
  const displayUrl = URL.createObjectURL(file);

  return { file, displayUrl };
}

export function AvatarUpload({
  currentAvatar,
  onAvatarChange,
  disabled = false,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = async (event: ChangeEvent<HTMLInputElement>) => {
    const imageData = getImageData(event);
    if (!imageData) return;

    const { file, displayUrl } = imageData;

    // Валидация размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Размер файла не должен превышать 5MB');
      return;
    }

    // Валидация типа файла
    if (!file.type.startsWith('image/')) {
      toast.error('Выберите изображение');
      return;
    }

    setPreview(displayUrl);
    setUploading(true);

    try {
      const response = await updateAvatar(file);
      onAvatarChange(response.avatar);
      toast.success('Аватар успешно обновлен');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Не удалось загрузить аватар');
      setPreview(null);
    } finally {
      setUploading(false);
    }

    // Очищаем input
    event.target.value = '';
  };

  const handleRemoveAvatar = async () => {
    setUploading(true);

    try {
      await removeAvatar();
      onAvatarChange(null);
      setPreview(null);
      toast.success('Аватар удален');
    } catch (error) {
      console.error('Error removing avatar:', error);
      toast.error('Не удалось удалить аватар');
    } finally {
      setUploading(false);
    }
  };

  const displayAvatar = preview || currentAvatar;
  const isLoading = uploading;

  const getImageSrc = () => {
    if (preview) {
      return preview;
    }
    if (currentAvatar) {
      return S3_URL + currentAvatar;
    }
    return null;
  };

  const imageSrc = getImageSrc();

  return (
    <div className='flex items-center space-x-4'>
      <div className='relative'>
        {imageSrc ? (
          <div className='relative h-20 w-20 overflow-hidden rounded-full'>
            <Image
              src={imageSrc}
              alt='Avatar preview'
              fill
              className='object-cover'
            />
            {preview && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50'>
                <div className='text-center text-xs text-white'>
                  {isLoading ? 'Загрузка...' : 'Предпросмотр'}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400'>
            <CameraIcon className='h-8 w-8' />
          </div>
        )}
      </div>

      <div className='space-y-2'>
        <div className='flex space-x-2'>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            id='avatar-upload'
            onChange={handleFileSelect}
            disabled={disabled || isLoading}
          />
          <label
            htmlFor='avatar-upload'
            className={`inline-flex cursor-pointer items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 ${
              disabled || isLoading ? 'cursor-not-allowed opacity-50' : ''
            }`}
          >
            {isLoading ? 'Загрузка...' : 'Выбрать фото'}
          </label>

          {displayAvatar && (
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={handleRemoveAvatar}
              disabled={disabled || isLoading}
            >
              <XIcon className='h-4 w-4' />
            </Button>
          )}
        </div>

        <p className='text-xs text-gray-500 dark:text-gray-400'>
          JPG, PNG до 5MB
        </p>
      </div>
    </div>
  );
}
