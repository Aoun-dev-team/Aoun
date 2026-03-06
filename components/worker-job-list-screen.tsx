"use client"

import { useI18n } from "@/lib/i18n"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  DollarSign,
  Home,
  Building2,
  Briefcase,
  Store,
  LandPlot,
} from "lucide-react"

export interface JobPost {
  id: string
  customerName: string
  customerNameAr: string
  title: string
  titleAr: string
  description: string
  descriptionAr: string
  placeType: string
  placeTypeAr: string
  budget: string
  budgetAr: string
  location: string
  locationAr: string
  postedAgo: string
  postedAgoAr: string
  date: string
  dateAr: string
  time: string
  rooms: number
  bathrooms: number
  requirements: string[]
  requirementsAr: string[]
}

const MOCK_JOBS: Record<string, JobPost[]> = {
  cleaning: [
    {
      id: "c1",
      customerName: "Sara Ahmed",
      customerNameAr: "سارة أحمد",
      title: "Deep Cleaning - 3BR Apartment",
      titleAr: "تنظيف عميق - شقة ٣ غرف",
      description: "Need a thorough deep cleaning for my apartment before a family gathering. All rooms, bathrooms, kitchen, and balcony need attention. I have some cleaning supplies available.",
      descriptionAr: "أحتاج تنظيف عميق وشامل لشقتي قبل تجمع عائلي. جميع الغرف والحمامات والمطبخ والبلكونة تحتاج اهتمام. لدي بعض أدوات التنظيف.",
      placeType: "Apartment",
      placeTypeAr: "شقة",
      budget: "450 EGP",
      budgetAr: "٤٥٠ ج.م",
      location: "Smouha, Alexandria",
      locationAr: "سموحة، الإسكندرية",
      postedAgo: "15 min ago",
      postedAgoAr: "منذ ١٥ دقيقة",
      date: "March 3, 2026",
      dateAr: "٣ مارس ٢٠٢٦",
      time: "10:00 AM",
      rooms: 3,
      bathrooms: 2,
      requirements: ["Cleaning supplies provided", "Non-smoking", "Bring mop & vacuum"],
      requirementsAr: ["أدوات التنظيف متوفرة", "غير مدخن", "إحضار ممسحة ومكنسة كهربائية"],
    },
    {
      id: "c2",
      customerName: "Omar Hassan",
      customerNameAr: "عمر حسن",
      title: "Post-Construction Cleaning",
      titleAr: "تنظيف بعد البناء",
      description: "Just finished renovating my villa. Need professional cleaning to remove all dust, debris, and paint spots. Two floors plus rooftop area.",
      descriptionAr: "انتهيت من تجديد فيلتي. أحتاج تنظيف احترافي لإزالة كل الغبار والأنقاض وبقع الطلاء. طابقين بالإضافة للسطح.",
      placeType: "Villa",
      placeTypeAr: "فيلا",
      budget: "800 EGP",
      budgetAr: "٨٠٠ ج.م",
      location: "Mandara, Alexandria",
      locationAr: "المندرة، الإسكندرية",
      postedAgo: "1 hour ago",
      postedAgoAr: "منذ ساعة",
      date: "March 5, 2026",
      dateAr: "٥ مارس ٢٠٢٦",
      time: "9:00 AM",
      rooms: 5,
      bathrooms: 3,
      requirements: ["Must bring own equipment", "Experience with post-construction", "Full day job"],
      requirementsAr: ["يجب إحضار المعدات", "خبرة في تنظيف ما بعد البناء", "عمل يوم كامل"],
    },
    {
      id: "c3",
      customerName: "Nour El-Din",
      customerNameAr: "نور الدين",
      title: "Office Weekly Cleaning",
      titleAr: "تنظيف مكتب أسبوعي",
      description: "Looking for someone to do weekly office cleaning. Small office with 3 rooms and a reception area. Every Sunday morning.",
      descriptionAr: "أبحث عن شخص للتنظيف الأسبوعي للمكتب. مكتب صغير من ٣ غرف ومنطقة استقبال. كل يوم أحد صباحاً.",
      placeType: "Office",
      placeTypeAr: "مكتب",
      budget: "250 EGP",
      budgetAr: "٢٥٠ ج.م",
      location: "Sidi Gaber, Alexandria",
      locationAr: "سيدي جابر، الإسكندرية",
      postedAgo: "3 hours ago",
      postedAgoAr: "منذ ٣ ساعات",
      date: "Every Sunday",
      dateAr: "كل يوم أحد",
      time: "8:00 AM",
      rooms: 3,
      bathrooms: 1,
      requirements: ["Weekly commitment", "Cleaning supplies provided", "Punctual"],
      requirementsAr: ["التزام أسبوعي", "أدوات التنظيف متوفرة", "الالتزام بالمواعيد"],
    },
  ],
  "pet-care": [
    {
      id: "p1",
      customerName: "Layla Mostafa",
      customerNameAr: "ليلى مصطفى",
      title: "Cat Sitting for Weekend",
      titleAr: "رعاية قطة لعطلة نهاية الأسبوع",
      description: "Need someone to take care of my 2 cats while I'm traveling for the weekend. Feed them, clean litter, and play with them.",
      descriptionAr: "أحتاج شخصاً لرعاية قططي الاثنتين أثناء سفري في عطلة نهاية الأسبوع. إطعامهما، تنظيف صندوق الرمل، واللعب معهما.",
      placeType: "Apartment",
      placeTypeAr: "شقة",
      budget: "200 EGP",
      budgetAr: "٢٠٠ ج.م",
      location: "Stanley, Alexandria",
      locationAr: "ستانلي، الإسكندرية",
      postedAgo: "30 min ago",
      postedAgoAr: "منذ ٣٠ دقيقة",
      date: "March 7-8, 2026",
      dateAr: "٧-٨ مارس ٢٠٢٦",
      time: "Morning & Evening",
      rooms: 0,
      bathrooms: 0,
      requirements: ["Experience with cats", "Visit twice daily", "Non-allergic"],
      requirementsAr: ["خبرة مع القطط", "زيارة مرتين يومياً", "بدون حساسية"],
    },
  ],
  "home-assistance": [
    {
      id: "h1",
      customerName: "Ahmed Kamal",
      customerNameAr: "أحمد كمال",
      title: "Kitchen Faucet Repair",
      titleAr: "إصلاح صنبور المطبخ",
      description: "Kitchen faucet is leaking badly. Need someone to fix or replace it. I already bought a new faucet.",
      descriptionAr: "صنبور المطبخ يسرب بشدة. أحتاج شخصاً لإصلاحه أو استبداله. اشتريت صنبوراً جديداً بالفعل.",
      placeType: "Apartment",
      placeTypeAr: "شقة",
      budget: "150 EGP",
      budgetAr: "١٥٠ ج.م",
      location: "Gleem, Alexandria",
      locationAr: "جليم، الإسكندرية",
      postedAgo: "45 min ago",
      postedAgoAr: "منذ ٤٥ دقيقة",
      date: "March 2, 2026",
      dateAr: "٢ مارس ٢٠٢٦",
      time: "2:00 PM",
      rooms: 0,
      bathrooms: 0,
      requirements: ["Bring plumbing tools", "Quick fix expected", "Experienced plumber"],
      requirementsAr: ["إحضار أدوات السباكة", "إصلاح سريع متوقع", "سباك ذو خبرة"],
    },
  ],
  installation: [
    {
      id: "i1",
      customerName: "Fatma Ali",
      customerNameAr: "فاطمة علي",
      title: "AC Installation - Split Unit",
      titleAr: "تركيب مكيف هواء - سبليت",
      description: "Need to install a new split AC unit in my bedroom. The unit is already purchased. Need drilling and full setup.",
      descriptionAr: "أحتاج تركيب مكيف سبليت جديد في غرفة النوم. المكيف تم شراؤه بالفعل. يحتاج ثقب وتركيب كامل.",
      placeType: "Apartment",
      placeTypeAr: "شقة",
      budget: "300 EGP",
      budgetAr: "٣٠٠ ج.م",
      location: "Sidi Gaber, Alexandria",
      locationAr: "سيدي جابر، الإسكندرية",
      postedAgo: "2 hours ago",
      postedAgoAr: "منذ ساعتين",
      date: "March 4, 2026",
      dateAr: "٤ مارس ٢٠٢٦",
      time: "11:00 AM",
      rooms: 1,
      bathrooms: 0,
      requirements: ["AC installation experience", "Bring drill & tools", "Warranty on work"],
      requirementsAr: ["خبرة في تركيب المكيفات", "إحضار مثقاب وأدوات", "ضمان على العمل"],
    },
  ],
}

const CATEGORY_TITLES: Record<string, { en: string; ar: string }> = {
  cleaning: { en: "Cleaning Jobs", ar: "وظائف التنظيف" },
  "pet-care": { en: "Pet Care Jobs", ar: "وظائف رعاية الحيوانات" },
  "home-assistance": { en: "Home Assistance Jobs", ar: "وظائف المساعدة المنزلية" },
  installation: { en: "Installation Jobs", ar: "وظائف التركيب" },
}

const PLACE_ICONS: Record<string, typeof Home> = {
  Apartment: Home,
  Villa: LandPlot,
  Office: Briefcase,
  Shop: Store,
  Building: Building2,
}

export function WorkerJobListScreen({
  categoryId,
  onSelectJob,
  onBack,
}: {
  categoryId: string
  onSelectJob: (job: JobPost) => void
  onBack: () => void
}) {
  const { t, locale, dir } = useI18n()
  const jobs = MOCK_JOBS[categoryId] || []
  const categoryTitle = CATEGORY_TITLES[categoryId]

  return (
    <div className="flex min-h-full flex-col pb-6" dir={dir}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background px-6 pb-3 pt-4">
        <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground"
            aria-label={t("common.back")}
          >
            {dir === "rtl" ? (
              <ArrowRight className="h-5 w-5" />
            ) : (
              <ArrowLeft className="h-5 w-5" />
            )}
          </button>
          <div className="flex-1">
            <h2 className="text-base font-bold text-foreground">
              {locale === "ar" ? categoryTitle?.ar : categoryTitle?.en}
            </h2>
            <p className="text-xs text-muted-foreground">
              {locale === "ar"
                ? `${jobs.length} وظيفة متاحة`
                : `${jobs.length} jobs available`}
            </p>
          </div>
        </div>
      </div>

      {/* Job List */}
      <div className="mt-2 flex flex-col gap-3 px-6">
        {jobs.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-16">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Briefcase className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold text-foreground">{t("jobs.noJobs")}</h3>
            <p className="text-sm text-muted-foreground">{t("jobs.noJobs.desc")}</p>
          </div>
        ) : (
          jobs.map((job) => {
            const PlaceIcon = PLACE_ICONS[job.placeType] || Home
            return (
              <button
                key={job.id}
                onClick={() => onSelectJob(job)}
                className="flex flex-col gap-3 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.99]"
              >
                {/* Top Row: Customer + Time */}
                <div className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {(locale === "ar" ? job.customerNameAr : job.customerName)
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {locale === "ar" ? job.customerNameAr : job.customerName}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-muted-foreground ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <Clock className="h-3 w-3" />
                    <span className="text-xs">
                      {locale === "ar" ? job.postedAgoAr : job.postedAgo}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className={`text-sm font-bold text-foreground ${dir === "rtl" ? "text-right" : "text-left"}`}>
                  {locale === "ar" ? job.titleAr : job.title}
                </h4>

                {/* Meta */}
                <div className={`flex flex-wrap items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                  <div className={`flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <DollarSign className="h-3.5 w-3.5 text-secondary" />
                    <span className="text-xs font-bold text-secondary">
                      {locale === "ar" ? job.budgetAr : job.budget}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {locale === "ar" ? job.locationAr : job.location}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                    <PlaceIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {locale === "ar" ? job.placeTypeAr : job.placeType}
                    </span>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
