import { z } from 'zod';

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

export const createPostSchema = z
  .object({
    title: z.string().optional(),
    text: z.string().optional(),
    images: z
      .custom<FileList>()
      .optional()
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return Array.from(files).every((file) => file.size <= MAX_FILE_SIZE);
      }, 'Максимальный размер файла 10MB')
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return Array.from(files).every((file) =>
          ACCEPTED_IMAGE_TYPES.includes(file.type),
        );
      }, 'Поддерживаются только форматы: JPEG, PNG, WebP, GIF')
      .refine((files) => {
        if (!files || files.length === 0) return true;
        return files.length <= 10;
      }, 'Максимум 10 изображений'),
  })
  .refine(
    (data) =>
      data.title || data.text || (data.images && data.images.length > 0),
    {
      message: 'Пост не может быть пустым',
      path: ['title'],
    },
  );

export type CreatePostSchema = z.infer<typeof createPostSchema>;
