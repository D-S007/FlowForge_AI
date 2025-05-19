// Optimize workflow flow
'use server';
/**
 * @fileOverview AI-powered assistant that suggests optimizations to improve workflow efficiency and reduce errors.
 *
 * - optimizeWorkflow - A function that handles the workflow optimization process.
 * - OptimizeWorkflowInput - The input type for the optimizeWorkflow function.
 * - OptimizeWorkflowOutput - The return type for the optimizeWorkflow function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OptimizeWorkflowInputSchema = z.object({
  workflowDescription: z
    .string()
    .describe('A detailed description of the current workflow.'),
});
export type OptimizeWorkflowInput = z.infer<typeof OptimizeWorkflowInputSchema>;

const OptimizeWorkflowOutputSchema = z.object({
  optimizedWorkflow: z
    .string()
    .describe('A description of the optimized workflow with suggested improvements.'),
  efficiencyScore: z
    .number()
    .describe('A numerical score indicating the predicted efficiency improvement (0-100).'),
  errorReductionScore: z
    .number()
    .describe('A numerical score indicating the predicted error reduction (0-100).'),
});
export type OptimizeWorkflowOutput = z.infer<typeof OptimizeWorkflowOutputSchema>;

export async function optimizeWorkflow(input: OptimizeWorkflowInput): Promise<OptimizeWorkflowOutput> {
  return optimizeWorkflowFlow(input);
}

const prompt = ai.definePrompt({
  name: 'optimizeWorkflowPrompt',
  input: {schema: OptimizeWorkflowInputSchema},
  output: {schema: OptimizeWorkflowOutputSchema},
  prompt: `You are an AI-powered workflow optimization expert. Analyze the provided workflow description and suggest optimizations to improve efficiency and reduce potential errors. Provide an efficiency score and an error reduction score (0-100) to quantify the predicted impact of your suggestions.\n\nCurrent Workflow Description: {{{workflowDescription}}}`,
});

const optimizeWorkflowFlow = ai.defineFlow(
  {
    name: 'optimizeWorkflowFlow',
    inputSchema: OptimizeWorkflowInputSchema,
    outputSchema: OptimizeWorkflowOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
