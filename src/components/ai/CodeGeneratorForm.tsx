
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CodeGeneratorSchema, type CodeGeneratorFormValues } from '@/lib/schemas';
import { generateCodeSnippet, type GenerateCodeSnippetOutput } from '@/ai/flows/generate-code-snippet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, Copy } from 'lucide-react';

const supportedLanguages = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "typescript", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
];

export default function CodeGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateCodeSnippetOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<CodeGeneratorFormValues>({
    resolver: zodResolver(CodeGeneratorSchema),
    defaultValues: {
      description: "",
      language: "",
    },
  });

  const onSubmit = async (data: CodeGeneratorFormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateCodeSnippet(data);
      setResult(output);
      toast({ title: "Code Snippet Generated!", description: "Your code has been successfully generated." });
    } catch (error) {
      console.error("Error generating code snippet:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to generate code. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: "Copied!", description: "Code snippet copied to clipboard." }))
      .catch(() => toast({ variant: "destructive", title: "Error", description: "Failed to copy code." }));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Generate Code Snippets</CardTitle>
          <CardDescription>Describe the functionality you need, choose a language, and let AI write the code.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="description" className="text-lg">Code Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="description"
                        placeholder="e.g., A function that takes two numbers and returns their sum."
                        rows={5}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="language" className="text-lg">Programming Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger id="language">
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {supportedLanguages.map(lang => (
                          <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && (
         <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Generating Code...</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Generated Code Snippet</CardTitle>
            <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.code)}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy code</span>
            </Button>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code className={`language-${form.getValues("language")}`}>{result.code}</code>
            </pre>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
