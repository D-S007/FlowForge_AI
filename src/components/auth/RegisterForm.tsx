
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { RegisterSchema, type RegisterFormValues } from '@/lib/schemas';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import AppLogo from '@/components/icons/AppLogo';
import { Loader2 } from 'lucide-react';

export default function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const { register, isLoading: authLoading } = useAuth();
  const { toast } = useToast();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setError(null);
    try {
      await register(data);
      toast({ title: 'Registration Successful', description: 'Welcome to FlowForge AI!' });
      // Redirect is handled by AuthContext
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred.';
      setError(errorMessage);
      toast({ variant: 'destructive', title: 'Registration Failed', description: errorMessage });
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="items-center text-center">
        <AppLogo className="h-12 w-12 text-primary mb-2" />
        <CardTitle className="text-3xl font-bold">Create Account</CardTitle>
        <CardDescription>Join FlowForge AI and streamline your workflows.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Full Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                  <FormControl>
                    <Input id="confirmPassword" type="password" placeholder="••••••••" {...field} />
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
              Create Account
            </Button>
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href="/login">Log in</Link>
              </Button>
            </p>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
