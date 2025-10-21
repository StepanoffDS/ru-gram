'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { HomeIcon, PlusIcon, SearchIcon, UserIcon } from 'lucide-react';
import { useState } from 'react';

import { CreatePost } from '@/features/post/create-post';
import { Logo } from '@/shared/components/logo';
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
      <SidebarFooter />
      <CreatePost
        isOpen={isOpenCreatePost}
        setIsOpen={setIsOpenCreatePost}
      />
    </Sidebar>
  );
}
