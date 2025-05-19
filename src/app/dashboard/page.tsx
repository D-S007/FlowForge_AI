
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Code2, FileText, ArrowRight } from 'lucide-react';
import Image from 'next/image';

const features = [
  {
    title: 'AI Workflow Optimizer',
    description: 'Analyze your current workflows and get AI-powered suggestions to boost efficiency and reduce errors.',
    href: '/dashboard/workflow-optimizer',
    icon: Lightbulb,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'workflow optimization'
  },
  {
    title: 'AI Code Generator',
    description: 'Describe what you need in natural language, and our AI will generate code snippets in various languages.',
    href: '/dashboard/code-generator',
    icon: Code2,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'code generation'
  },
  {
    title: 'AI Documentation Generator',
    description: 'Automatically create comprehensive project documentation from your project requirements.',
    href: '/dashboard/documentation-generator',
    icon: FileText,
    image: 'https://placehold.co/600x400.png',
    imageHint: 'documentation writing'
  },
];

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8 shadow-lg bg-card border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-primary">Welcome to FlowForge AI</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Your intelligent assistant for optimizing workflows, generating code, and creating documentation.
            Let&apos;s get started!
          </CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-foreground">
                Select one of the powerful AI tools below to begin enhancing your productivity.
            </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Card key={feature.title} className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
            <div className="relative h-48 w-full">
              <Image 
                src={feature.image} 
                alt={feature.title} 
                layout="fill" 
                objectFit="cover" 
                data-ai-hint={feature.imageHint}
              />
            </div>
            <CardHeader>
              <div className="flex items-center mb-2">
                <feature.icon className="h-8 w-8 text-primary mr-3" />
                <CardTitle className="text-2xl">{feature.title}</CardTitle>
              </div>
              <CardDescription className="text-sm text-muted-foreground h-20 overflow-hidden"> {/* Fixed height for description */}
                {feature.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow" /> {/* Pushes footer to bottom */}
            <CardContent>
              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link href={feature.href}>
                  Go to {feature.title.replace("AI ", "")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
