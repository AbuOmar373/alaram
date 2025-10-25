import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">
            {locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>

          <Card>
            <CardHeader>
              <CardTitle>
                {locale === "ar" ? "آخر تحديث: يناير 2024" : "Last Updated: January 2024"}
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>
                {locale === "ar"
                  ? "هذه الصفحة هي نموذج توضيحي. في التطبيق الفعلي، يجب أن تحتوي على سياسة الخصوصية الكاملة والقانونية."
                  : "This is a placeholder page. In the actual application, it should contain a complete and legal privacy policy."}
              </p>

              <h2>{locale === "ar" ? "١. جمع المعلومات" : "1. Information Collection"}</h2>
              <p>
                {locale === "ar"
                  ? "نقوم بجمع المعلومات التي تقدمها لنا مباشرة عند استخدام خدماتنا، بما في ذلك الاسم والبريد الإلكتروني ورقم الهاتف."
                  : "We collect information you provide directly to us when using our services, including name, email, and phone number."}
              </p>

              <h2>{locale === "ar" ? "٢. استخدام المعلومات" : "2. Use of Information"}</h2>
              <p>
                {locale === "ar"
                  ? "نستخدم المعلومات التي نجمعها لتقديم وتحسين خدماتنا، والتواصل معك، وتخصيص تجربتك."
                  : "We use the information we collect to provide and improve our services, communicate with you, and personalize your experience."}
              </p>

              <h2>{locale === "ar" ? "٣. مشاركة المعلومات" : "3. Information Sharing"}</h2>
              <p>
                {locale === "ar"
                  ? "لن نشارك معلوماتك الشخصية مع أطراف ثالثة إلا في الحالات الموضحة في هذه السياسة أو بموافقتك."
                  : "We will not share your personal information with third parties except in cases outlined in this policy or with your consent."}
              </p>

              <h2>{locale === "ar" ? "٤. أمن المعلومات" : "4. Information Security"}</h2>
              <p>
                {locale === "ar"
                  ? "نتخذ تدابير أمنية معقولة لحماية معلوماتك من الوصول غير المصرح به أو الكشف أو التغيير."
                  : "We take reasonable security measures to protect your information from unauthorized access, disclosure, or alteration."}
              </p>

              <h2>{locale === "ar" ? "٥. حقوقك" : "5. Your Rights"}</h2>
              <p>
                {locale === "ar"
                  ? "لديك الحق في الوصول إلى معلوماتك الشخصية وتصحيحها وحذفها. يمكنك الاتصال بنا لممارسة هذه الحقوق."
                  : "You have the right to access, correct, and delete your personal information. You can contact us to exercise these rights."}
              </p>

              <h2>{locale === "ar" ? "٦. ملفات تعريف الارتباط" : "6. Cookies"}</h2>
              <p>
                {locale === "ar"
                  ? "نستخدم ملفات تعريف الارتباط وتقنيات مشابهة لتحسين تجربتك وتحليل استخدام الموقع."
                  : "We use cookies and similar technologies to improve your experience and analyze site usage."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

