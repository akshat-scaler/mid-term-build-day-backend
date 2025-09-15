import z from "zod";
export const signupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(10),
  username: z.string().min(5).max(50),
});
export const signinSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(10),
});

export const notesSchema = z.object({
  title: z.string().max(50),
  tags: z.array(z.string()),
  content: z.string().max(100),
});
