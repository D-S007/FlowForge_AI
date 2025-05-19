
import DocumentationGeneratorForm from '@/components/ai/DocumentationGeneratorForm';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function DocumentationGeneratorPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center gap-3 mb-6">
        <FileText className="h-10 w-10 text-primary" />
        <div>
            <h1 className="text-3xl font-bold tracking-tight">AI Documentation Generator</h1>
            <p className="text-muted-foreground">Automate the creation of your project documentation.</p>
        </div>
      </div>
      <DocumentationGeneratorForm />
    </div>
  );
}
