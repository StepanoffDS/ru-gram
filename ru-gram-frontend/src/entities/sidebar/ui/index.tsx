'use client';

import Link from 'next/link';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { CreatePost } from '@/features/create-post';
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
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

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
                asChild
                size='lg'
              >
                <button onClick={() => setIsCreatePostOpen(true)}>
                  <PlusIcon />
                  <span>Создать</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarFooter />
      <CreatePost
        isOpen={isCreatePostOpen}
        setIsOpen={setIsCreatePostOpen}
      />
    </Sidebar>
  );
}
