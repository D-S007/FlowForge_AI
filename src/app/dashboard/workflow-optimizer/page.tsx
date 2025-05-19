
import WorkflowOptimizerForm from '@/components/ai/WorkflowOptimizerForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function WorkflowOptimizerPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Workflow Optimizer</h1>
            <p className="text-muted-foreground">Let AI enhance your operational efficiency.</p>
        </div>
      </div>
      <WorkflowOptimizerForm />
    </div>
  );
}
