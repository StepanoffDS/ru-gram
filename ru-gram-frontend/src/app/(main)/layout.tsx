import { MainSidebar } from '@/entities/sidebar';
import {
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';

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
    </SidebarProvider>
  );
}
