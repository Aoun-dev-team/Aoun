"use client"

import { useState } from "react"
import { WaveDecoration } from "@/components/wave-decoration"
import { useI18n } from "@/lib/i18n"
import {
  Sparkles,
  PawPrint,
  Wrench,
  Monitor,
  MapPin,
  Search,
  Bell,
  Globe,
  Briefcase,
  LogOut,
  X,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const services = [
  {
    id: "cleaning",
    titleKey: "service.cleaning" as const,
    descKey: "service.cleaning.desc" as const,
    icon: Sparkles,
    pattern: "from-[#1B4F72] to-[#2980B9]",
    jobCount: 12,
  },
  {
    id: "pet-care",
    titleKey: "service.petcare" as const,
    descKey: "service.petcare.desc" as const,
    icon: PawPrint,
    pattern: "from-[#D4A843] to-[#E8C65A]",
    jobCount: 5,
  },
  {
    id: "home-assistance",
    titleKey: "service.home" as const,
    descKey: "service.home.desc" as const,
    icon: Wrench,
    pattern: "from-[#2980B9] to-[#5DADE2]",
    jobCount: 8,
  },
  {
    id: "installation",
    titleKey: "service.installation" as const,
    descKey: "service.installation.desc" as const,
    icon: Monitor,
    pattern: "from-[#34495E] to-[#1B4F72]",
    jobCount: 3,
  },
]

export function WorkerHomeScreen({
  onSelectCategory,
  onLogout,
}: {
  onSelectCategory: (id: string) => void
  onLogout: () => void
}) {
  const { t, locale, setLocale, dir } = useI18n()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  return (
    <div className="flex flex-col pb-6" dir={dir}>
      {/* Header */}
      <div className="relative bg-primary px-6 pb-14 pt-4">
        <div className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-secondary">
              <Briefcase className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div className={dir === "rtl" ? "text-right" : ""}>
              <p className="text-xs text-primary-foreground/60">{t("home.greeting")}</p>
              <h2 className="text-base font-bold text-primary-foreground">
                {locale === "ar" ? "محمد" : "Mohammed"}
              </h2>
            </div>
          </div>
          <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <button
              onClick={() => setLocale(locale === "en" ? "ar" : "en")}
              className="flex h-10 items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4 text-primary-foreground" />
              <span className="text-xs font-semibold text-primary-foreground">
                {locale === "en" ? "AR" : "EN"}
              </span>
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5 text-primary-foreground" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary" />
            </button>
            <button
              onClick={() => setShowLogoutConfirm(true)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10"
              aria-label="Logout"
            >
              <LogOut className="h-4 w-4 text-primary-foreground" />
            </button>
          </div>
        </div>

        {/* Location */}
        <div className={`mt-4 flex items-center gap-1.5 text-primary-foreground/70 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-xs">
            {locale === "ar" ? "الإسكندرية، كوبري ستانلي" : "Alexandria, Stanley Bridge"}
          </span>
        </div>

        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-10 w-full" />
      </div>

      {/* Search */}
      <div className="relative -mt-5 px-6">
        <div className="relative">
          <Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${dir === "rtl" ? "right-4" : "left-4"}`} />
          <Input
            placeholder={t("home.search.worker")}
            className={`h-12 rounded-xl border-none bg-card shadow-lg placeholder:text-muted-foreground ${dir === "rtl" ? "pr-11 text-right" : "pl-11"}`}
          />
        </div>
      </div>

      {/* Service Categories */}
      <div className="mt-6 px-6">
        <div className={`flex items-center justify-between ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <h3 className="text-lg font-bold text-foreground">{t("home.services")}</h3>
          <span className="text-xs font-medium text-primary">{t("home.viewAll")}</span>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <button
                key={service.id}
                onClick={() => onSelectCategory(service.id)}
                className="group flex flex-col items-start gap-3 rounded-2xl bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
              >
                <div className="flex w-full items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${service.pattern}`}
                  >
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-secondary px-1.5 text-xs font-bold text-secondary-foreground">
                    {service.jobCount}
                  </span>
                </div>
                <div className={dir === "rtl" ? "text-right" : "text-left"}>
                  <h4 className="text-sm font-bold leading-tight text-foreground">
                    {t(service.titleKey)}
                  </h4>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {t(service.descKey)}
                  </p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats Banner */}
      <div className="mt-6 px-6">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1B4F72] to-[#2980B9] p-5">
          <div className="relative z-10">
            <span className="inline-block rounded-full bg-secondary px-3 py-1 text-xs font-bold text-secondary-foreground">
              {t("home.promo.new")}
            </span>
            <h4 className="mt-2 text-lg font-bold text-primary-foreground">
              {t("home.available.jobs")}
            </h4>
            <p className="mt-1 text-xs text-primary-foreground/70">
              {locale === "ar"
                ? "28 وظيفة متاحة في منطقتك"
                : "28 jobs available in your area"}
            </p>
          </div>
          <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary-foreground/10" />
          <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary-foreground/5" />
        </div>
      </div>

      {/* Recent Jobs Preview */}
      <div className="mt-6 px-6">
        <h3 className="text-lg font-bold text-foreground">{t("home.popular")}</h3>
        <div className="mt-3 flex flex-col gap-3">
          {[
            {
              name: locale === "ar" ? "تنظيف شقة عميق" : "Deep Apartment Cleaning",
              price: locale === "ar" ? "٤٥٠ ج.م" : "450 EGP",
              location: locale === "ar" ? "سموحة" : "Smouha",
              time: locale === "ar" ? "منذ ١٥ دقيقة" : "15 min ago",
            },
            {
              name: locale === "ar" ? "تركيب مكيف هواء" : "AC Installation",
              price: locale === "ar" ? "٣٠٠ ج.م" : "300 EGP",
              location: locale === "ar" ? "سيدي جابر" : "Sidi Gaber",
              time: locale === "ar" ? "منذ ساعة" : "1 hour ago",
            },
          ].map((item) => (
            <div
              key={item.name}
              className={`flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm ${dir === "rtl" ? "flex-row-reverse" : ""}`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className={`flex-1 ${dir === "rtl" ? "text-right" : ""}`}>
                <h4 className="text-sm font-semibold text-foreground">{item.name}</h4>
                <p className="text-xs text-muted-foreground">{item.location}</p>
              </div>
              <div className={dir === "rtl" ? "text-left" : "text-right"}>
                <p className="text-sm font-bold text-primary">{item.price}</p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl" dir={dir}>
            <button
              onClick={() => setShowLogoutConfirm(false)}
              className={`absolute top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground ${dir === "rtl" ? "left-4" : "right-4"}`}
            >
              <X className="h-4 w-4" />
            </button>
            
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
                <LogOut className="h-8 w-8 text-red-600" />
              </div>
            </div>

            <h3 className="mt-4 text-center text-lg font-bold text-foreground">
              {t("logout.confirm.title")}
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t("logout.confirm.desc")}
            </p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="h-12 flex-1 rounded-xl border border-input bg-background text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {t("common.cancel")}
              </button>
              <button
                onClick={() => {
                  setShowLogoutConfirm(false)
                  onLogout()
                }}
                className="h-12 flex-1 rounded-xl bg-red-600 text-sm font-semibold text-white transition-colors hover:bg-red-700"
              >
                {t("logout.confirm.yes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
