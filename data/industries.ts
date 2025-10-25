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
    summaryAR: "حل متكامل لإدارة المبيعات والمخزون والمحاسبة مع نقاط بيع سريعة.",
    summaryEN: "An end-to-end solution for sales, inventory, and accounting with fast POS.",
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
    id: "maintenance",
    nameAR: "شركات الصيانة",
    nameEN: "Maintenance Companies",
    summaryAR: "إدارة طلبات العمل، جدولة الفنيين، وتتبع قطع الغيار بكفاءة.",
    summaryEN: "Manage work orders, technician scheduling, and parts tracking efficiently.",
    descriptionAR:
      "حل متكامل لشركات الصيانة والخدمات الميدانية يشمل إدارة طلبات العمل، جدولة الفنيين، تتبع قطع الغيار، والفواتير المتكررة.",
    descriptionEN:
      "A complete solution for maintenance and field service companies including work order management, technician scheduling, parts tracking, and recurring invoices.",
    hero: {
      headlineAR: "إدارة متكاملة لخدمات الصيانة الميدانية",
      headlineEN: "Complete Field Service Management",
      subAR: "نظّم طلبات العمل، جدول فنييك، وتتبع قطع الغيار بسهولة.",
      subEN: "Organize work orders, schedule technicians, and track parts easily.",
    },
    coreModules: ["Accounting", "HR", "Inventory", "Light CRM"],
    specialized: [
      {
        nameAR: "طلبات العمل",
        nameEN: "Work Orders",
        descAR: "إنشاء وتتبع طلبات العمل مع تفاصيل كاملة",
        descEN: "Create and track work orders with complete details",
      },
      {
        nameAR: "جدولة الفنيين",
        nameEN: "Technician Scheduling",
        descAR: "جدولة ذكية للفنيين حسب المواقع والمهارات",
        descEN: "Smart scheduling for technicians based on location and skills",
      },
      {
        nameAR: "تتبع قطع الغيار",
        nameEN: "Spare Parts Tracking",
        descAR: "إدارة مخزون قطع الغيار المستخدمة في كل مهمة",
        descEN: "Manage spare parts inventory used in each task",
      },
      {
        nameAR: "تطبيق ميداني",
        nameEN: "Field Mobile App",
        descAR: "تطبيق للفنيين لتحديث حالة المهام في الميدان (قريباً)",
        descEN: "App for technicians to update task status in the field (coming soon)",
      },
      {
        nameAR: "الفواتير المتكررة",
        nameEN: "Recurring Invoices",
        descAR: "فواتير تلقائية لعقود الصيانة الدورية",
        descEN: "Automatic invoices for periodic maintenance contracts",
      },
    ],
    useCases: [
      {
        titleAR: "عقود الصيانة الدورية",
        titleEN: "Periodic Maintenance Contracts",
        descAR: "إدارة عقود الصيانة مع فواتير تلقائية وتذكيرات",
        descEN: "Manage maintenance contracts with automatic invoices and reminders",
      },
      {
        titleAR: "جدولة ذكية للفنيين",
        titleEN: "Smart Technician Scheduling",
        descAR: "تخصيص المهام بناءً على الموقع والخبرة",
        descEN: "Assign tasks based on location and expertise",
      },
      {
        titleAR: "تتبع المهام الميدانية",
        titleEN: "Field Task Tracking",
        descAR: "متابعة حالة المهام الميدانية لحظياً",
        descEN: "Real-time tracking of field task status",
      },
    ],
    cta: {
      primaryAR: "ابدأ التجربة المجانية",
      primaryEN: "Start Free Trial",
      secondaryAR: "احجز عرضاً توضيحياً",
      secondaryEN: "Book a Demo",
    },
  },
  {
    id: "auto-workshop",
    nameAR: "ورش السيارات",
    nameEN: "Auto Workshops",
    summaryAR: "استقبال المركبات، التشخيص، التقديرات، وإدارة قطع الغيار.",
    summaryEN: "Vehicle intake, diagnostics, estimates, and parts management.",
    descriptionAR:
      "نظام شامل لورش تصليح السيارات يغطي استقبال المركبات، التشخيص، إعداد التقديرات، تتبع قطع الغيار، وحالة الأعمال حتى التسليم.",
    descriptionEN:
      "A comprehensive system for auto repair shops covering vehicle intake, diagnostics, estimates, parts tracking, and job status until delivery.",
    hero: {
      headlineAR: "إدارة احترافية لورش تصليح السيارات",
      headlineEN: "Professional Auto Workshop Management",
      subAR: "من الاستقبال إلى التسليم، نظّم ورشتك بكفاءة.",
      subEN: "From intake to delivery, manage your workshop efficiently.",
    },
    coreModules: ["POS/Billing", "Accounting", "Inventory", "HR", "CRM"],
    specialized: [
      {
        nameAR: "استقبال المركبات",
        nameEN: "Vehicle Intake",
        descAR: "تسجيل تفاصيل المركبة والعميل مع الصور",
        descEN: "Record vehicle and customer details with photos",
      },
      {
        nameAR: "التشخيص والتقديرات",
        nameEN: "Diagnostics & Estimates",
        descAR: "إنشاء تقديرات مفصلة للإصلاحات المطلوبة",
        descEN: "Create detailed estimates for required repairs",
      },
      {
        nameAR: "تتبع قطع الغيار",
        nameEN: "Parts Tracking",
        descAR: "إدارة مخزون قطع الغيار مع أرقام التعريف",
        descEN: "Manage parts inventory with identification numbers",
      },
      {
        nameAR: "تحديث حالة العمل",
        nameEN: "Job Status Updates",
        descAR: "تحديثات لحظية لحالة الإصلاح للعميل",
        descEN: "Real-time repair status updates for customers",
      },
      {
        nameAR: "التسليم والفوترة",
        nameEN: "Delivery & Invoicing",
        descAR: "فواتير تفصيلية وتسليم سلس للمركبة",
        descEN: "Detailed invoices and smooth vehicle delivery",
      },
    ],
    useCases: [
      {
        titleAR: "إدارة الأوامر الإصلاح",
        titleEN: "Repair Order Management",
        descAR: "تتبع كامل لأوامر الإصلاح من البداية للنهاية",
        descEN: "Complete tracking of repair orders from start to finish",
      },
      {
        titleAR: "قاعدة بيانات العملاء",
        titleEN: "Customer Database",
        descAR: "سجل كامل للمركبات وتاريخ الصيانة",
        descEN: "Complete record of vehicles and maintenance history",
      },
      {
        titleAR: "إدارة قطع الغيار",
        titleEN: "Parts Management",
        descAR: "تتبع دقيق لقطع الغيار والموردين",
        descEN: "Accurate tracking of parts and suppliers",
      },
    ],
    cta: {
      primaryAR: "جرّب مجاناً",
      primaryEN: "Try for Free",
      secondaryAR: "احجز عرضاً",
      secondaryEN: "Book Demo",
    },
  },
  {
    id: "perfumes",
    nameAR: "محلات العطور",
    nameEN: "Perfume Shops",
    summaryAR: "وصفات الخلطات، تتبع الدفعات، طباعة الملصقات، وإدارة الهدايا.",
    summaryEN: "Blend recipes, batch tracking, label printing, and gift management.",
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
    summaryAR: "حجوزات، جداول الموظفات، باقات، برامج ولاء، ومدفوعات متعددة.",
    summaryEN: "Appointments, staff schedules, packages, loyalty programs, and multiple payments.",
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

