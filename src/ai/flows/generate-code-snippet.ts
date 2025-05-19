// src/ai/flows/generate-code-snippet.ts
'use server';
/**
 * @fileOverview AI code generator flow.
 *
 * - generateCodeSnippet - A function that generates code snippets based on natural language descriptions.
 * - GenerateCodeSnippetInput - The input type for the generateCodeSnippet function.
 * - GenerateCodeSnippetOutput - The return type for the generateCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCodeSnippetInputSchema = z.object({
  description: z.string().describe('A natural language description of the desired code snippet.'),
  language: z.string().describe('The programming language for the code snippet.'),
});
export type GenerateCodeSnippetInput = z.infer<typeof GenerateCodeSnippetInputSchema>;

const GenerateCodeSnippetOutputSchema = z.object({
  code: z.string().describe('The generated code snippet.'),
});
export type GenerateCodeSnippetOutput = z.infer<typeof GenerateCodeSnippetOutputSchema>;

export async function generateCodeSnippet(input: GenerateCodeSnippetInput): Promise<GenerateCodeSnippetOutput> {
  return generateCodeSnippetFlow(input);
}

const generateCodeSnippetPrompt = ai.definePrompt({
  name: 'generateCodeSnippetPrompt',
  input: {schema: GenerateCodeSnippetInputSchema},
  output: {schema: GenerateCodeSnippetOutputSchema},
  prompt: `You are an expert code generator. Generate a code snippet based on the description and language provided.

Description: {{{description}}}
Language: {{{language}}}

Code Snippet:`,
});

const generateCodeSnippetFlow = ai.defineFlow(
  {
    name: 'generateCodeSnippetFlow',
    inputSchema: GenerateCodeSnippetInputSchema,
    outputSchema: GenerateCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await generateCodeSnippetPrompt(input);
    return output!;
  }
);
