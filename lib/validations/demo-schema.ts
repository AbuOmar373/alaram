import * as z from "zod";

export const demoSchema = z.object({
  locale: z.enum(["ar", "en"]).default("ar"),
  name: z.string().trim().min(2, "يجب أن يكون الاسم حرفين على الأقل").max(80),
  email: z.string().trim().email("البريد الإلكتروني غير صالح").max(120),
  phone: z
    .string()
    .trim()
    .min(8, "رقم الهاتف غير صالح")
    .max(20, "رقم الهاتف غير صالح")
    .regex(/^\+?[0-9\s\-()]+$/, "رقم الهاتف غير صالح"),
  company: z.string().trim().min(2, "اسم الشركة مطلوب").max(120),
  industry: z.string().min(1, "يرجى اختيار القطاع").max(40),
  employeeCount: z.enum(["1-5", "6-20", "21-50", "51-100", "100+"]).optional(),
  preferredDate: z.string().max(10).optional(),
  preferredTime: z.enum(["morning", "afternoon", "evening"]).optional(),
  currentSolution: z.string().trim().max(120).optional(),
  message: z.string().max(5000).optional(),
  // Anti-bot fields: `website` is a hidden honeypot that real users never fill.
  website: z.string().max(200).optional(),
});

export const demoSubmissionSchema = demoSchema.extend({
  turnstileToken: z.string().min(1).max(2048).optional(),
  formStartedAt: z.number().int().positive().optional(),
});

export type DemoFormData = z.infer<typeof demoSchema>;
export type DemoSubmissionData = z.infer<typeof demoSubmissionSchema>;
