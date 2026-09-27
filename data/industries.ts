export type Industry = {
  id: string;
  nameAR: string;
  nameEN: string;
  summaryAR: string;
  summaryEN: string;
  descriptionAR: string;
  descriptionEN: string;
  hero: {
    headlineAR: string;
    headlineEN: string;
    subAR: string;
    subEN: string;
  };
  coreModules: string[];
  specialized: Array<{
    nameAR: string;
    nameEN: string;
    descAR: string;
    descEN: string;
  }>;
  useCases: Array<{
    titleAR: string;
    titleEN: string;
    descAR: string;
    descEN: string;
  }>;
  cta: {
    primaryAR: string;
    primaryEN: string;
    secondaryAR: string;
    secondaryEN: string;
  };
};

export const industries: Industry[] = [
  {
    id: "supermarket",
    nameAR: "السوبرماركت",
    nameEN: "Supermarkets",
    summaryAR: "نقاط بيع سريعة بالباركود، جرد دقيق، تنبيهات الصلاحية، وتقارير لحظية لكل فرع.",
    summaryEN: "Fast barcode checkout, accurate stock, expiry alerts, and real-time reports for every branch.",
    descriptionAR:
      "نظام متكامل مصمم خصيصاً للسوبرماركت يوفر نقطة بيع سريعة، إدارة مخزون دقيقة، وتقارير لحظية لمساعدتك في إدارة عملك بكفاءة عالية.",
    descriptionEN:
      "A comprehensive system designed specifically for supermarkets with fast POS, accurate inventory management, and real-time reports to help you manage your business efficiently.",
    hero: {
      headlineAR: "نقطة بيع سريعة. جرد دقيق. تقارير لحظية.",
      headlineEN: "Fast POS. Accurate Stock. Real-time Insights.",
      subAR: "كل ما تحتاجه لإدارة السوبرماركت بكفاءة.",
      subEN: "Everything you need to run your supermarket efficiently.",
    },
    coreModules: ["POS", "Accounting", "Inventory", "HR", "Reports"],
    specialized: [
      {
        nameAR: "مسح الباركود",
        nameEN: "Barcode Scanning",
        descAR: "مسح سريع ودقيق للمنتجات مع دعم طابعات الباركود",
        descEN: "Fast and accurate product scanning with barcode printer support",
      },
      {
        nameAR: "العروض والخصومات",
        nameEN: "Promotions & Discounts",
        descAR: "إدارة سهلة للعروض الترويجية والخصومات الموسمية",
        descEN: "Easy management of promotional offers and seasonal discounts",
      },
      {
        nameAR: "تتبع تواريخ الانتهاء",
        nameEN: "Expiry Date Tracking",
        descAR: "تنبيهات تلقائية للمنتجات القريبة من الانتهاء",
        descEN: "Automatic alerts for products nearing expiry",
      },
      {
        nameAR: "تقارير متقدمة",
        nameEN: "Advanced Reports",
        descAR: "تقارير مبيعات حسب الفئة والوقت مع رسوم بيانية تفصيلية",
        descEN: "Category and time-based sales reports with detailed charts",
      },
      {
        nameAR: "دعم متعدد الفروع",
        nameEN: "Multi-branch Support",
        descAR: "إدارة مركزية لعدة فروع مع تقارير موحدة",
        descEN: "Centralized management for multiple branches with unified reports",
      },
    ],
    useCases: [
      {
        titleAR: "إدارة المخزون الذكية",
        titleEN: "Smart Inventory Management",
        descAR: "تتبع المخزون بدقة مع تنبيهات إعادة الطلب التلقائية",
        descEN: "Accurate stock tracking with automatic reorder alerts",
      },
      {
        titleAR: "نقطة بيع سريعة",
        titleEN: "Fast Checkout",
        descAR: "إتمام المعاملات بسرعة مع دعم طرق دفع متعددة",
        descEN: "Quick transaction completion with multiple payment methods",
      },
      {
        titleAR: "تقارير أداء شاملة",
        titleEN: "Comprehensive Performance Reports",
        descAR: "تحليلات مفصلة لأداء المبيعات والمخزون",
        descEN: "Detailed analytics for sales and inventory performance",
      },
    ],
    cta: {
      primaryAR: "جرّب النظام الآن",
      primaryEN: "Start Your Free Trial",
      secondaryAR: "احجز عرضاً",
      secondaryEN: "Book a Live Demo",
    },
  },


  {
    id: "retail",
    nameAR: "محلات التجزئة",
    nameEN: "Retail Stores",
    summaryAR: "بيع أسرع ومخزون تحت السيطرة لمحلات الملابس والإلكترونيات والجوالات، مع مقاسات وألوان وأرقام تسلسلية.",
    summaryEN: "Faster checkout and full stock control for fashion, electronics, and mobile shops, with sizes, colors, and serial numbers.",
    descriptionAR:
      "نظام تجزئة متكامل لمحلات الملابس والأحذية والإلكترونيات والجوالات والإكسسوارات. يدعم الأصناف بالمقاسات والألوان، الأرقام التسلسلية والضمان، الاستبدال والاسترجاع، والفروع المتعددة مع تقارير لحظية للمبيعات والأرباح.",
    descriptionEN:
      "A complete retail system for fashion, footwear, electronics, mobile, and accessories stores. It supports size and color variants, serial numbers and warranty, exchanges and returns, and multiple branches with real-time sales and profit reports.",
    hero: {
      headlineAR: "كل أصنافك، كل فروعك، في شاشة واحدة.",
      headlineEN: "Every item, every branch, one screen.",
      subAR: "بيع أسرع، مخزون أدق، وعملاء يعودون من جديد.",
      subEN: "Faster sales, accurate stock, and customers who come back.",
    },
    coreModules: ["POS", "Accounting", "Inventory", "CRM", "Reports"],
    specialized: [
      {
        nameAR: "المقاسات والألوان",
        nameEN: "Sizes & Colors",
        descAR: "إدارة الصنف الواحد بمتغيرات متعددة مع باركود لكل متغير",
        descEN: "Manage one item with multiple variants and a barcode for each",
      },
      {
        nameAR: "الأرقام التسلسلية والضمان",
        nameEN: "Serials & Warranty",
        descAR: "تتبع الأجهزة برقمها التسلسلي ومتابعة فترة الضمان",
        descEN: "Track devices by serial number and follow warranty periods",
      },
      {
        nameAR: "الاستبدال والاسترجاع",
        nameEN: "Exchanges & Returns",
        descAR: "سياسات مرنة للاستبدال والاسترجاع مع أثر فوري على المخزون",
        descEN: "Flexible exchange and return policies with instant stock updates",
      },
      {
        nameAR: "التحويل بين الفروع",
        nameEN: "Branch Transfers",
        descAR: "نقل البضاعة بين الفروع والمستودعات بسهولة",
        descEN: "Move stock between branches and warehouses easily",
      },
      {
        nameAR: "برنامج الولاء",
        nameEN: "Loyalty Program",
        descAR: "نقاط ومكافآت تشجع العملاء على العودة",
        descEN: "Points and rewards that bring customers back",
      },
    ],
    useCases: [
      {
        titleAR: "محلات الملابس والأحذية",
        titleEN: "Fashion & Footwear",
        descAR: "جرد دقيق حسب المقاس واللون وتنبيهات للأصناف الأكثر طلباً",
        descEN: "Accurate stock by size and color with alerts for best sellers",
      },
      {
        titleAR: "الإلكترونيات والجوالات",
        titleEN: "Electronics & Mobiles",
        descAR: "بيع بالرقم التسلسلي وإدارة الضمان والصيانة",
        descEN: "Serial-number sales with warranty and repair tracking",
      },
      {
        titleAR: "سلاسل المحلات",
        titleEN: "Store Chains",
        descAR: "رؤية موحدة لمبيعات ومخزون جميع الفروع",
        descEN: "A unified view of sales and stock across all branches",
      },
    ],
    cta: {
      primaryAR: "جرّب النظام",
      primaryEN: "Try the System",
      secondaryAR: "احجز عرضاً",
      secondaryEN: "Book Demo",
    },
  },
  {
    id: "contracting",
    nameAR: "المقاولات ومزودو الخدمات",
    nameEN: "Contractors & Service Providers",
    summaryAR: "من عرض السعر إلى الفاتورة: تسعير دقيق، متابعة المشاريع، وحساب الهامش قبل أن تبدأ.",
    summaryEN: "From quote to invoice: precise pricing, project tracking, and margin visibility before you start.",
    descriptionAR:
      "حل متكامل للمقاولين وشركات الخدمات يجمع تسعير المشاريع وعروض الأسعار بالعربية والإنجليزية، متابعة التنفيذ والمستخلصات، إدارة الموردين والمشتريات، وحساب التكاليف والأرباح لكل مشروع.",
    descriptionEN:
      "An all-in-one solution for contractors and service companies that brings together project pricing and bilingual quotations, execution and progress billing, suppliers and purchasing, and cost and profit tracking per project.",
    hero: {
      headlineAR: "سعّر بثقة. نفّذ بوضوح. اربح بدقة.",
      headlineEN: "Quote with confidence. Deliver with clarity. Profit with precision.",
      subAR: "كل مشاريعك وعروضك وفواتيرك في منصة واحدة.",
      subEN: "All your projects, quotes, and invoices in one platform.",
    },
    coreModules: ["Quotations", "Projects", "Accounting", "Purchasing", "Reports"],
    specialized: [
      {
        nameAR: "عروض أسعار احترافية",
        nameEN: "Professional Quotations",
        descAR: "عروض بالعربية والإنجليزية بصيغة PDF وروابط مشاركة",
        descEN: "Arabic and English quotes as PDF with shareable links",
      },
      {
        nameAR: "تقدير التكلفة والهامش",
        nameEN: "Cost & Margin Estimation",
        descAR: "احسب تكلفة البنود وهامش الربح قبل إرسال العرض",
        descEN: "Calculate line costs and profit margin before sending a quote",
      },
      {
        nameAR: "متابعة المشاريع",
        nameEN: "Project Tracking",
        descAR: "مراحل التنفيذ ونسب الإنجاز والمستخلصات",
        descEN: "Execution stages, completion rates, and progress billing",
      },
      {
        nameAR: "الموردون والمشتريات",
        nameEN: "Suppliers & Purchasing",
        descAR: "أوامر شراء وتسعير المواد وربطها بالمشروع",
        descEN: "Purchase orders and material pricing linked to each project",
      },
      {
        nameAR: "المحاسبة بالقيد المزدوج",
        nameEN: "Double-entry Accounting",
        descAR: "قيود تلقائية وتقارير أرباح لكل مشروع",
        descEN: "Automatic entries and profit reports per project",
      },
    ],
    useCases: [
      {
        titleAR: "شركات المقاولات العامة",
        titleEN: "General Contractors",
        descAR: "تسعير المناقصات ومتابعة المستخلصات والتكاليف الفعلية",
        descEN: "Price tenders and track progress bills and actual costs",
      },
      {
        titleAR: "مزودو الخدمات الفنية",
        titleEN: "Technical Service Providers",
        descAR: "عروض سريعة للتكييف والكهرباء والسباكة والتشطيبات",
        descEN: "Fast quotes for HVAC, electrical, plumbing, and finishing work",
      },
      {
        titleAR: "شركات الصيانة والتشغيل",
        titleEN: "Maintenance & Operations",
        descAR: "عقود دورية وأوامر عمل وفوترة منظمة",
        descEN: "Recurring contracts, work orders, and organized billing",
      },
    ],
    cta: {
      primaryAR: "ابدأ التجربة",
      primaryEN: "Start Trial",
      secondaryAR: "احجز عرضاً",
      secondaryEN: "Book Demo",
    },
  },
  {
    id: "perfumes",
    nameAR: "محلات العطور",
    nameEN: "Perfume Shops",
    summaryAR: "وصفات الخلطات، تتبع الدفعات، طباعة الملصقات، وباقات هدايا تزيد مبيعاتك في المواسم.",
    summaryEN: "Blend recipes, batch tracking, label printing, and gift bundles that lift seasonal sales.",
    descriptionAR:
      "نظام متخصص لمحلات العطور يتضمن إدارة وصفات الخلطات، تتبع الدفعات الإنتاجية، طباعة الملصقات، عروض الهدايا، وملفات العملاء.",
    descriptionEN:
      "A specialized system for perfume shops including blend recipe management, production batch tracking, label printing, gift offers, and customer profiles.",
    hero: {
      headlineAR: "حل متخصص لمحلات العطور العربية والعالمية",
      headlineEN: "Specialized Solution for Arabic & International Perfume Shops",
      subAR: "أدر خلطاتك، مبيعاتك، وعملاءك باحترافية.",
      subEN: "Manage your blends, sales, and customers professionally.",
    },
    coreModules: ["POS", "Accounting", "Inventory", "Light CRM"],
    specialized: [
      {
        nameAR: "وصفات الخلطات",
        nameEN: "Blend Recipes",
        descAR: "حفظ وإدارة وصفات الخلطات الخاصة بك",
        descEN: "Save and manage your blend recipes",
      },
      {
        nameAR: "تتبع الدفعات",
        nameEN: "Batch Tracking",
        descAR: "تتبع دفعات الإنتاج والمكونات المستخدمة",
        descEN: "Track production batches and ingredients used",
      },
      {
        nameAR: "طباعة الملصقات",
        nameEN: "Label Printing",
        descAR: "طباعة ملصقات احترافية للمنتجات",
        descEN: "Print professional product labels",
      },
      {
        nameAR: "عروض الهدايا",
        nameEN: "Gift Bundles",
        descAR: "إدارة باقات الهدايا والعروض الموسمية",
        descEN: "Manage gift bundles and seasonal offers",
      },
      {
        nameAR: "ملفات العملاء",
        nameEN: "Customer Profiles",
        descAR: "حفظ تفضيلات العملاء ومشترياتهم السابقة",
        descEN: "Save customer preferences and purchase history",
      },
    ],
    useCases: [
      {
        titleAR: "إدارة الخلطات المخصصة",
        titleEN: "Custom Blend Management",
        descAR: "إنشاء وحفظ خلطات مخصصة للعملاء",
        descEN: "Create and save custom blends for customers",
      },
      {
        titleAR: "برنامج ولاء العملاء",
        titleEN: "Customer Loyalty Program",
        descAR: "تتبع نقاط الولاء والمشتريات المتكررة",
        descEN: "Track loyalty points and repeat purchases",
      },
      {
        titleAR: "إدارة المخزون المتخصص",
        titleEN: "Specialized Inventory",
        descAR: "تتبع المكونات والزجاجات والملصقات",
        descEN: "Track ingredients, bottles, and labels",
      },
    ],
    cta: {
      primaryAR: "ابدأ التجربة",
      primaryEN: "Start Trial",
      secondaryAR: "تواصل معنا",
      secondaryEN: "Contact Us",
    },
  },
  {
    id: "beauty-salon",
    nameAR: "الصالونات النسائية",
    nameEN: "Women's Beauty Salons",
    summaryAR: "حجوزات ذكية بتذكير تلقائي، جداول الموظفات، باقات واشتراكات، وبرامج ولاء.",
    summaryEN: "Smart bookings with reminders, staff rosters, packages and subscriptions, and loyalty programs.",
    descriptionAR:
      "نظام شامل لإدارة الصالونات النسائية يتضمن نظام حجوزات ذكي، جداول الموظفات، الباقات والاشتراكات، برامج الولاء، وإدارة الكراسي.",
    descriptionEN:
      "A comprehensive salon management system including smart appointment booking, staff schedules, packages & subscriptions, loyalty programs, and multi-chair management.",
    hero: {
      headlineAR: "إدارة احترافية للصالونات النسائية",
      headlineEN: "Professional Women's Salon Management",
      subAR: "حجوزات ذكية، جداول منظمة، وتجربة عملاء مميزة.",
      subEN: "Smart bookings, organized schedules, and exceptional customer experience.",
    },
    coreModules: ["POS", "Accounting", "HR", "CRM", "Bookings"],
    specialized: [
      {
        nameAR: "نظام الحجوزات",
        nameEN: "Appointment System",
        descAR: "حجوزات ذكية مع تذكيرات تلقائية",
        descEN: "Smart bookings with automatic reminders",
      },
      {
        nameAR: "جداول الموظفات",
        nameEN: "Staff Rosters",
        descAR: "إدارة مواعيد العمل والإجازات",
        descEN: "Manage work schedules and time off",
      },
      {
        nameAR: "الباقات والاشتراكات",
        nameEN: "Packages & Subscriptions",
        descAR: "باقات خدمات واشتراكات شهرية",
        descEN: "Service packages and monthly subscriptions",
      },
      {
        nameAR: "بطاقات الولاء",
        nameEN: "Loyalty Cards",
        descAR: "برنامج نقاط ولاء وعروض خاصة",
        descEN: "Points loyalty program and special offers",
      },
      {
        nameAR: "إدارة الكراسي",
        nameEN: "Multi-chair Management",
        descAR: "تتبع توفر الكراسي والموظفات",
        descEN: "Track chair and staff availability",
      },
    ],
    useCases: [
      {
        titleAR: "نظام حجز ذكي",
        titleEN: "Smart Booking System",
        descAR: "حجوزات أونلاين مع تذكيرات SMS",
        descEN: "Online bookings with SMS reminders",
      },
      {
        titleAR: "إدارة الباقات",
        titleEN: "Package Management",
        descAR: "باقات مخصصة مع تتبع الاستخدام",
        descEN: "Custom packages with usage tracking",
      },
      {
        titleAR: "تقارير الأداء",
        titleEN: "Performance Reports",
        descAR: "تقارير تفصيلية لأداء الموظفات والخدمات",
        descEN: "Detailed reports on staff and service performance",
      },
    ],
    cta: {
      primaryAR: "جرّبي النظام",
      primaryEN: "Try the System",
      secondaryAR: "احجزي عرضاً",
      secondaryEN: "Book Demo",
    },
  },
];

export const getIndustryById = (id: string): Industry | undefined => {
  return industries.find((industry) => industry.id === id);
};

