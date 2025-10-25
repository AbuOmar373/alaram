import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold">
            {locale === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
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
                  ? "هذه الصفحة هي نموذج توضيحي. في التطبيق الفعلي، يجب أن تحتوي على الشروط والأحكام الكاملة والقانونية للخدمة."
                  : "This is a placeholder page. In the actual application, it should contain complete and legal terms and conditions of service."}
              </p>

              <h2>{locale === "ar" ? "١. القبول بالشروط" : "1. Acceptance of Terms"}</h2>
              <p>
                {locale === "ar"
                  ? "باستخدام خدمات الأرام، فإنك توافق على الالتزام بهذه الشروط والأحكام."
                  : "By using ALaram services, you agree to be bound by these terms and conditions."}
              </p>

              <h2>{locale === "ar" ? "٢. استخدام الخدمة" : "2. Use of Service"}</h2>
              <p>
                {locale === "ar"
                  ? "يجب عليك استخدام الخدمة بطريقة قانونية ومسؤولة وفقاً لجميع القوانين واللوائح المعمول بها."
                  : "You must use the service in a legal and responsible manner in accordance with all applicable laws and regulations."}
              </p>

              <h2>{locale === "ar" ? "٣. الملكية الفكرية" : "3. Intellectual Property"}</h2>
              <p>
                {locale === "ar"
                  ? "جميع حقوق الملكية الفكرية للبرنامج والمحتوى محفوظة لشركة الأرام."
                  : "All intellectual property rights to the software and content are reserved to ALaram Company."}
              </p>

              <h2>{locale === "ar" ? "٤. المسؤولية" : "4. Liability"}</h2>
              <p>
                {locale === "ar"
                  ? "الشركة غير مسؤولة عن أي أضرار مباشرة أو غير مباشرة قد تنتج عن استخدام الخدمة."
                  : "The Company is not liable for any direct or indirect damages that may result from using the service."}
              </p>

              <h2>{locale === "ar" ? "٥. التعديلات" : "5. Modifications"}</h2>
              <p>
                {locale === "ar"
                  ? "تحتفظ الأرام بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية."
                  : "ALaram reserves the right to modify these terms at any time. You will be notified of any material changes."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

