import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home } from "lucide-react";
export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mb-2 text-muted-foreground">Sorry, the page you&apos;re looking for doesn&apos;t exist</p>
        <p className="mb-8 text-muted-foreground">عذراً، الصفحة التي تبحث عنها غير موجودة</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link href="/en">
              <Home className="me-2 h-4 w-4" />
              Go Home (EN)
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/ar">
              العودة للرئيسية (AR)
              <ArrowRight className="ms-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
