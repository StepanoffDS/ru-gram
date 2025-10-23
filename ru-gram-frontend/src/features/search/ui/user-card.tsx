'use client';

import Link from 'next/link';

import { Role } from '@/features/auth/types';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { Card, CardContent } from '@/shared/components/ui/card';
import { S3_URL } from '@/shared/constants/api.constants';

interface User {
  id: string;
  email: string;
  username: string;
  name?: string | null;
  avatar?: string | null;
  bio?: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  const getInitials = (name: string | null, username: string) => {
    if (name) {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return username.slice(0, 2).toUpperCase();
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return 'destructive';
      case 'USER':
        return 'default';
      default:
        return 'secondary';
    }
  };

  return (
    <Card className='transition-shadow hover:shadow-md'>
      <CardContent className='p-4'>
        <div className='flex items-start space-x-4'>
          <Avatar className='h-12 w-12'>
            {user.avatar ? (
              <AvatarImage
                src={S3_URL + user.avatar}
                alt={user.name || user.username}
              />
            ) : (
              <AvatarFallback>
                {getInitials(user.name || '', user.username)}
              </AvatarFallback>
            )}
          </Avatar>

          <div className='min-w-0 flex-1'>
            <div className='mb-1 flex items-center space-x-2'>
              <Link
                href={`/profile/${user.username}`}
                className='hover:text-primary text-lg font-semibold transition-colors'
              >
                {user.name || user.username}
              </Link>
              {user.role === Role.ADMIN && (
                <Badge
                  variant={getRoleBadgeVariant(user.role)}
                  className='text-xs'
                >
                  {user.role}
                </Badge>
              )}
            </div>

            <p className='text-muted-foreground mb-2 text-sm'>
              @{user.username}
            </p>

            {user.bio && (
              <p className='text-muted-foreground line-clamp-2 text-sm'>
                {user.bio}
              </p>
            )}

            <div className='text-muted-foreground mt-3 flex items-center space-x-4 text-xs'>
              <span>
                Зарегистрирован:{' '}
                {new Date(user.createdAt).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
