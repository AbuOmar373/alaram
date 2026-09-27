import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";
import { PurchaseLinks } from "@/components/commerce/purchase-links";

const LAST_UPDATED = "2026-09-27";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/legal/terms",
    title: currentLocale === "ar" ? "الشروط والأحكام" : "Terms & Conditions",
    description:
      currentLocale === "ar"
        ? "الشروط والأحكام الخاصة باستخدام موقع الأرام وخدماته الإلكترونية."
        : "Terms and conditions for using ALaram website and online services.",
  });
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isArabic = locale === "ar";
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-3xl font-bold text-heading">
            {isArabic ? "الشروط والأحكام" : "Terms & Conditions"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>
                {isArabic ? `آخر تحديث: ${LAST_UPDATED}` : `Last Updated: ${LAST_UPDATED}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_p]:leading-8">
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
                  <h2>6. الطلب والدفع والتسليم</h2>
                  <p>يُوضح وصف الباقة وسعرها ومدة الاشتراك أو طبيعة الشراء لمرة واحدة قبل إتمام الطلب. يُؤكد الإجمالي وأي ضريبة أو رسوم إضافية وموعد التسليم قبل السداد، وتُسلّم المنتجات والخدمات إلكترونيًا وفق سياسة التسليم والتفعيل.</p>
                  <h2>7. الاستبدال والاسترجاع</h2>
                  <p>تخضع طلبات تغيير الباقات وإلغاء التجديد والاسترداد لسياسة الاستبدال والاسترجاع المرتبطة أدناه. وتبقى حقوق المستهلك النظامية نافذة، ولا تسري التحديثات بأثر رجعي على طلب مكتمل بما ينتقص من حقوقه.</p>
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
                  <h2>6. Ordering, Payment, and Delivery</h2>
                  <p>The package description, price, and subscription term or one-time purchase details are provided before ordering. The total, any tax or extra fees, and delivery date are confirmed before payment. Products and services are delivered electronically under the delivery and activation policy.</p>
                  <h2>7. Exchanges and Refunds</h2>
                  <p>Plan changes, renewal cancellations, and refunds are governed by the exchange and refund policy linked below. Statutory consumer rights remain in effect, and updates do not retroactively reduce rights for completed orders.</p>
                </>
              )}
            </CardContent>
          </Card>
          <PurchaseLinks locale={locale} />
        </div>
      </div>
    </div>
  );
}
