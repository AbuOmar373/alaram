import type { Metadata } from "next";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { setRequestLocale } from "next-intl/server";
import { brand } from "@/lib/brand";
import { buildPageMetadata, getLocaleFromParam } from "@/lib/seo";

const LAST_UPDATED = "2026-03-23";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const currentLocale = getLocaleFromParam(locale);

  return buildPageMetadata({
    locale: currentLocale,
    path: "/legal/privacy",
    title: currentLocale === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
    description:
      currentLocale === "ar"
        ? "سياسة الخصوصية الخاصة بموقع الأرام والخدمات الإلكترونية المقدمة داخل السعودية."
        : "Privacy policy for ALaram website and online services provided in Saudi Arabia.",
  });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isArabic = locale === "ar";

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">
            {isArabic ? "سياسة الخصوصية" : "Privacy Policy"}
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
                    توضح هذه السياسة كيفية جمع واستخدام وحماية البيانات في موقع الأرام وخدماته الإلكترونية.
                    هذه السياسة عامة وتُطبق على استخدام الموقع، طلبات التواصل، والخدمات المقدمة عن بُعد داخل السعودية.
                  </p>

                  <h2>1. من نحن</h2>
                  <p>
                    الأرام منصة حلول أعمال تقدم خدمات إلكترونية لقطاعات متعددة داخل السعودية، مع التركيز على سهولة
                    الاستخدام، سرعة الأداء، ودقة التقارير.
                  </p>

                  <h2>2. البيانات التي نجمعها</h2>
                  <p>قد نجمع البيانات التالية عند استخدام الموقع أو تعبئة النماذج:</p>
                  <ul>
                    <li>الاسم</li>
                    <li>رقم الهاتف</li>
                    <li>البريد الإلكتروني</li>
                    <li>اسم المنشأة</li>
                    <li>الرسائل والاستفسارات المرسلة عبر النماذج</li>
                  </ul>

                  <h2>3. بيانات الاستخدام والتحليلات وملفات الارتباط</h2>
                  <p>
                    قد يتم جمع بيانات تقنية مثل نوع المتصفح، نوع الجهاز، الصفحات التي تمت زيارتها، وقت الزيارة،
                    ومؤشرات الأداء. كما قد تُستخدم ملفات الارتباط (Cookies) لتحسين تجربة الاستخدام وتحليل الأداء.
                  </p>

                  <h2>4. لماذا نستخدم هذه البيانات</h2>
                  <ul>
                    <li>الرد على الاستفسارات وطلبات التواصل</li>
                    <li>تقديم وتحسين خدماتنا الإلكترونية</li>
                    <li>تحليل أداء الموقع وتحسين تجربة المستخدم</li>
                    <li>حماية الموقع ومتابعة الأعطال والاستخدام غير المشروع</li>
                  </ul>

                  <h2>5. مشاركة البيانات</h2>
                  <p>
                    لا نبيع البيانات الشخصية. وقد نشارك بعض البيانات عند الحاجة مع مزودي خدمات موثوقين (مثل الاستضافة
                    أو أدوات التحليل أو التواصل) فقط بالقدر اللازم لتشغيل الموقع والخدمات.
                  </p>

                  <h2>6. حماية البيانات</h2>
                  <p>
                    نطبق إجراءات تنظيمية وتقنية مناسبة لحماية البيانات من الوصول غير المصرح به أو التعديل أو الفقد.
                    رغم ذلك، لا يمكن ضمان أمان مطلق لأي نقل بيانات عبر الإنترنت.
                  </p>

                  <h2>7. مدة الاحتفاظ بالبيانات</h2>
                  <p>
                    نحتفظ بالبيانات للفترة اللازمة لتحقيق أغراض التشغيل والخدمة، أو بحسب ما تقتضيه المتطلبات التنظيمية
                    والتشغيلية، ثم يتم حذفها أو تقليلها عند عدم الحاجة.
                  </p>

                  <h2>8. حقوق المستخدم</h2>
                  <p>
                    يمكنك طلب الوصول إلى بياناتك أو تصحيحها أو طلب حذفها متى كان ذلك ممكنًا، عبر التواصل معنا على:
                    <a href={`mailto:${brand.email}`}> {brand.email}</a>.
                  </p>

                  <h2>9. التواصل بخصوص الخصوصية</h2>
                  <p>
                    للاستفسارات المتعلقة بالخصوصية أو البيانات، يرجى التواصل عبر البريد الرسمي:
                    <a href={`mailto:${brand.email}`}> {brand.email}</a>.
                  </p>

                  <h2>10. التحديثات على السياسة</h2>
                  <p>
                    قد نقوم بتحديث هذه السياسة عند الحاجة. يُعتمد تاريخ &quot;آخر تحديث&quot; الموضح في أعلى الصفحة كمرجع
                    لنسخة السياسة الحالية.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    This policy explains how ALaram collects, uses, and protects data through the website and
                    related online services. This is a general policy for operating the website and delivering
                    electronic services in Saudi Arabia.
                  </p>

                  <h2>1. Who We Are</h2>
                  <p>
                    ALaram is a business solutions platform that provides online services for multiple industries
                    in Saudi Arabia, with a focus on ease of use, fast performance, and accurate reporting.
                  </p>

                  <h2>2. Data We Collect</h2>
                  <p>We may collect the following data when you use the site or submit forms:</p>
                  <ul>
                    <li>Name</li>
                    <li>Phone number</li>
                    <li>Email address</li>
                    <li>Business name</li>
                    <li>Messages and inquiry details submitted through forms</li>
                  </ul>

                  <h2>3. Usage Data, Analytics, and Cookies</h2>
                  <p>
                    We may collect technical information such as browser type, device type, visited pages, visit
                    time, and performance indicators. Cookies may also be used to improve user experience and
                    analyze performance.
                  </p>

                  <h2>4. Why We Use Data</h2>
                  <ul>
                    <li>Responding to inquiries and contact requests</li>
                    <li>Providing and improving our online services</li>
                    <li>Analyzing website performance and user experience</li>
                    <li>Protecting the website and monitoring abuse or technical issues</li>
                  </ul>

                  <h2>5. Data Sharing</h2>
                  <p>
                    We do not sell personal data. We may share limited data with trusted service providers
                    (such as hosting, analytics, or communication tools) only when required to operate the
                    website and services.
                  </p>

                  <h2>6. Data Protection</h2>
                  <p>
                    We apply reasonable technical and organizational safeguards to protect data from unauthorized
                    access, alteration, or loss. However, no internet transmission can be guaranteed to be 100% secure.
                  </p>

                  <h2>7. Data Retention</h2>
                  <p>
                    We retain data for as long as needed to fulfill operational and service purposes, or to meet
                    applicable operational and regulatory requirements. Data is deleted or minimized when no longer needed.
                  </p>

                  <h2>8. Your Rights</h2>
                  <p>
                    You may request access, correction, or deletion of your data where applicable by contacting us at:
                    <a href={`mailto:${brand.email}`}> {brand.email}</a>.
                  </p>

                  <h2>9. Contact for Privacy Requests</h2>
                  <p>
                    For any privacy or data request, contact us via:
                    <a href={`mailto:${brand.email}`}> {brand.email}</a>.
                  </p>

                  <h2>10. Policy Updates</h2>
                  <p>
                    We may update this policy when needed. The &quot;Last Updated&quot; date at the top of this page indicates
                    the effective version.
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

