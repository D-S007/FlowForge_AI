
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { LoginSchema, type LoginFormValues } from '@/lib/schemas';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import AppLogo from '@/components/icons/AppLogo';
import { Loader2 } from 'lucide-react';

export default function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      await login(data);
      toast({ title: 'Login Successful', description: 'Welcome back!' });
      // Redirect is handled by AuthContext
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({ variant: 'destructive', title: 'Login Failed', description: errorMessage });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center text-center">
        <AppLogo className="h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Welcome Back!</CardTitle>
        <CardDescription>Log in to access FlowForge AI.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input id="email" type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <FormControl>
                    <Input id="password" type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && <p className="text-sm font-medium text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full" disabled={authLoading}>
              {authLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Log In
            </Button>
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/register">Register here</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
