import * as z from "zod";
import { demoFormSchema } from "./schema";

export type DemoFormData = z.infer<typeof demoFormSchema>;