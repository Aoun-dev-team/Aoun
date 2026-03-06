"use client"

import { useI18n } from "@/lib/i18n"
import { WaveDecoration } from "@/components/wave-decoration"
import { Briefcase, Users, Globe } from "lucide-react"

export function RoleSelectionScreen({
  onSelectRole,
}: {
  onSelectRole: (role: "customer" | "worker") => void
}) {
  const { t, locale, setLocale, dir } = useI18n()

  return (
    <div className="flex min-h-full flex-col" dir={dir}>
      {/* Header */}
      <div className="relative bg-primary px-6 pb-16 pt-6">
        {/* Language Toggle */}
        <div className={`flex ${dir === "rtl" ? "justify-start" : "justify-end"}`}>
          <button
            onClick={() => setLocale(locale === "en" ? "ar" : "en")}
            className="flex items-center gap-1.5 rounded-full bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-foreground/20"
          >
            <Globe className="h-3.5 w-3.5" />
            {t("common.language")}
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-3 text-center">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-secondary shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/awn-logo.jpg"
              alt="Awn logo"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground">
              {t("app.name")}
            </h1>
            <p className="mt-1 text-sm text-primary-foreground/70">
              {t("app.tagline")}
            </p>
          </div>
        </div>
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-10 w-full" />
      </div>

      {/* Role Selection */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-8">
        <h2 className="text-center text-xl font-bold text-foreground">
          {t("role.title")}
        </h2>

        <div className="mt-8 flex flex-col gap-4">
          {/* Customer Card */}
          <button
            onClick={() => onSelectRole("customer")}
            className="group flex items-center gap-4 rounded-2xl border-2 border-transparent bg-card p-5 shadow-sm transition-all hover:border-primary hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-[#2980B9]">
              <Users className="h-8 w-8 text-primary-foreground" />
            </div>
            <div className={`flex-1 ${dir === "rtl" ? "text-right" : "text-left"}`}>
              <h3 className="text-lg font-bold text-foreground">
                {t("role.customer")}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t("role.customer.desc")}
              </p>
            </div>
          </button>

          {/* Worker Card */}
          <button
            onClick={() => onSelectRole("worker")}
            className="group flex items-center gap-4 rounded-2xl border-2 border-transparent bg-card p-5 shadow-sm transition-all hover:border-secondary hover:shadow-md active:scale-[0.98]"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary to-[#E8C65A]">
              <Briefcase className="h-8 w-8 text-secondary-foreground" />
            </div>
            <div className={`flex-1 ${dir === "rtl" ? "text-right" : "text-left"}`}>
              <h3 className="text-lg font-bold text-foreground">
                {t("role.worker")}
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {t("role.worker.desc")}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
