
import CodeGeneratorForm from '@/components/ai/CodeGeneratorForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code2 } from 'lucide-react';

export default function CodeGeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <Code2 className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Code Generator</h1>
            <p className="text-muted-foreground">Generate code snippets in multiple languages with AI.</p>
        </div>
      </div>
      <CodeGeneratorForm />
    </div>
  );
}
