"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useI18n } from "@/lib/i18n"
import type { JobPost } from "@/components/worker-job-list-screen"
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarDays,
  Clock,
  DollarSign,
  CheckCircle2,
  User,
  Home,
  Bath,
  FileText,
  Send,
  AlertCircle,
  X,
  Map,
  ExternalLink,
} from "lucide-react"

export function WorkerJobDetailScreen({
  job,
  onBack,
  onBackToHome,
}: {
  job: JobPost
  onBack: () => void
  onBackToHome: () => void
}) {
  const { t, locale, dir } = useI18n()
  const [applied, setApplied] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const customerName = locale === "ar" ? job.customerNameAr : job.customerName
  const title = locale === "ar" ? job.titleAr : job.title
  const description = locale === "ar" ? job.descriptionAr : job.description
  const placeType = locale === "ar" ? job.placeTypeAr : job.placeType
  const budget = locale === "ar" ? job.budgetAr : job.budget
  const location = locale === "ar" ? job.locationAr : job.location
  const date = locale === "ar" ? job.dateAr : job.date
  const requirements = locale === "ar" ? job.requirementsAr : job.requirements

  if (applied) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 pb-6 pt-4" dir={dir}>
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Send className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
          {t("jobs.applied")}
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
          {t("jobs.applied.desc")}
        </p>

        {/* Job Summary */}
        <div className="mt-6 w-full rounded-xl bg-card p-4 shadow-sm">
          <h4 className={`text-sm font-bold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
            {title}
          </h4>
          <div className={`mt-2 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <DollarSign className="h-4 w-4 text-secondary" />
            <span className="text-sm font-bold text-secondary">{budget}</span>
          </div>
        </div>

        <Button
          onClick={onBackToHome}
          className="mt-8 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {t("jobs.backToJobs")}
        </Button>
      </div>
    )
  }

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
            <h2 className="text-base font-bold text-foreground">{t("jobs.details")}</h2>
          </div>
        </div>
      </div>

      <div className="flex-1 px-6">
        {/* Customer Info */}
        <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
            {customerName
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className={dir === "rtl" ? "text-right" : ""}>
            <p className="text-sm font-semibold text-foreground">{customerName}</p>
            <p className="text-xs text-muted-foreground">
              {locale === "ar" ? job.postedAgoAr : job.postedAgo}
            </p>
          </div>
        </div>

        {/* Title */}
        <h3 className={`mt-4 text-xl font-bold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
          {title}
        </h3>

        {/* Budget Badge */}
        <div className={`mt-3 flex ${dir === "rtl" ? "justify-end" : "justify-start"}`}>
          <div className="flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-2">
            <DollarSign className="h-5 w-5 text-secondary" />
            <span className="text-lg font-bold text-secondary">{budget}</span>
          </div>
        </div>

        {/* Location Card with Map Preview */}
        <div className="mt-5 overflow-hidden rounded-xl bg-card shadow-sm">
          <div className="relative h-32 bg-muted/30">
            {/* Simulated map */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(27, 79, 114, 0.08) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(27, 79, 114, 0.08) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <MapPin className="h-8 w-8 text-primary drop-shadow-md" fill="currentColor" />
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ", Alexandria, Egypt")}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute bottom-2 flex items-center gap-1.5 rounded-full bg-background/90 px-3 py-1.5 text-xs font-medium text-primary shadow-md backdrop-blur-sm ${dir === "rtl" ? "left-2" : "right-2"}`}
            >
              <Map className="h-3.5 w-3.5" />
              {t("jobs.viewMap")}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="p-3">
            <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <MapPin className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">{t("jobs.location")}</span>
            </div>
            <p className={`mt-1 text-sm font-semibold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
              {location}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1 rounded-xl bg-card p-3 shadow-sm">
            <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
              <CalendarDays className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs text-muted-foreground">{t("jobs.date")}</span>
            </div>
            <p className={`text-sm font-semibold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
              {date}
            </p>
          </div>
          {job.rooms > 0 && (
            <div className="flex flex-col gap-1 rounded-xl bg-card p-3 shadow-sm">
              <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <Home className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {locale === "ar" ? "الغرف" : "Rooms"}
                </span>
              </div>
              <p className={`text-sm font-semibold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
                {job.rooms} {locale === "ar" ? "غرف" : "rooms"}
              </p>
            </div>
          )}
          {job.bathrooms > 0 && (
            <div className="flex flex-col gap-1 rounded-xl bg-card p-3 shadow-sm">
              <div className={`flex items-center gap-1.5 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <Bath className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs text-muted-foreground">
                  {locale === "ar" ? "الحمامات" : "Bathrooms"}
                </span>
              </div>
              <p className={`text-sm font-semibold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
                {job.bathrooms} {locale === "ar" ? "حمامات" : "bathrooms"}
              </p>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mt-5">
          <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <FileText className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-bold text-foreground">{t("jobs.description")}</h4>
          </div>
          <p className={`mt-2 text-sm leading-relaxed text-muted-foreground ${dir === "rtl" ? "text-right" : ""}`}>
            {description}
          </p>
        </div>

        {/* Requirements */}
        <div className="mt-5">
          <div className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <h4 className="text-sm font-bold text-foreground">{t("jobs.requirements")}</h4>
          </div>
          <div className="mt-2 flex flex-col gap-2">
            {requirements.map((req, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 rounded-lg bg-card p-3 shadow-sm ${dir === "rtl" ? "flex-row-reverse" : ""}`}
              >
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="text-sm text-foreground">{req}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Place Type Tag */}
        <div className={`mt-5 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <User className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {locale === "ar" ? "نوع المكان:" : "Place Type:"}
          </span>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {placeType}
          </span>
        </div>

        {/* Time */}
        <div className={`mt-3 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {locale === "ar" ? "الوقت:" : "Time:"}
          </span>
          <span className="text-xs font-medium text-foreground">{job.time}</span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-6 px-6">
        <Button
          onClick={() => setShowConfirmation(true)}
          className="h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Send className="me-2 h-5 w-5" />
          {t("jobs.apply")}
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl" dir={dir}>
            {/* Close button */}
            <button
              onClick={() => setShowConfirmation(false)}
              className={`absolute top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground ${dir === "rtl" ? "left-4" : "right-4"}`}
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="mt-4 text-center text-lg font-bold text-foreground">
              {t("jobs.confirm.title")}
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              {t("jobs.confirm.desc")}
            </p>

            {/* Job Summary */}
            <div className="mt-4 rounded-xl bg-muted/50 p-3">
              <p className={`text-sm font-semibold text-foreground ${dir === "rtl" ? "text-right" : ""}`}>
                {title}
              </p>
              <div className={`mt-1 flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
                <DollarSign className="h-4 w-4 text-secondary" />
                <span className="text-sm font-bold text-secondary">{budget}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="h-12 flex-1 rounded-xl text-sm font-semibold"
              >
                {t("common.cancel")}
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false)
                  setApplied(true)
                }}
                className="h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("jobs.confirm.yes")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
