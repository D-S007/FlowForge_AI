
"use client";

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import AppHeader from '@/components/layout/AppHeader';
import AppSidebar from '@/components/layout/AppSidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Loader2 } from 'lucide-react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="ml-3 text-lg">Loading your workspace...</p>
      </div>
    );
  }

  if (!user) {
    // This should ideally not be reached due to the redirect in useEffect,
    // but it's a fallback.
    return null; 
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="flex h-screen bg-background">
        <AppSidebar />
        <SidebarInset className="flex flex-col flex-1 overflow-hidden">
          <AppHeader />
          <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
