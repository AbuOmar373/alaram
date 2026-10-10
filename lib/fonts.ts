import { Tajawal } from "next/font/google";

// Only the weights the UI uses (font-medium/semibold/bold/black + body text);
// every extra weight adds two preloaded font files per page.
export const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tajawal",
  display: "swap",
});
