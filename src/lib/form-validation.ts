import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email(),
  message: z.string().min(5).max(300),
  html: z.string().optional(),
  subject: z.string().optional(),
});
export type FormSchema = z.infer<typeof formSchema>;
