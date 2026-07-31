import * as z from "zod";

export const demoSchema = z.object({
  locale: z.enum(["ar", "en"]).default("ar"),
  name: z.string().min(2, "يجب أن يكون الاسم حرفين على الأقل"),
  email: z.string().email("البريد الإلكتروني غير صالح"),
  phone: z.string().min(8, "رقم الهاتف غير صالح"),
  company: z.string().min(2, "اسم الشركة مطلوب"),
  industry: z.string().min(1, "يرجى اختيار القطاع"),
  employeeCount: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  currentSolution: z.string().optional(),
  message: z.string().optional(),
});

export const demoSubmissionSchema = demoSchema.extend({
  turnstileToken: z.string().min(1).max(2048),
});

export type DemoFormData = z.infer<typeof demoSchema>;
