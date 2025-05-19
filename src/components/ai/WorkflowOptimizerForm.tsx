
"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { WorkflowOptimizerSchema, type WorkflowOptimizerFormValues } from '@/lib/schemas';
import { optimizeWorkflow, type OptimizeWorkflowOutput } from '@/ai/flows/optimize-workflow';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles, TrendingUp, AlertTriangle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";


export default function WorkflowOptimizerForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<OptimizeWorkflowOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<WorkflowOptimizerFormValues>({
    resolver: zodResolver(WorkflowOptimizerSchema),
    defaultValues: {
      workflowDescription: "",
    },
  });

  const onSubmit = async (data: WorkflowOptimizerFormValues) => {
    setIsLoading(true);
    setResult(null);
    try {
      const output = await optimizeWorkflow(data);
      setResult(output);
      toast({ title: "Workflow Optimized!", description: "Suggestions generated successfully." });
    } catch (error) {
      console.error("Error optimizing workflow:", error);
      toast({ variant: "destructive", title: "Error", description: "Failed to optimize workflow. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Optimize Your Workflow</CardTitle>
          <CardDescription>Describe your current workflow, and our AI will suggest improvements.</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <FormField
                control={form.control}
                name="workflowDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="workflowDescription" className="text-lg">Current Workflow Description</FormLabel>
                    <FormControl>
                      <Textarea
                        id="workflowDescription"
                        placeholder="e.g., We receive customer orders via email, manually enter them into a spreadsheet, then a team member processes them..."
                        rows={8}
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
                    Optimizing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Optimize Workflow
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
            <CardTitle>Generating Suggestions...</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center p-10">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </CardContent>
        </Card>
      )}

      {result && (
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl">Optimization Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-1">Optimized Workflow:</h3>
              <p className="text-sm text-foreground/80 whitespace-pre-wrap bg-muted p-3 rounded-md">{result.optimizedWorkflow}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-lg mb-1 flex items-center"><TrendingUp className="mr-2 h-5 w-5 text-green-500" />Efficiency Score:</h3>
                <div className="flex items-center gap-2">
                   <Progress value={result.efficiencyScore} className="w-full h-3" />
                   <span className="font-bold text-green-500">{result.efficiencyScore}%</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 flex items-center"><AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />Error Reduction Score:</h3>
                 <div className="flex items-center gap-2">
                    <Progress value={result.errorReductionScore} className="w-full h-3" />
                    <span className="font-bold text-orange-500">{result.errorReductionScore}%</span>
                 </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
