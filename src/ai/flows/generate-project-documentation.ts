'use server';

/**
 * @fileOverview An AI agent that generates project documentation based on project requirements.
 *
 * - generateProjectDocumentation - A function that generates project documentation.
 * - GenerateProjectDocumentationInput - The input type for the generateProjectDocumentation function.
 * - GenerateProjectDocumentationOutput - The return type for the generateProjectDocumentation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProjectDocumentationInputSchema = z.object({
  projectRequirements: z
    .string()
    .describe('The detailed requirements for the project.'),
});
export type GenerateProjectDocumentationInput = z.infer<
  typeof GenerateProjectDocumentationInputSchema
>;

const GenerateProjectDocumentationOutputSchema = z.object({
  documentation: z
    .string()
    .describe('The generated project documentation.'),
});
export type GenerateProjectDocumentationOutput = z.infer<
  typeof GenerateProjectDocumentationOutputSchema
>;

export async function generateProjectDocumentation(
  input: GenerateProjectDocumentationInput
): Promise<GenerateProjectDocumentationOutput> {
  return generateProjectDocumentationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProjectDocumentationPrompt',
  input: {schema: GenerateProjectDocumentationInputSchema},
  output: {schema: GenerateProjectDocumentationOutputSchema},
  prompt: `You are an expert project manager specializing in generating project documentation.

You will use the project requirements to generate comprehensive project documentation, including but not limited to project overview, goals, scope, deliverables, timelines, and roles & responsibilities.

Project Requirements: {{{projectRequirements}}}`,
});

const generateProjectDocumentationFlow = ai.defineFlow(
  {
    name: 'generateProjectDocumentationFlow',
    inputSchema: GenerateProjectDocumentationInputSchema,
    outputSchema: GenerateProjectDocumentationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
