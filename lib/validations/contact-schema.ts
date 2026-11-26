import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "يجب أن يكون الاسم حرفين على الأقل").max(80),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(120),
  phone: z.string().trim().max(30).optional(),
  company: z.string().trim().max(120).optional(),
  industry: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10, "يجب أن تكون الرسالة 10 أحرف على الأقل").max(5000),
  website: z.string().max(200).optional(),
});
export const contactSubmissionSchema = contactFormSchema.extend({
  submissionId: z.string().uuid(),
  locale: z.enum(["ar", "en"]),
  turnstileToken: z.string().min(1).max(2048).optional(),
  formStartedAt: z.number().int().positive(),
});
export type ContactFormData = z.infer<typeof contactFormSchema>;
