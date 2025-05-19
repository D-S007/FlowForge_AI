
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DocumentationGeneratorSchema, type DocumentationGeneratorFormValues } from '@/lib/schemas';
import { generateProjectDocumentation, type GenerateProjectDocumentationOutput } from '@/ai/flows/generate-project-documentation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, FileText, Copy } from 'lucide-react';

export default function DocumentationGeneratorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateProjectDocumentationOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<DocumentationGeneratorFormValues>({
    resolver: zodResolver(DocumentationGeneratorSchema),
    defaultValues: {
      projectRequirements: "",
    },
  });

  const onSubmit = async (data: DocumentationGeneratorFormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await generateProjectDocumentation(data);
      setResult(output);
      toast({ title: "Documentation Generated!", description: "Project documentation created successfully." });
    } catch (error) {
      console.error("Error generating documentation:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to generate documentation. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => toast({ title: "Copied!", description: "Documentation copied to clipboard." }))
      .catch(() => toast({ variant: "destructive", title: "Error", description: "Failed to copy documentation." }));
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Generate Project Documentation</CardTitle>
          <CardDescription>Input your project requirements, and AI will generate initial documentation.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="projectRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="projectRequirements" className="text-lg">Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea
                        id="projectRequirements"
                        placeholder="e.g., The project aims to build a mobile app for task management. Key features include user authentication, task creation, due dates, and notifications..."
                        rows={10}
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
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
                    Generate Documentation
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
            <CardTitle>Generating Documentation...</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl flex items-center"><FileText className="mr-2 h-5 w-5" />Generated Documentation</CardTitle>
             <Button variant="ghost" size="icon" onClick={() => copyToClipboard(result.documentation)}>
              <Copy className="h-5 w-5" />
              <span className="sr-only">Copy documentation</span>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none bg-muted p-4 rounded-md overflow-y-auto h-[500px] whitespace-pre-wrap">
              {result.documentation}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
