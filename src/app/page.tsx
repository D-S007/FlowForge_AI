
"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';


export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isLoading, router]);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4 bg-background p-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 text-center">
        <Skeleton className="h-6 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
       <p className="text-sm text-muted-foreground">Loading FlowForge AI...</p>
    </div>
  );
}
