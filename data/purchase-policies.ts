type Copy = { ar: string; en: string };

export type PurchasePolicy = {
  title: Copy;
  description: Copy;
  sections: { id: string; title: Copy; paragraphs: Copy[] }[];
};

export const policyUpdatedAt = "2026-09-27";

export const refundPolicy: PurchasePolicy = {
  title: { ar: "سياسة الاستبدال والاسترجاع", en: "Exchange & Refund Policy" },
  description: {
    ar: "شروط إلغاء الاشتراكات واستبدال الباقات واسترداد المدفوعات للبرامج والخدمات الرقمية لدى الأرام.",
    en: "Cancellation, plan exchanges, and refunds for ALaram software and digital services.",
  },
  sections: [
    {
      id: "scope",
      title: { ar: "نطاق السياسة", en: "What this policy covers" },
      paragraphs: [
        {
          ar: "تسري هذه السياسة على المشتريات من الأرام: اشتراكات حلول الأعمال ومُقدّر التكلفة، وتطبيق ALaramLMS وخدمات إعداده، وحزم أرصدة سَمْت. جميعها منتجات وخدمات رقمية، ولا تتطلب إرجاع شحنة مادية. تحافظ هذه السياسة على حقوق المستهلك المقررة في الأنظمة السعودية.",
          en: "This policy covers purchases from ALaram: business software and Cost Estimator subscriptions, ALaramLMS software and setup services, and Samt credit packs. These are digital products and services, so no physical shipment needs to be returned. Your rights under applicable Saudi law are preserved.",
        },
      ],
    },
    {
      id: "eligibility",
      title: { ar: "متى يمكنك طلب الاسترجاع؟", en: "When you can request a refund" },
      paragraphs: [
        {
          ar: "يمكنك طلب فسخ العقد خلال الأيام السبعة التالية لتسلّم المنتج أو التعاقد على تقديم الخدمة، ما دمت لم تستخدم المنتج أو تستفد من الخدمة، مع مراعاة الاستثناءات النظامية. يشمل ذلك الاشتراكات وحزم الأرصدة التي لم تُستخدم متى انطبقت عليها شروط الاسترجاع.",
          en: "You may request cancellation within seven days after receiving a product or contracting for a service, provided you have not used or benefited from it, subject to statutory exceptions. This includes unused subscriptions and credit packs where refund conditions apply.",
        },
        {
          ar: "عند وجود مبلغ مخصوم بالخطأ أو عملية دفع مكررة، نتحقق من العملية ونرد المبلغ غير المستحق. وعند وجود عيب أو عدم مطابقة للوصف المتفق عليه، يمكنك طلب المعالجة أو الاستبدال أو الاسترداد وفق الحالة وحقوقك النظامية، ولا تسقط هذه الحقوق لمجرد بدء الاستخدام.",
          en: "If you were charged incorrectly or more than once for the same purchase, we verify the transaction and refund the amount not due. For defects or a failure to match the agreed description, you may request a remedy, replacement, or refund as applicable. Starting to use the service does not, by itself, remove these rights.",
        },
      ],
    },
    {
      id: "digital-services",
      title: { ar: "البرامج والأعمال المخصصة والأرصدة", en: "Software, custom work, and credits" },
      paragraphs: [
        {
          ar: "تُراعى الاستثناءات النظامية للبرامج المستخدمة أو المحمّلة عبر الإنترنت والمنتجات المنفذة حسب مواصفات العميل، مع بقاء حقوق العيب وعدم المطابقة. يُحدد نطاق الإعداد والتخصيص ومراحله قبل بدء العمل، ويُراجع طلب الإلغاء بحسب ما تم تنفيذه فعليًا والشروط المتفق عليها.",
          en: "Statutory exceptions for used or downloaded software and products made to a customer's specifications apply, while rights relating to defects and non-conformity remain. Setup and customization scope and milestones are agreed before work starts; cancellation is reviewed against work actually completed and the agreed terms.",
        },
        {
          ar: "الأرصدة التي استُهلكت في خدمة نُفذت بصورة صحيحة لا تُعامل كرصيد غير مستخدم. إذا خُصم رصيد ولم تُقدّم الخدمة بسبب خلل، نتولى التحقق وتصحيح الرصيد أو رد المقابل المستحق بحسب الحالة. ولا يُعد مجرد إضافة الأرصدة إلى الحساب استهلاكًا لها.",
          en: "Credits spent on a correctly delivered service are not treated as unused credits. If credits were deducted without the service being delivered because of a fault, we investigate and restore the credits or refund the applicable amount. Adding credits to an account does not itself count as consuming them.",
        },
      ],
    },
    {
      id: "exchange",
      title: { ar: "استبدال الباقة وإلغاء التجديد", en: "Changing plans and cancelling renewal" },
      paragraphs: [
        {
          ar: "يمكنك طلب تغيير الباقة عبر وسائل التواصل أدناه. نوضح لك فرق السعر وموعد سريان التغيير قبل موافقتك عليه. يمكنك طلب إيقاف التجديد في أي وقت دون رسوم إلغاء؛ ويستمر الانتفاع بالمدة المدفوعة حتى نهايتها ما لم يُعتمد استرداد يستلزم إنهاء الخدمة. إيقاف التجديد لا يعني تلقائيًا استرداد مدة سبق استخدامها، ولا يحد من حالات الاسترجاع المستحقة.",
          en: "Contact us to request a plan change. We explain any price difference and the effective date before you agree. You can request cancellation of renewal at any time without a cancellation fee; access continues until the paid term ends unless an approved refund requires access to end. Stopping renewal does not automatically refund time already used or limit valid refund rights.",
        },
      ],
    },
    {
      id: "request",
      title: { ar: "طريقة تقديم الطلب", en: "How to submit a request" },
      paragraphs: [
        {
          ar: "أرسل طلبك إلى البريد الإلكتروني أو واتساب الموضحين أدناه، متضمنًا اسمك، والبريد المرتبط بالطلب، واسم المنتج أو الباقة، ورقم الطلب أو مرجع عملية الدفع، وتاريخها، وسبب الطلب. أرفق وصفًا للخلل إن وجد. لا ترسل رقم البطاقة كاملًا أو رمز الأمان أو رمز التحقق.",
          en: "Send your request using the email or WhatsApp below. Include your name, the email associated with your order, the product or plan, the order or payment reference, the date, and the reason. Describe any fault. Do not send a full card number, security code, or one-time verification code.",
        },
      ],
    },
    {
      id: "processing",
      title: { ar: "المراجعة وإعادة المبلغ", en: "Review and refund processing" },
      paragraphs: [
        {
          ar: "نراجع الطلب ونبلغك بنتيجته أو بالبيانات الناقصة خلال 3 أيام عمل من استلامه. بعد الموافقة، ننفذ الاسترداد خلال 7 أيام عمل إلى وسيلة الدفع الأصلية متى أمكن، ونرسل لك تأكيدًا. قد يستغرق ظهور المبلغ في حسابك مدة إضافية بحسب البنك أو مزود الدفع، وسنساعدك في المتابعة باستخدام مرجع الاسترداد.",
          en: "We review your request and send a decision or ask for missing information within three business days of receipt. Once approved, we initiate the refund within seven business days, to the original payment method where possible, and send confirmation. Your bank or payment provider may take additional time to post it; we can help you follow up using the refund reference.",
        },
        {
          ar: "نوضح مبلغ الاسترداد وأي تسوية مرتبطة بالطلب قبل تنفيذها. لا نفرض رسومًا على تصحيح المدفوعات المكررة أو المبالغ المحصلة بالخطأ. وللاستفسار عن طلب قائم، تواصل معنا مع ذكر مرجع الطلب.",
          en: "We explain the refund amount and any adjustment before processing. We do not charge a fee to correct duplicate or incorrect charges. For updates on an existing request, contact us with its reference.",
        },
      ],
    },
  ],
};

export const deliveryPolicy: PurchasePolicy = {
  title: { ar: "سياسة التسليم والتفعيل", en: "Delivery & Activation Policy" },
  description: {
    ar: "كيف تستلم برامج الأرام واشتراكاتها وأرصدتها الرقمية، وما الذي يحدث بعد تأكيد الطلب والدفع.",
    en: "How ALaram software, subscriptions, and digital credits are delivered after order and payment confirmation.",
  },
  sections: [
    {
      id: "digital-delivery",
      title: { ar: "خدمات رقمية دون شحن", en: "Digital delivery without shipping" },
      paragraphs: [
        {
          ar: "تقدم الأرام برامج وخدمات إلكترونية داخل السعودية. يكون التسليم عبر الحساب أو البريد الإلكتروني المرتبط بالطلب، أو بإرسال رابط الوصول وتعليمات التشغيل. لا توجد شحنات مادية أو رسوم شحن لهذه المنتجات.",
          en: "ALaram provides software and online services in Saudi Arabia. Delivery is through the account or email associated with your order, or via an access link and setup instructions. These products have no physical shipments or shipping fees.",
        },
      ],
    },
    {
      id: "before-payment",
      title: { ar: "تأكيد الطلب قبل السداد", en: "Confirming your order before payment" },
      paragraphs: [
        {
          ar: "راجع وصف الباقة وسعرها ومدة الاشتراك أو طبيعة الشراء لمرة واحدة. للطلبات التي تُنسق عبر فريقنا، نؤكد نطاق العمل والإجمالي النهائي وأي ضريبة أو خدمات إضافية وموعد التسليم قبل إرسال رابط الدفع. أي تكاليف لخدمات طرف ثالث تُوضح قبل الموافقة عليها.",
          en: "Review the package description, price, subscription term, or one-time purchase details. For orders arranged with our team, we confirm the scope, final total, any tax or additional services, and delivery date before sending a payment link. Any third-party costs are disclosed before you agree to them.",
        },
      ],
    },
    {
      id: "activation",
      title: { ar: "ما الذي تستلمه؟", en: "What you receive" },
      paragraphs: [
        {
          ar: "الاشتراكات: تفعيل الوصول إلى الباقة المطلوبة وتوضيح بداية الاشتراك ونهايته. ALaramLMS: تسليم نسخة التطبيق في باقة شراء التطبيق، أو إعداد المشروع وتشغيله وفق النطاق المتفق عليه في باقة التشغيل الكامل. سَمْت: إضافة أرصدة الحزمة المشتراة إلى الحساب المرتبط بالعملية بعد تأكيد الدفع.",
          en: "Subscriptions: access to the selected plan with its start and end dates. ALaramLMS: an application copy for the application package, or project setup and launch within the agreed scope for the full-setup package. Samt: the purchased credit pack is added to the account associated with the transaction after payment confirmation.",
        },
      ],
    },
    {
      id: "timing",
      title: { ar: "موعد التسليم ومتطلبات الإعداد", en: "Delivery dates and setup requirements" },
      paragraphs: [
        {
          ar: "يُحدد موعد التفعيل أو التسليم في تأكيد الطلب قبل السداد وفق نوع الباقة ومتطلبات الإعداد. قد تتطلب خدمات التشغيل بيانات النطاق وحسابات الخدمات المرتبطة؛ نوضح هذه المتطلبات وموعد توفيرها مسبقًا، ونبلغك بأي تأخير وموعد التنفيذ المتوقع.",
          en: "The activation or delivery date is stated in your order confirmation before payment, according to the package and setup requirements. Launch services may require domain details and accounts for connected services; we explain what is needed and when, and notify you of any delay and the expected completion date.",
        },
        {
          ar: "عند تأخر التسليم أو تعذر التفعيل، تواصل معنا بمرجع الطلب للتحقق أو طلب الإلغاء والاسترداد المستحق. تُطبق حقوق التأخر في التسليم المنصوص عليها في نظام التجارة الإلكترونية، ولا تلغي المواعيد التشغيلية الواردة هنا تلك الحقوق.",
          en: "If delivery is late or activation fails, contact us with your order reference for investigation or to request cancellation and any refund due. Delivery-delay rights under Saudi e-commerce law apply; the operational arrangements here do not remove those rights.",
        },
      ],
    },
    {
      id: "support",
      title: { ar: "إذا لم يصلك التفعيل", en: "If activation has not arrived" },
      paragraphs: [
        {
          ar: "تحقق من بريدك ومجلد الرسائل غير المرغوب فيها والحساب المستخدم للشراء، ثم تواصل معنا برقم الطلب أو مرجع الدفع. إذا خُصم المبلغ ولم تظهر الخدمة أو الأرصدة، أبلغنا للتحقق قبل إعادة الدفع تفاديًا لتكرار العملية.",
          en: "Check your inbox, spam folder, and the account used for the purchase, then contact us with your order or payment reference. If you were charged but access or credits are missing, let us investigate before paying again to avoid a duplicate payment.",
        },
      ],
    },
  ],
};
