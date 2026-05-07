"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Locale = "en" | "ar"

const translations = {
  // App
  "app.name": { en: "Aoun", ar: "عَوْن" },
  "app.tagline": { en: "Your trusted services", ar: "خدماتك الموثوقة" },

  // Role Selection
  "role.title": { en: "How would you like to use Aoun?", ar: "كيف تريد استخدام عَوْن؟" },
  "role.customer": { en: "Customer", ar: "عميل" },
  "role.customer.desc": { en: "Find and book services", ar: "ابحث واحجز الخدمات" },
  "role.worker": { en: "Worker", ar: "عامل" },
  "role.worker.desc": { en: "Offer your services & earn", ar: "قدّم خدماتك واكسب" },

  // Login
  "login.welcome": { en: "Welcome back", ar: "مرحباً بعودتك" },
  "login.subtitle": { en: "Sign in to book your next service", ar: "سجّل دخولك لحجز خدمتك القادمة" },
  "login.subtitle.worker": { en: "Sign in to find jobs", ar: "سجّل دخولك للعثور على عمل" },
  "login.phone": { en: "Phone", ar: "الهاتف" },
  "login.email": { en: "Email", ar: "البريد" },
  "login.phoneNumber": { en: "Phone Number", ar: "رقم الهاتف" },
  "login.emailAddress": { en: "Email Address", ar: "البريد الإلكتروني" },
  "login.password": { en: "Password", ar: "كلمة المرور" },
  "login.sendOtp": { en: "Send OTP Code", ar: "إرسال رمز التحقق" },
  "login.signIn": { en: "Sign In", ar: "تسجيل الدخول" },
  "login.orContinue": { en: "or continue with", ar: "أو تابع عبر" },
  "login.google": { en: "Continue with Google", ar: "المتابعة عبر جوجل" },
  "login.terms": { en: "By continuing, you agree to our", ar: "بالمتابعة، أنت توافق على" },
  "login.termsLink": { en: "Terms of Service", ar: "شروط الخدمة" },
  "login.and": { en: "and", ar: "و" },
  "login.privacyLink": { en: "Privacy Policy", ar: "سياسة الخصوصية" },

  // OTP
  "otp.title": { en: "Verify Your Number", ar: "تأكيد رقمك" },
  "otp.sent": { en: "We sent a 6-digit code to", ar: "أرسلنا رمزاً مكوناً من 6 أرقام إلى" },
  "otp.resend": { en: "Resend Code", ar: "إعادة إرسال الرمز" },
  "otp.resendIn": { en: "Resend code in", ar: "إعادة إرسال الرمز خلال" },
  "otp.verify": { en: "Verify & Continue", ar: "تحقق واستمر" },

  // Verification
  "verify.title": { en: "Identity Verification", ar: "التحقق من الهوية" },
  "verify.subtitle": { en: "To ensure safety, we need to verify your identity", ar: "لضمان الأمان، نحتاج للتحقق من هويتك" },
  "verify.step1.title": { en: "National ID - Front", ar: "الهوية الوطنية - الأمام" },
  "verify.step1.desc": { en: "Take a clear photo of the front side", ar: "التقط صورة واضحة للوجه الأمامي" },
  "verify.step2.title": { en: "National ID - Back", ar: "الهوية الوطنية - الخلف" },
  "verify.step2.desc": { en: "Take a clear photo of the back side", ar: "التقط صورة واضحة للوجه الخلفي" },
  "verify.step3.title": { en: "Selfie with ID", ar: "صورة شخصية مع الهوية" },
  "verify.step3.desc": { en: "Hold your ID next to your face", ar: "امسك هويتك بجانب وجهك" },
  "verify.upload": { en: "Tap to upload photo", ar: "اضغط لرفع الصورة" },
  "verify.retake": { en: "Retake", ar: "إعادة التقاط" },
  "verify.next": { en: "Next", ar: "التالي" },
  "verify.submit": { en: "Submit Verification", ar: "إرسال التحقق" },
  "verify.success.title": { en: "Verification Submitted!", ar: "تم إرسال التحقق!" },
  "verify.success.desc": { en: "Your documents are being reviewed. You'll be notified once approved.", ar: "جارِ مراجعة مستنداتك. سيتم إعلامك عند الموافقة." },
  "verify.continue": { en: "Continue to Dashboard", ar: "المتابعة إلى لوحة التحكم" },
  "verify.tips": { en: "Tips for a clear photo", ar: "نصائح لصورة واضحة" },
  "verify.tip1": { en: "Good lighting, no shadows", ar: "إضاءة جيدة، بدون ظلال" },
  "verify.tip2": { en: "All corners visible", ar: "جميع الزوايا واضحة" },
  "verify.tip3": { en: "No blur or glare", ar: "بدون ضبابية أو انعكاس" },

  // Home
  "home.greeting": { en: "Good morning", ar: "صباح الخير" },
  "home.search": { en: "What service do you need?", ar: "ما الخدمة التي تحتاجها؟" },
  "home.search.worker": { en: "Search for jobs...", ar: "ابحث عن عمل..." },
  "home.services": { en: "Our Services", ar: "خدماتنا" },
  "home.viewAll": { en: "View all", ar: "عرض الكل" },
  "home.available.jobs": { en: "Available Jobs", ar: "الوظائف المتاحة" },
  "home.promo.new": { en: "New", ar: "جديد" },
  "home.promo.title": { en: "First Booking 20% Off", ar: "خصم 20% على أول حجز" },
  "home.promo.desc": { en: "Use code ALEX20 for your first service", ar: "استخدم الكود ALEX20 لأول خدمة" },
  "home.popular": { en: "Popular Now", ar: "الأكثر طلباً" },

  // Services
  "service.cleaning": { en: "Cleaning Services", ar: "خدمات التنظيف" },
  "service.cleaning.desc": { en: "Homes, offices & more", ar: "منازل، مكاتب والمزيد" },
  "service.petcare": { en: "Pet Care", ar: "رعاية الحيوانات" },
  "service.petcare.desc": { en: "Grooming, sitting & walks", ar: "تجميل، رعاية وتمشية" },
  "service.home": { en: "Home Assistance", ar: "المساعدة المنزلية" },
  "service.home.desc": { en: "Repairs & maintenance", ar: "إصلاحات وصيانة" },
  "service.installation": { en: "Installation & Setup", ar: "تركيب وإعداد" },
  "service.installation.desc": { en: "Electronics & appliances", ar: "أجهزة إلكترونية وكهربائية" },

  // Worker Jobs
  "jobs.posted": { en: "Posted", ar: "نُشر" },
  "jobs.ago": { en: "ago", ar: "مضت" },
  "jobs.min": { en: "min", ar: "دقيقة" },
  "jobs.hour": { en: "hour", ar: "ساعة" },
  "jobs.hours": { en: "hours", ar: "ساعات" },
  "jobs.budget": { en: "Budget", ar: "الميزانية" },
  "jobs.location": { en: "Location", ar: "الموقع" },
  "jobs.details": { en: "Job Details", ar: "تفاصيل العمل" },
  "jobs.description": { en: "Description", ar: "الوصف" },
  "jobs.requirements": { en: "Requirements", ar: "المتطلبات" },
  "jobs.date": { en: "Date & Time", ar: "التاريخ والوقت" },
  "jobs.apply": { en: "Apply for this Job", ar: "التقدم لهذا العمل" },
  "jobs.applied": { en: "Application Sent!", ar: "تم إرسال الطلب!" },
  "jobs.applied.desc": { en: "The customer will review your application and get back to you.", ar: "سيراجع العميل طلبك ويتواصل معك." },
  "jobs.backToJobs": { en: "Back to Jobs", ar: "العودة للأعمال" },
  "jobs.noJobs": { en: "No jobs available yet", ar: "لا توجد وظائف متاحة بعد" },
  "jobs.noJobs.desc": { en: "Check back later for new opportunities", ar: "تحقق لاحقاً للفرص الجديدة" },
  "jobs.confirm.title": { en: "Confirm Application", ar: "تأكيد التقديم" },
  "jobs.confirm.desc": { en: "Are you sure you want to apply for this job? The customer will be notified.", ar: "هل أنت متأكد من التقدم لهذا العمل؟ سيتم إعلام العميل." },
  "jobs.confirm.yes": { en: "Yes, Apply", ar: "نعم، تقدم" },
  "jobs.viewMap": { en: "View on Map", ar: "عرض على الخريطة" },

  // Profile
  "profile.title": { en: "Complete Your Profile", ar: "أكمل ملفك الشخصي" },
  "profile.subtitle": { en: "Help us get to know you better", ar: "ساعدنا لنعرفك أكثر" },
  "profile.subtitle.worker": { en: "This helps customers trust you", ar: "هذا يساعد العملاء على الثقة بك" },
  "profile.fullName": { en: "Full Name", ar: "الاسم الكامل" },
  "profile.fullName.placeholder": { en: "Enter your full name", ar: "أدخل اسمك الكامل" },
  "profile.phone": { en: "Phone Number", ar: "رقم الهاتف" },
  "profile.phone.placeholder": { en: "+20 xxx xxx xxxx", ar: "+20 xxx xxx xxxx" },
  "profile.email": { en: "Email Address", ar: "البريد الإلكتروني" },
  "profile.email.placeholder": { en: "your@email.com", ar: "your@email.com" },
  "profile.bio": { en: "About You (Optional)", ar: "نبذة عنك (اختياري)" },
  "profile.bio.placeholder": { en: "Tell us a bit about yourself...", ar: "أخبرنا قليلاً عن نفسك..." },
  "profile.photo": { en: "Profile Photo (Optional)", ar: "صورة الملف الشخصي (اختياري)" },
  "profile.photo.add": { en: "Add Photo", ar: "إضافة صورة" },
  "profile.photo.change": { en: "Change Photo", ar: "تغيير الصورة" },
  "profile.location": { en: "Your Location", ar: "موقعك" },
  "profile.location.select": { en: "Select on Map", ar: "اختر على الخريطة" },
  "profile.location.selected": { en: "Location Selected", ar: "تم تحديد الموقع" },
  "profile.save": { en: "Save Profile", ar: "حفظ الملف" },

  // Logout
  "logout": { en: "Logout", ar: "تسجيل الخروج" },
  "logout.confirm.title": { en: "Logout", ar: "تسجيل الخروج" },
  "logout.confirm.desc": { en: "Are you sure you want to logout?", ar: "هل أنت متأكد من تسجيل الخروج؟" },
  "logout.confirm.yes": { en: "Yes, Logout", ar: "نعم، خروج" },

  // Map
  "map.title": { en: "Select Location", ar: "اختر الموقع" },
  "map.confirm": { en: "Confirm Location", ar: "تأكيد الموقع" },
  "map.searching": { en: "Searching...", ar: "جارِ البحث..." },
  "map.search.placeholder": { en: "Search for a place...", ar: "ابحث عن مكان..." },

  // Common
  "common.back": { en: "Back", ar: "رجوع" },
  "common.continue": { en: "Continue", ar: "متابعة" },
  "common.cancel": { en: "Cancel", ar: "إلغاء" },
  "common.language": { en: "العربية", ar: "English" },
} as const

type TranslationKey = keyof typeof translations

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey) => string
  dir: "ltr" | "rtl"
}

const I18nContext = createContext<I18nContextType | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en")

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[key]?.[locale] ?? key
    },
    [locale]
  )

  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, dir }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error("useI18n must be used within I18nProvider")
  return ctx
}
