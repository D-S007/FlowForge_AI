import * as z from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});
export type LoginFormValues = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // path of error
});
export type RegisterFormValues = z.infer<typeof RegisterSchema>;

export const WorkflowOptimizerSchema = z.object({
  workflowDescription: z.string().min(20, { message: "Workflow description must be at least 20 characters." }),
});
export type WorkflowOptimizerFormValues = z.infer<typeof WorkflowOptimizerSchema>;

export const CodeGeneratorSchema = z.object({
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  language: z.string().min(1, { message: "Please select a language." }),
});
export type CodeGeneratorFormValues = z.infer<typeof CodeGeneratorSchema>;

export const DocumentationGeneratorSchema = z.object({
  projectRequirements: z.string().min(20, { message: "Project requirements must be at least 20 characters." }),
});
export type DocumentationGeneratorFormValues = z.infer<typeof DocumentationGeneratorSchema>;
