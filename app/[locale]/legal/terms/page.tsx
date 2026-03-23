import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
const LAST_UPDATED = "2026-03-23";

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isArabic = locale === "ar";
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">
            {isArabic ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? `آخر تحديث: ${LAST_UPDATED}` : `Last Updated: ${LAST_UPDATED}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              {isArabic ? (
                <>
                  <p>
                    تنظم هذه الشروط استخدام موقع الأرام وخدماته الإلكترونية. باستخدام الموقع، فإنك تقر بمراجعة هذه
                    الشروط والموافقة عليها.
                  </p>
                  <h2>1. نطاق الخدمة</h2>
                  <p>تقدم الأرام خدماتها إلكترونيًا داخل السعودية، ولا يتضمن الموقع عنوانًا فعليًا للزيارة المباشرة.</p>
                  <h2>2. الاستخدام المقبول</h2>
                  <p>يجب استخدام الموقع والخدمات بشكل نظامي، والامتناع عن أي استخدام يسبب إساءة أو تعطيلًا للخدمة.</p>
                  <h2>3. دقة المعلومات</h2>
                  <p>يلتزم المستخدم بتقديم بيانات صحيحة عند تعبئة النماذج أو طلب التواصل، ويتحمل مسؤولية دقتها.</p>
                  <h2>4. الملكية الفكرية</h2>
                  <p>حقوق المحتوى والعلامة والتصاميم المرتبطة بالموقع محفوظة للأرام ما لم يُذكر خلاف ذلك.</p>
                  <h2>5. التعديلات</h2>
                  <p>يجوز تحديث هذه الشروط عند الحاجة، ويُعتمد تاريخ آخر تحديث المنشور في أعلى الصفحة.</p>
                </>
              ) : (
                <>
                  <p>
                    These terms govern the use of ALaram website and online services. By using the site, you
                    acknowledge and agree to these terms.
                  </p>
                  <h2>1. Service Scope</h2>
                  <p>ALaram provides services online across Saudi Arabia and does not offer a fixed office visit location.</p>
                  <h2>2. Acceptable Use</h2>
                  <p>You must use the website and services lawfully and avoid any misuse that harms or interrupts service.</p>
                  <h2>3. Information Accuracy</h2>
                  <p>Users are responsible for providing accurate information in forms and communication requests.</p>
                  <h2>4. Intellectual Property</h2>
                  <p>Website content, branding, and design rights belong to ALaram unless explicitly stated otherwise.</p>
                  <h2>5. Updates</h2>
                  <p>These terms may be updated when needed. The last updated date at the top of this page applies.</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

