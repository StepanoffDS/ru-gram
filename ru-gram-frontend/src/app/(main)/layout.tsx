import { MainSidebar } from '@/entities/sidebar';
import { CreatePost } from '@/features/create-post';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { Suspense } from 'react';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Suspense fallback={null}>
        <CreatePost />
      </Suspense>
    </SidebarProvider>
  );
}
