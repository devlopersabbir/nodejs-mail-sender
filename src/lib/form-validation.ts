import z from "zod";

export const formSchema = z.object({
  name: z.string().min(3).max(30),
  email: z.string().email().endsWith("@gmail.com", {
    message: "Email must end with (@gmail.com)",
  }),
  message: z.string().min(5).max(300),
});
export type FormSchema = z.infer<typeof formSchema>;
