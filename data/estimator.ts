export type LocaleCopy = {
  ar: string;
  en: string;
};

export const estimator = {
  slug: "estimator",
  name: {
    ar: "مُقدّر التكلفة",
    en: "Cost Estimator",
  },
  productLine: "ALaram Estimator",
  tagline: {
    ar: "من التقدير إلى العرض ثم الفاتورة، مع المخزون والمحاسبة في مساحة عمل واحدة",
    en: "From estimate to proposal to invoice, with inventory and accounting in one workspace",
  },
  summary: {
    ar: "مُقدّر التكلفة تطبيق ويب عربي لتقدير تكاليف المشاريع وإعداد عروض الأسعار بالعربية والإنجليزية، يجمع العملاء والموردين ودليل البنود والمشتريات والمبيعات والمستودعات والمحاسبة بالقيد المزدوج.",
    en: "Cost Estimator is an Arabic-first web app for costing projects and preparing Arabic and English proposals. It brings clients, suppliers, an item catalog, purchasing, sales, warehouses, and double-entry accounting together.",
  },
  hero: {
    eyebrow: {
      ar: "تقدير المشاريع وعروض الأسعار",
      en: "Project estimates and proposals",
    },
    headline: {
      ar: "سعّر مشروعك بثقة، واعرف هامشك قبل أن ترسل العرض",
      en: "Price every project with confidence and know your margin before you send",
    },
    subheadline: {
      ar: "أدخل البنود والكميات والتكلفة وسعر البيع، ودع التطبيق يحسب التكلفة الكاملة والضريبة والربح والهامش. ثم صدّر العرض PDF أو Word وشاركه مع العميل برابط، وتابعه حتى يصبح فاتورة.",
      en: "Enter items, quantities, cost, and selling price, and let the app work out full cost, VAT, profit, and margin. Then export the proposal as PDF or Word, share it with a link, and follow it through to an invoice.",
    },
    primaryCta: {
      ar: "احجز عرضاً توضيحياً",
      en: "Book a demo",
    },
    secondaryCta: {
      ar: "شاهد الأسعار",
      en: "See pricing",
    },
    priceTeaser: {
      ar: "من 99 ريالاً شهرياً بالاشتراك السنوي",
      en: "From SAR 99/month billed annually",
    },
    trustItems: [
      { ar: "عروض عربية وإنجليزية", en: "Arabic and English proposals" },
      { ar: "مخزون ومحاسبة بالقيد المزدوج", en: "Inventory and double-entry accounting" },
      { ar: "PDF وWord ورابط مشاركة", en: "PDF, Word, and share links" },
    ],
  },
  highlights: [
    {
      title: { ar: "دورة مستند متصلة", en: "One connected document cycle" },
      description: {
        ar: "العرض يبدأ مبدئياً، ثم يُراجع بعد التنفيذ، ثم يصدر فاتورة برقم ثابت ونسخة مجمدة لا تتغير لاحقاً.",
        en: "A proposal starts as preliminary, is reviewed after execution, then becomes an invoice with a fixed number and a frozen copy.",
      },
    },
    {
      title: { ar: "تكلفة كاملة لا تقديرية", en: "Full cost, not a guess" },
      description: {
        ar: "التكلفة الأساسية مع مكونات عامة ومكونات خاصة بالبند، أو متوسط آخر خمس فواتير شراء مؤكدة.",
        en: "Base cost plus general and item-level components, or a weighted average of the last five confirmed purchases.",
      },
    },
    {
      title: { ar: "العمليات والحسابات معاً", en: "Operations and books together" },
      description: {
        ar: "تأكيد البيع أو الشراء يحرّك المخزون ويرحّل القيود تلقائياً، مع دفتر أستاذ وميزان مراجعة.",
        en: "Confirming a sale or purchase moves stock and posts journal entries automatically, with a ledger and trial balance.",
      },
    },
  ],
  problem: {
    eyebrow: { ar: "المشكلة", en: "The problem" },
    title: {
      ar: "التسعير في جداول متفرقة يُخفي الربح الحقيقي",
      en: "Pricing in scattered spreadsheets hides your real profit",
    },
    intro: {
      ar: "كثير من فرق المقاولات والخدمات تسعّر في Excel، وتكتب العرض في Word، وتتابع المخزون والحسابات في مكان ثالث. النتيجة أرقام غير متطابقة، وهامش لا يُعرف إلا بعد فوات الأوان.",
      en: "Many contracting and service teams price in Excel, write proposals in Word, and track stock and books somewhere else. The numbers drift apart and the margin shows up too late.",
    },
    items: [
      { ar: "تكاليف إضافية تُنسى عند التسعير", en: "Overheads forgotten at pricing time" },
      { ar: "عروض بصيغ ونسخ مختلفة لكل عميل", en: "Different proposal formats and versions per client" },
      { ar: "صعوبة معرفة الهامش قبل الإرسال", en: "No clear margin before you send" },
      { ar: "فصل بين العرض والمخزون والمحاسبة", en: "Proposals, stock, and books kept apart" },
    ],
  },
  lifecycle: {
    title: { ar: "رحلة العرض من الفكرة إلى الفاتورة", en: "A proposal's path from idea to invoice" },
    subtitle: {
      ar: "كل مرحلة تحفظ نسخة من سابقتها، ويتحقق الخادم من المرحلة والبنود قبل كل انتقال.",
      en: "Each stage keeps a copy of the one before it, and the server checks the stage and items before every move.",
    },
    stages: [
      {
        code: "preliminary",
        name: { ar: "عرض سعر مبدئي", en: "Preliminary quote" },
        desc: {
          ar: "إعداد البنود والكميات ومتابعة صلاحية العرض.",
          en: "Build items and quantities and track validity.",
        },
      },
      {
        code: "executed",
        name: { ar: "عرض بعد التنفيذ", en: "Post-execution quote" },
        desc: {
          ar: "مراجعة البنود الفعلية مع حفظ النسخة المبدئية.",
          en: "Review actual items while the preliminary copy is kept.",
        },
      },
      {
        code: "invoice",
        name: { ar: "فاتورة محفوظة", en: "Saved invoice" },
        desc: {
          ar: "رقم مثل INV-0001 ونسخة ثابتة مقفلة عن التعديل.",
          en: "A number like INV-0001 and a locked, frozen copy.",
        },
      },
    ],
    note: {
      ar: "يمكن إلغاء العرض قبل الفاتورة مع ذكر السبب، ثم إعادة فتحه في مرحلته. العروض المبدئية المنتهية تُلغى تلقائياً، وإعادة فتحها تجدد تاريخها.",
      en: "A quote can be cancelled with a reason before it becomes an invoice, then reopened at its stage. Expired preliminary quotes are cancelled automatically, and reopening renews their date.",
    },
  },
  costing: {
    title: { ar: "تكلفة الوحدة الكاملة، محسوبة على الخادم", en: "Full unit cost, calculated on the server" },
    subtitle: {
      ar: "التكلفة الأساسية + المكونات العامة المفعلة + المكونات الخاصة بالبند. النسب كلها تُحسب من الأساس نفسه ولا تتراكم.",
      en: "Base cost + enabled general components + item-specific components. Percentages all apply to the same base and never compound.",
    },
    rules: [
      { ar: "المكوّن مبلغ ثابت أو نسبة من التكلفة الأساسية", en: "A component is a fixed amount or a percentage of base cost" },
      { ar: "تطبيق المكوّن العام على المنتجات أو الخدمات أو كليهما", en: "Apply general components to products, services, or both" },
      { ar: "تعطيل مكوّن عام أو تخصيص قيمته لكل بند", en: "Disable or override a general component per item" },
      { ar: "دقة أربع منازل عشرية لتكلفة الوحدة", en: "Four decimal places for unit cost" },
    ],
    example: {
      title: { ar: "مثال", en: "Example" },
      lines: [
        { label: { ar: "التكلفة الأساسية", en: "Base cost" }, value: "100" },
        { label: { ar: "نقل 10%", en: "Freight 10%" }, value: "+10" },
        { label: { ar: "مكوّن ثابت", en: "Fixed component" }, value: "+5" },
      ],
      total: { label: { ar: "التكلفة الكاملة", en: "Full cost" }, value: "115" },
    },
  },
  calc: {
    title: { ar: "أرقام العرض واضحة قبل الإرسال", en: "Proposal numbers are clear before you send" },
    subtitle: {
      ar: "مثال: كمية 10، تكلفة الوحدة 100، سعر البيع 150، ضريبة 15%.",
      en: "Example: quantity 10, unit cost 100, selling price 150, VAT 15%.",
    },
    rows: [
      { label: { ar: "التكلفة قبل الضريبة", en: "Cost before VAT" }, value: "1,000" },
      { label: { ar: "البيع قبل الضريبة", en: "Sales before VAT" }, value: "1,500" },
      { label: { ar: "التكلفة شاملة الضريبة", en: "Cost incl. VAT" }, value: "1,150" },
      { label: { ar: "البيع شامل الضريبة", en: "Sales incl. VAT" }, value: "1,725" },
      { label: { ar: "الربح", en: "Profit" }, value: "575" },
      { label: { ar: "الهامش", en: "Margin" }, value: "33.33%" },
    ],
    note: {
      ar: "الضريبة 15% إعداد افتراضي قابل للتعديل أو التعطيل. الفاتورة تُقرأ من نسختها المجمدة فلا تتغير بتغيير الإعدادات لاحقاً.",
      en: "15% VAT is a default you can change or turn off. Invoices read from their frozen copy, so later setting changes do not alter them.",
    },
  },
  modules: {
    title: { ar: "كل ما تحتاجه المنشأة في مساحة عمل واحدة", en: "Everything your business needs in one workspace" },
    subtitle: {
      ar: "أقسام مترابطة تشترك في البيانات نفسها بدل ملفات منفصلة.",
      en: "Connected sections that share the same data instead of separate files.",
    },
    items: [
      {
        icon: "dashboard",
        name: { ar: "لوحة التحكم", en: "Dashboard" },
        desc: {
          ar: "المبيعات المحققة والمتوقعة والربح والهامش مقابل الهدف، وتنبيهات المتابعة.",
          en: "Realized and expected sales, profit, margin against target, and follow-up alerts.",
        },
      },
      {
        icon: "estimates",
        name: { ar: "التقديرات والعروض", en: "Estimates and proposals" },
        desc: {
          ar: "بحث وتصفية وإنشاء وتحرير ومتابعة المرحلة والإلغاء وإعادة الفتح.",
          en: "Search, filter, create, edit, track stage, cancel, and reopen.",
        },
      },
      {
        icon: "sales",
        name: { ar: "المبيعات", en: "Sales" },
        desc: {
          ar: "فواتير بيع المنتجات والخدمات مع التأكيد والتحصيل والإلغاء.",
          en: "Product and service invoices with confirmation, collection, and cancellation.",
        },
      },
      {
        icon: "purchases",
        name: { ar: "المشتريات", en: "Purchases" },
        desc: {
          ar: "فواتير الموردين من المسودة إلى التأكيد والسداد.",
          en: "Supplier invoices from draft to confirmation and payment.",
        },
      },
      {
        icon: "inventory",
        name: { ar: "المخزون والمستودعات", en: "Inventory and warehouses" },
        desc: {
          ar: "رصيد ومتوسط تكلفة لكل منتج في كل مستودع، مع الحركات والتسويات.",
          en: "Balance and average cost per product per warehouse, with movements and adjustments.",
        },
      },
      {
        icon: "accounting",
        name: { ar: "المحاسبة", en: "Accounting" },
        desc: {
          ar: "دليل حسابات وقيود ودفتر أستاذ وميزان مراجعة وترحيل الفواتير.",
          en: "Chart of accounts, journals, ledger, trial balance, and invoice posting.",
        },
      },
      {
        icon: "parties",
        name: { ar: "العملاء والموردون", en: "Clients and suppliers" },
        desc: {
          ar: "أفراد ومنشآت، بيانات الاتصال والرقم الضريبي والسجل والوسوم والأنشطة.",
          en: "Individuals and companies, contacts, VAT and CR numbers, tags, and activity.",
        },
      },
      {
        icon: "catalog",
        name: { ar: "دليل البنود", en: "Item catalog" },
        desc: {
          ar: "منتجات وخدمات بفئات ووحدات وصور وتكلفة وأسعار بيع وجملة.",
          en: "Products and services with categories, units, images, cost, retail, and wholesale prices.",
        },
      },
    ],
  },
  documents: {
    title: { ar: "عرض احترافي يصل إلى العميل بطريقته", en: "A professional proposal, delivered the client's way" },
    subtitle: {
      ar: "PDF يُولَّد على الخادم بخطوط عربية ورمز الريال وترقيم الصفحات، مع Word والطباعة ونسخ النص.",
      en: "Server-generated PDF with Arabic fonts, the riyal symbol, and page numbers, plus Word, print, and copy-as-text.",
    },
    items: [
      { ar: "PDF عربي وإنجليزي من بيانات الخادم", en: "Arabic and English PDF built from server data" },
      { ar: "ملف Word قابل للتحرير", en: "An editable Word file" },
      { ar: "طباعة مخصصة للعرض والتقدير", en: "Dedicated print views" },
      { ar: "تجهيز رسالة واتساب برابط العرض", en: "A ready WhatsApp message with the proposal link" },
    ],
    share: {
      title: { ar: "رابط مشاركة قصير للعميل", en: "A short share link for the client" },
      body: {
        ar: "صفحة مناسبة للجوال تعرض نص العرض وجدول البنود والإجماليات مع تنزيل PDF. الرابط صالح سبعة أيام، ونسخته ثابتة، ولا يُظهر التكلفة الداخلية.",
        en: "A mobile-friendly page with the proposal text, item table, totals, and PDF download. The link lasts seven days, its copy is fixed, and it never shows internal cost.",
      },
    },
  },
  ai: {
    title: { ar: "صياغة العرض بالذكاء الاصطناعي، دون كشف أسعارك", en: "AI proposal writing that keeps your prices private" },
    intro: {
      ar: "تكامل اختياري مع Groq وAnthropic وOpenAI لكتابة النص الوصفي للعرض. يُرسل اسم المشروع والبنود وكمياتها، ولا تُرسل حقول السعر والتكلفة. الحسابات تبقى مسؤولية التطبيق.",
      en: "Optional integration with Groq, Anthropic, and OpenAI to write the proposal narrative. Project name, items, and quantities are sent; price and cost fields are not. The math stays with the app.",
    },
    items: [
      { ar: "صياغة بالعربية أو الإنجليزية", en: "Writing in Arabic or English" },
      { ar: "تحقق من بنية الاستجابة قبل حفظها", en: "Response structure checked before saving" },
      { ar: "حفظ الصياغة حسب المشروع واللغة", en: "Drafts saved per project and language" },
      { ar: "تعديلاتك تُحفظ مستقلة عن النص المولَّد", en: "Your edits saved separately from generated text" },
    ],
  },
  roles: {
    title: { ar: "لمن صُمم مُقدّر التكلفة", en: "Who Cost Estimator is for" },
    subtitle: {
      ar: "فرق المقاولات والخدمات وتنفيذ المشاريع، والمنشآت التي تجمع بين عروض الأعمال وبيع المنتجات.",
      en: "Contracting, services, and project delivery teams, and businesses that both quote work and sell products.",
    },
    items: [
      { role: { ar: "مسؤول التسعير", en: "Estimator" }, use: { ar: "البنود والكميات والتكلفة والهامش", en: "Items, quantities, cost, and margin" } },
      { role: { ar: "المبيعات", en: "Sales" }, use: { ar: "العملاء والعروض والصلاحية والمشاركة", en: "Clients, proposals, validity, and sharing" } },
      { role: { ar: "المشتريات", en: "Purchasing" }, use: { ar: "الموردون وفواتير الشراء والدفعات", en: "Suppliers, purchase invoices, and payments" } },
      { role: { ar: "المستودع", en: "Warehouse" }, use: { ar: "الأرصدة والحركات والتسويات", en: "Balances, movements, and adjustments" } },
      { role: { ar: "المحاسب", en: "Accountant" }, use: { ar: "القيود والحسابات وترحيل الفواتير", en: "Journals, accounts, and invoice posting" } },
      { role: { ar: "صاحب المنشأة", en: "Owner" }, use: { ar: "المؤشرات والفريق والإعدادات", en: "KPIs, team, and settings" } },
    ],
    note: {
      ar: "الصلاحيات البرمجية ثلاثة أدوار: صاحب الحساب، ومدير النظام، والعضو.",
      en: "Built-in permissions use three roles: owner, admin, and member.",
    },
  },
  data: {
    title: { ar: "انقل بياناتك من Excel بسهولة", en: "Bring your data over from Excel" },
    body: {
      ar: "استيراد JSON وملفات Excel بصيغة XLSX وXLSM وفق قالب محدد، بوضع الدمج الآمن. وتصدير JSON وCSV وبيانات المحاسبة، إلى جانب PDF وWord للعروض.",
      en: "Import JSON and Excel (XLSX and XLSM) using a defined template with safe merge mode. Export JSON, CSV, and accounting data, plus PDF and Word for proposals.",
    },
  },
  trust: {
    title: { ar: "مبني بتقنيات حديثة ومختبر", en: "Built on a modern, tested stack" },
    items: [
      { value: "150", label: { ar: "اختبار ناجح", en: "passing tests" } },
      { value: "33", label: { ar: "نموذج بيانات", en: "data models" } },
      { value: "46", label: { ar: "صفحة في التطبيق", en: "app pages" } },
      { value: "S3", label: { ar: "تخزين ملفات خاص", en: "private file storage" } },
    ],
    stack: ["Next.js", "NestJS", "PostgreSQL", "Prisma", "Better Auth", "Docker"],
    security: {
      ar: "دخول برمز بريد من ستة أرقام مع Google وGitHub اختيارياً، وفصل بيانات كل منشأة في مساحة عمل مستقلة، وتحقق من المدخلات على الخادم.",
      en: "Six-digit email code sign-in with optional Google and GitHub, each business isolated in its own workspace, and server-side input validation.",
    },
  },
  comparison: {
    title: { ar: "مُقدّر التكلفة مقارنة بالجداول المتفرقة", en: "Cost Estimator versus scattered spreadsheets" },
    product: { ar: "مُقدّر التكلفة", en: "Cost Estimator" },
    manual: { ar: "Excel وWord وملفات متفرقة", en: "Excel, Word, and loose files" },
    rows: [
      {
        product: { ar: "تكلفة كاملة بمكونات محسوبة تلقائياً", en: "Full cost with auto-calculated components" },
        manual: { ar: "نسيان النقل والمصاريف الإضافية", en: "Freight and overheads get forgotten" },
      },
      {
        product: { ar: "هامش وربح ظاهران أثناء التسعير", en: "Margin and profit visible while pricing" },
        manual: { ar: "الربح يُعرف بعد التنفيذ", en: "Profit discovered after the job" },
      },
      {
        product: { ar: "مراحل ونسخ محفوظة لكل عرض", en: "Stages and saved copies for every quote" },
        manual: { ar: "ملفات باسم عرض-نهائي-2", en: "Files named quote-final-2" },
      },
      {
        product: { ar: "مخزون وقيود تتحدث عند التأكيد", en: "Stock and entries update on confirmation" },
        manual: { ar: "إدخال يدوي مكرر في كل نظام", en: "Re-keying data into every system" },
      },
      {
        product: { ar: "رابط مشاركة وPDF عربي جاهز", en: "Share link and ready Arabic PDF" },
        manual: { ar: "تنسيق ينكسر عند التصدير", en: "Layout breaks on export" },
      },
    ],
  },
  pricing: {
    eyebrow: { ar: "باقات الاشتراك", en: "Subscription plans" },
    title: { ar: "اشتراك واحد يشمل كل الأقسام", en: "One subscription with every module included" },
    subtitle: {
      ar: "كل مزايا مُقدّر التكلفة في كل باقة. اختر الدفع الشهري، أو وفّر مع الباقة السنوية.",
      en: "Every Cost Estimator feature in every plan. Pay monthly, or save with the annual plan.",
    },
    currencyLabel: { ar: "ريال", en: "SAR" },
    perMonth: { ar: "شهرياً", en: "/ month" },
    plans: [
      {
        id: "annual",
        featured: true,
        badge: { ar: "الأكثر توفيراً", en: "Best value" },
        name: { ar: "الباقة السنوية", en: "Annual plan" },
        description: {
          ar: "الخيار الأوفر لمن يعتمد على التطبيق في تسعير مشاريعه طوال العام.",
          en: "The best value for teams that price projects all year round.",
        },
        monthlyEquivalent: 99,
        billedAmount: 1190,
        compareAt: 129,
        billing: {
          ar: "تُدفع 1,190 ريالاً مرة واحدة سنوياً",
          en: "Billed SAR 1,190 once a year",
        },
        billingDetail: {
          ar: "الدفع مقدماً عن 12 شهراً، أي ما يعادل 99.17 ريالاً شهرياً.",
          en: "Paid upfront for 12 months, equal to SAR 99.17 per month.",
        },
        saving: {
          ar: "وفّر 358 ريالاً (23%) مقارنة بالدفع الشهري",
          en: "Save SAR 358 (23%) compared with paying monthly",
        },
        cta: { ar: "اشترك في الباقة السنوية", en: "Get the annual plan" },
      },
      {
        id: "monthly",
        featured: false,
        badge: { ar: "مرونة شهرية", en: "Month to month" },
        name: { ar: "الباقة الشهرية", en: "Monthly plan" },
        description: {
          ar: "لمن يريد البدء بالتجربة والدفع شهراً بشهر.",
          en: "For those who want to start small and pay month by month.",
        },
        monthlyEquivalent: 129,
        billedAmount: 129,
        compareAt: null,
        billing: {
          ar: "تُدفع 129 ريالاً كل شهر",
          en: "Billed SAR 129 every month",
        },
        billingDetail: {
          ar: "يمكنك الانتقال إلى الباقة السنوية في أي وقت.",
          en: "You can switch to the annual plan at any time.",
        },
        saving: null,
        cta: { ar: "اشترك شهرياً", en: "Subscribe monthly" },
      },
    ],
    features: [
      { ar: "التقديرات وعروض الأسعار ومراحلها حتى الفاتورة", en: "Estimates, proposals, and stages through to invoice" },
      { ar: "حساب التكلفة الكاملة والضريبة والربح والهامش", en: "Full cost, VAT, profit, and margin calculations" },
      { ar: "المبيعات والمشتريات والمخزون والمستودعات", en: "Sales, purchasing, inventory, and warehouses" },
      { ar: "المحاسبة بالقيد المزدوج ودفتر الأستاذ وميزان المراجعة", en: "Double-entry accounting, ledger, and trial balance" },
      { ar: "عروض PDF وWord ورابط مشاركة للعميل", en: "PDF and Word proposals with a client share link" },
      { ar: "مساحة عمل لمنشأتك مع أعضاء فريقك", en: "A workspace for your business and team members" },
      { ar: "استيراد من Excel وتصدير البيانات", en: "Excel import and data export" },
      { ar: "صياغة العروض بالذكاء الاصطناعي (اختيارية)", en: "AI proposal writing (optional)" },
    ],
    featuresTitle: { ar: "يشمل الاشتراك", en: "Every plan includes" },
    request: {
      note: {
        ar: "اطلب الباقة عبر واتساب، وسنرسل لك رابط الدفع وتفاصيل تفعيل حسابك.",
        en: "Request your plan on WhatsApp and we will send you the payment link and account activation details.",
      },
    },
    note: {
      ar: "الأسعار بالريال السعودي. الباقة السنوية تُدفع مقدماً مرة واحدة عن سنة كاملة.",
      en: "Prices are in Saudi riyals. The annual plan is paid upfront once for a full year.",
    },
  },
  audience: {
    yesTitle: { ar: "مناسب لك إذا كنت", en: "A good fit if you" },
    yes: [
      { ar: "تقدم عروض أسعار لمشاريع مقاولات أو خدمات", en: "Quote contracting or service projects" },
      { ar: "تحتاج عروضاً بالعربية والإنجليزية", en: "Need proposals in Arabic and English" },
      { ar: "تريد معرفة هامشك قبل الإرسال", en: "Want to see your margin before sending" },
      { ar: "تبيع منتجات وتدير مستودعاً إلى جانب المشاريع", en: "Sell products and run a warehouse alongside projects" },
    ],
    noTitle: { ar: "ما لا يعد به مُقدّر التكلفة حالياً", en: "What Cost Estimator does not claim today" },
    noIntro: {
      ar: "لا يتضمن حالياً تكاملاً تقنياً مع منصة فاتورة للفوترة الإلكترونية، ولا ربطاً ببوابة دفع أو بنك، ولا إرسالاً آلياً عبر WhatsApp Business، ويعمل بالريال السعودي فقط ويتطلب اتصالاً بالإنترنت.",
      en: "It does not currently include a technical e-invoicing integration with ZATCA, a payment gateway or bank link, or automated WhatsApp Business sending. It works in Saudi riyals only and needs an internet connection.",
    },
  },
  faqs: {
    title: { ar: "أسئلة شائعة", en: "Frequently asked questions" },
    subtitle: {
      ar: "إجابات مباشرة عن التسعير والمستندات والبيانات",
      en: "Direct answers on pricing, documents, and data",
    },
    items: [
      {
        question: { ar: "كم سعر الاشتراك؟", en: "How much is the subscription?" },
        answer: {
          ar: "الباقة الشهرية 129 ريالاً شهرياً. والباقة السنوية 1,190 ريالاً تُدفع مرة واحدة مقدماً عن 12 شهراً، أي ما يعادل نحو 99 ريالاً شهرياً وتوفير 358 ريالاً في السنة.",
          en: "The monthly plan is SAR 129 per month. The annual plan is SAR 1,190 paid once upfront for 12 months, about SAR 99 per month and a SAR 358 yearly saving.",
        },
      },
      {
        question: { ar: "هل أدفع 99 ريالاً كل شهر في الباقة السنوية؟", en: "Do I pay SAR 99 every month on the annual plan?" },
        answer: {
          ar: "لا. سعر 99 ريالاً هو المعادل الشهري فقط؛ الباقة السنوية تُدفع دفعة واحدة بقيمة 1,190 ريالاً عند الاشتراك.",
          en: "No. SAR 99 is the monthly equivalent only; the annual plan is a single SAR 1,190 payment when you subscribe.",
        },
      },
      {
        question: { ar: "هل تغيير تكلفة بند في الدليل يعيد تسعير العروض القديمة؟", en: "Does changing an item's cost reprice older quotes?" },
        answer: {
          ar: "لا. كل سطر في التقدير يحتفظ بقيمه الخاصة، وتبقى العروض السابقة كما هي. الفاتورة تُقرأ من نسختها المجمدة.",
          en: "No. Each estimate line keeps its own values, so earlier quotes stay as they were. Invoices read from their frozen copy.",
        },
      },
      {
        question: { ar: "ما الفرق بين فاتورة المشروع وفاتورة البيع المباشر؟", en: "What is the difference between a project invoice and a direct sale?" },
        answer: {
          ar: "فاتورة المشروع تنتج عن مراحل التقدير وتُرحّل محاسبياً كخطوة مستقلة ولا تحرك المخزون. فاتورة البيع المباشر تخصم المنتجات من المستودع وترحّل القيود تلقائياً عند التأكيد.",
          en: "A project invoice comes from the estimate stages, is posted to the books as a separate step, and does not move stock. A direct sale deducts products from the warehouse and posts entries automatically on confirmation.",
        },
      },
      {
        question: { ar: "هل يرى العميل تكلفتي الداخلية في رابط المشاركة؟", en: "Can the client see my internal cost in the share link?" },
        answer: {
          ar: "لا. الصفحة العامة تعرض نص العرض والبنود والإجماليات فقط، والرابط صالح سبعة أيام.",
          en: "No. The public page shows only the proposal text, items, and totals, and the link lasts seven days.",
        },
      },
      {
        question: { ar: "هل أحتاج الذكاء الاصطناعي لاستخدام التطبيق؟", en: "Do I need AI to use the app?" },
        answer: {
          ar: "لا. الحسابات وإعداد العرض تعمل دون أي مزود. الصياغة الآلية ميزة اختيارية، ولا تُرسل حقول السعر والتكلفة إلى المزود.",
          en: "No. Calculations and proposals work without any provider. AI writing is optional, and price and cost fields are never sent to the provider.",
        },
      },
      {
        question: { ar: "هل يمكنني استيراد بياناتي من Excel؟", en: "Can I import my data from Excel?" },
        answer: {
          ar: "نعم، وفق قالب محدد بصيغة XLSX أو XLSM يضم أوراقاً مثل البنود والعملاء والمشاريع، مع التحقق على الخادم قبل الحفظ.",
          en: "Yes, using a defined XLSX or XLSM template with sheets such as items, clients, and projects, validated on the server before saving.",
        },
      },
      {
        question: { ar: "هل يدعم الفوترة الإلكترونية (فاتورة)؟", en: "Does it support ZATCA e-invoicing?" },
        answer: {
          ar: "ليس حالياً. يصدر التطبيق فواتير PDF، لكنه لا يتضمن تكاملاً تقنياً مع منصة فاتورة أو توليد مستندات UBL.",
          en: "Not yet. The app issues PDF invoices but does not include a technical ZATCA integration or UBL generation.",
        },
      },
    ],
  },
  closing: {
    slogan: {
      ar: "سعّر بدقة. اعرض باحتراف. تابع حتى الفاتورة.",
      en: "Price precisely. Propose professionally. Follow through to invoice.",
    },
    body: {
      ar: "إذا كنت تسعّر مشاريعك في جداول متفرقة، انقلها إلى مُقدّر التكلفة ودع الأرقام والمستندات والحسابات تعمل معاً.",
      en: "If you price projects in scattered spreadsheets, move them into Cost Estimator and let numbers, documents, and books work together.",
    },
  },
  cta: {
    primary: { ar: "احجز عرضاً توضيحياً", en: "Book a demo" },
    secondary: { ar: "تواصل معنا", en: "Contact us" },
  },
} as const;

export function copy(locale: string, value: LocaleCopy) {
  return locale === "ar" ? value.ar : value.en;
}
