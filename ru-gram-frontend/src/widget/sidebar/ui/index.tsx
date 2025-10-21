'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import {
  HomeIcon,
  LogOutIcon,
  PlusIcon,
  SearchIcon,
  UserIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { useAuth } from '@/features/auth/hooks/useAuth';
import { CreatePost } from '@/features/post/create-post';
import { useLogoutUserMutation } from '@/graphql/generated/output';
import { Logo } from '@/shared/components/logo';
import { ThemeToggleSwitch } from '@/shared/components/theme-toggle-switch';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';

export function MainSidebar() {
  const [isOpenCreatePost, setIsOpenCreatePost] = useState(false);
  const router = useRouter();
  const { exit } = useAuth();

  const [logoutUser, { loading: isLoadingLogout }] = useLogoutUserMutation({
    onCompleted: () => {
      exit();
      toast.success('Вы успешно вышли из аккаунта');
      router.push('/login');
    },
    onError: () => {
      toast.error('Ошибка при выходе из аккаунта');
    },
  });

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <Sidebar>
      <SidebarHeader className='mt-4'>
        <Link href='/'>
          <Logo />
        </Link>
      </SidebarHeader>
      <SidebarContent className='mt-8 px-2'>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                onClick={() => setIsOpenCreatePost(true)}
              >
                <PlusIcon />
                Создать
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                asChild={true}
              >
                <Link href='/'>
                  <HomeIcon className='size-4' />
                  Главная
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                asChild={true}
              >
                <Link href='/profile/me'>
                  <UserIcon />
                  Мой профиль
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton
                size='lg'
                asChild={true}
              >
                <Link href='/search'>
                  <SearchIcon />
                  Поиск
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter className='p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <ThemeToggleSwitch />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              size='lg'
              onClick={handleLogout}
              disabled={isLoadingLogout}
              className='w-full text-red-500 disabled:text-red-300'
            >
              <LogOutIcon className='size-4' />
              {isLoadingLogout ? 'Выход...' : 'Выйти'}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <CreatePost
        isOpen={isOpenCreatePost}
        setIsOpen={setIsOpenCreatePost}
      />
    </Sidebar>
  );
}
