import * as React from "react";
import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

type DemoConfirmationEmailProps = {
  locale?: "ar" | "en";
  name: string;
  email: string;
  phone: string;
  company: string;
  industry: string;
  employeeCount?: string;
  preferredDate?: string;
  preferredTime?: string;
  currentSolution?: string;
  message?: string;
};

export default function DemoConfirmationEmail({
  locale = "ar",
  name,
  email,
  phone,
  company,
  industry,
  employeeCount,
  preferredDate,
  preferredTime,
  currentSolution,
  message,
}: DemoConfirmationEmailProps) {
  const isRTL = locale === "ar";

  const t = {
    preview: isRTL
      ? "تم استلام طلب العرض التوضيحي الخاص بك"
      : "Your demo request has been received",
    title: isRTL ? "طلب عرض توضيحي" : "Demo Request",
    subtitle: isRTL ? "تأكيد" : "Confirmation",
    intro: isRTL
      ? "شكرًا لك، لقد تم استلام طلب حجز العرض التوضيحي بنجاح. سيقوم فريقنا بمراجعة البيانات والتواصل معك قريبًا لتأكيد الموعد."
      : "Thank you. Your demo booking request has been received successfully. Our team will review your information and contact you soon to confirm the appointment.",
    formDetails: isRTL ? "تفاصيل الطلب" : "Request Details",
    fullName: isRTL ? "الاسم الكامل" : "FULL NAME",
    emailLabel: isRTL ? "البريد الإلكتروني" : "EMAIL",
    phoneLabel: isRTL ? "رقم الجوال" : "PHONE",
    companyLabel: isRTL ? "الشركة" : "COMPANY",
    industryLabel: isRTL ? "القطاع" : "INDUSTRY",
    detailsLabel: isRTL ? "معلومات إضافية" : "ADDITIONAL DETAILS",
    employeeCount: isRTL ? "عدد الموظفين" : "EMPLOYEE COUNT",
    preferredDate: isRTL ? "التاريخ المفضل" : "PREFERRED DATE",
    preferredTime: isRTL ? "الوقت المفضل" : "PREFERRED TIME",
    currentSolution: isRTL ? "النظام الحالي" : "CURRENT SOLUTION",
    notes: isRTL ? "الرسالة" : "Message",
    noMessage: isRTL ? "لا توجد ملاحظات إضافية." : "No additional notes.",
    status: isRTL ? "الحالة" : "STATUS",
    received: isRTL ? "تم الاستلام" : "Received",
    nextStepTitle: isRTL
      ? "سنتواصل معك قريبًا لتأكيد الموعد."
      : "We’ll contact you soon to confirm the appointment.",
    nextStepBody: isRTL
      ? "تم إرسال هذه الرسالة تلقائيًا بعد استلام نموذج طلب العرض التوضيحي."
      : "This email was sent automatically after receiving the demo request form.",
    contactHelp: isRTL
      ? "للاستفسارات يمكنك التواصل معنا عبر البريد الإلكتروني."
      : "For questions, you can contact us by email.",
    website: isRTL ? "زيارة الموقع" : "Visit website",
    support: isRTL ? "الدعم" : "Support",
    privacy: isRTL ? "سياسة الخصوصية" : "Privacy Policy",
    copyright: isRTL
      ? "جميع الحقوق محفوظة"
      : "All rights reserved",
  };

  const textAlign = isRTL ? "right" : "left";
  const dir = isRTL ? "rtl" : "ltr";

  return (
    <Html lang={locale} dir={dir}>
      <Head />
      <Preview>{t.preview}</Preview>

      <Tailwind>
        <Body className="bg-white font-sans">
          <Container className="mx-auto w-[660px] max-w-full px-0 pt-5 pb-12">
            {/* Header */}
            <Section dir={dir}>
              <Row>
                <Column>
                  <Text
                    className="m-0 text-[20px] font-semibold leading-6 text-[#111111]"
                    style={{ textAlign }}
                  >
                    {t.title}
                  </Text>
                </Column>

                <Column align={isRTL ? "left" : "right"} className="table-cell">
                  <Text
                    className="my-4 text-[32px] font-light leading-6 text-[#888888]"
                    style={{ textAlign: isRTL ? "left" : "right" }}
                  >
                    {t.subtitle}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Intro */}
            <Section dir={dir}>
              <Text
                className="m-0 mt-9 mb-10 text-[14px] leading-[24px] font-medium text-[#111111]"
                style={{ textAlign }}
              >
                {t.intro}
              </Text>
            </Section>

            {/* Main Info Grid */}
            <Section
              dir={dir}
              className="rounded-[3px] bg-[rgb(250,250,250)] text-[12px] text-[rgb(51,51,51)] border-collapse border-spacing-0"
            >
              <Row className="min-h-[46px]">
                <Column colSpan={2}>
                  <Section>
                    <Row>
                      <Column className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3">
                        <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                          {t.fullName}
                        </Text>
                        <Text className="m-0 p-0 text-[12px] leading-[1.6] text-[#111111]">
                          {name}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3">
                        <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                          {t.emailLabel}
                        </Text>
                        <Link
                          href={`mailto:${email}`}
                          className="m-0 p-0 text-[12px] leading-[1.6] text-[#15c] underline"
                        >
                          {email}
                        </Link>
                      </Column>
                    </Row>

                    <Row>
                      <Column className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3">
                        <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                          {t.phoneLabel}
                        </Text>
                        <Text className="m-0 p-0 text-[12px] leading-[1.6] text-[#111111]">
                          {phone}
                        </Text>
                      </Column>
                    </Row>

                    <Row>
                      <Column className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3">
                        <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                          {t.companyLabel}
                        </Text>
                        <Text className="m-0 p-0 text-[12px] leading-[1.6] text-[#111111]">
                          {company}
                        </Text>
                      </Column>

                      <Column className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3">
                        <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                          {t.industryLabel}
                        </Text>
                        <Text className="m-0 p-0 text-[12px] leading-[1.6] text-[#111111]">
                          {industry}
                        </Text>
                      </Column>
                    </Row>
                  </Section>
                </Column>

                <Column
                  className="min-h-[44px] border-0 border-b border-white border-solid px-5 py-3 align-top"
                  colSpan={2}
                >
                  <Text className="m-0 p-0 text-[10px] leading-[1.4] text-[rgb(102,102,102)]">
                    {t.detailsLabel}
                  </Text>

                  <Text className="m-0 p-0 text-[12px] leading-[1.7] text-[#111111]">
                    {t.employeeCount}: {employeeCount || "-"}
                  </Text>
                  <Text className="m-0 p-0 text-[12px] leading-[1.7] text-[#111111]">
                    {t.preferredDate}: {preferredDate || "-"}
                  </Text>
                  <Text className="m-0 p-0 text-[12px] leading-[1.7] text-[#111111]">
                    {t.preferredTime}: {preferredTime || "-"}
                  </Text>
                  <Text className="m-0 p-0 text-[12px] leading-[1.7] text-[#111111]">
                    {t.currentSolution}: {currentSolution || "-"}
                  </Text>
                </Column>
              </Row>
            </Section>

            {/* Notes Title */}
            <Section
              dir={dir}
              className="mt-[30px] mb-[15px] min-h-[24px] rounded-[3px] bg-[rgb(250,250,250)] text-[12px] text-[rgb(51,51,51)] border-collapse border-spacing-0"
            >
              <Text className="m-0 bg-[#fafafa] px-[10px] text-sm leading-[24px] font-medium">
                {t.notes}
              </Text>
            </Section>

            {/* Notes Content */}
            <Section dir={dir}>
              <Text
                className="m-0 text-[12px] leading-[24px] text-[rgb(51,51,51)]"
                style={{ textAlign }}
              >
                {message && message.trim() ? message : t.noMessage}
              </Text>
            </Section>

            <Hr className="mt-[30px] mb-0" />

            {/* Status Summary */}
            <Section align={isRTL ? "left" : "right"} dir={dir}>
              <Row>
                <Column className="table-cell" align={isRTL ? "left" : "right"}>
                  <Text
                    className="m-0 p-0 text-[10px] font-semibold text-[rgb(102,102,102)]"
                    style={{
                      paddingLeft: isRTL ? 30 : 0,
                      paddingRight: isRTL ? 0 : 30,
                      textAlign: isRTL ? "left" : "right",
                    }}
                  >
                    {t.status}
                  </Text>
                </Column>

                <Column className="min-h-12 pt-12 [border-left:1px_solid_rgb(238,238,238)]" />

                <Column className="table-cell w-[120px]">
                  <Text
                    className="m-0 text-base font-semibold whitespace-nowrap"
                    style={{
                      marginLeft: isRTL ? 20 : 0,
                      marginRight: isRTL ? 0 : 20,
                      textAlign: isRTL ? "left" : "right",
                    }}
                  >
                    {t.received}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Hr className="mb-[55px]" />

            {/* Next Step */}
            <Section dir={dir}>
              <Row>
                <Column align="center" className="block mt-[15px]">
                  <Text className="text-[24px] leading-none font-medium text-[#111111]">
                    {t.nextStepTitle}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section dir={dir}>
              <Row>
                <Column align="center" className="table-cell mt-[10px]">
                  <Link
                    href={process.env.NEXT_PUBLIC_APP_URL || "#"}
                    className="text-[rgb(0,126,255)] no-underline text-[14px]"
                  >
                    {t.website}
                  </Link>
                </Column>
              </Row>
            </Section>

            <Hr className="my-[65px] mb-5" />

            {/* Footer */}
            <Text
              className="m-0 mb-4 text-[12px] leading-[normal] text-[rgb(102,102,102)]"
              style={{ textAlign }}
            >
              {t.nextStepBody}
            </Text>

            <Text
              className="my-5 text-[12px] leading-[normal] text-[rgb(102,102,102)]"
              style={{ textAlign: "center" }}
            >
              {t.contactHelp}{" "}
              <Link
                href="mailto:wzw808@gmail.com"
                className="text-[rgb(0,115,255)]"
              >
                wzw808@gmail.com
              </Link>
            </Text>

            <Text className="m-0 mt-2 text-center text-[12px] leading-[24px] text-[rgb(102,102,102)]">
              <Link href={process.env.NEXT_PUBLIC_APP_URL || "#"}>
                {t.website}
              </Link>{" "}
              •{" "}
              <Link href="mailto:wzw808@gmail.com">
                {t.support}
              </Link>{" "}
              •{" "}
              <Link href={process.env.NEXT_PUBLIC_APP_URL || "#"}>
                {t.privacy}
              </Link>
            </Text>

            <Text className="m-0 mt-[25px] text-center text-[12px] leading-[24px] text-[rgb(102,102,102)]">
              Copyright © 2026 Your Company
              <br />
              {t.copyright}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}