import {
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { MainSidebar } from '@/widget/sidebar';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <main className='relative flex-1'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
