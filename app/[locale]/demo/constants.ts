import {
    Video,
    Target,
    Users,
    Clock,
    CheckCircle2,
    Shield,
    Headphones,
    Award,
  } from "lucide-react";
  
  export function getDemoConstants(isRTL: boolean) {
    const benefits = [
      {
        icon: Video,
        title: isRTL ? "عرض حي تفاعلي" : "Live Interactive Demo",
        description: isRTL
          ? "شاهد النظام مباشرة مع إمكانية طرح الأسئلة"
          : "Watch the system live with the ability to ask questions",
        color: "from-blue-500 to-cyan-500",
      },
      {
        icon: Target,
        title: isRTL ? "مخصص لقطاعك" : "Customized for Your Industry",
        description: isRTL
          ? "نعرض الميزات المناسبة لمجال عملك تحديداً"
          : "We showcase features specifically for your business sector",
        color: "from-purple-500 to-pink-500",
      },
      {
        icon: Users,
        title: isRTL ? "خبير متخصص" : "Specialized Expert",
        description: isRTL
          ? "مستشار أعمال يفهم احتياجاتك ويجيب على استفساراتك"
          : "Business consultant who understands your needs and answers your questions",
        color: "from-green-500 to-emerald-500",
      },
      {
        icon: Clock,
        title: isRTL ? "30 دقيقة فقط" : "Only 30 Minutes",
        description: isRTL
          ? "عرض مركز يوفر وقتك ويغطي كل ما تحتاجه"
          : "Focused demo that saves your time and covers everything you need",
        color: "from-orange-500 to-red-500",
      },
    ];
  
    const whatsIncluded = [
      isRTL ? "عرض شامل للنظام" : "Comprehensive system overview",
      isRTL ? "ميزات مخصصة لقطاعك" : "Features customized for your sector",
      isRTL ? "جلسة أسئلة وأجوبة" : "Q&A session",
      isRTL ? "خطة تنفيذ مقترحة" : "Proposed implementation plan",
      isRTL ? "عرض أسعار مخصص" : "Customized pricing quote",
      isRTL ? "دليل بدء سريع" : "Quick start guide",
    ];
  
    return {
      benefits,
      whatsIncluded,
    };
  }