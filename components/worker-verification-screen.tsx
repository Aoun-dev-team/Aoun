"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useI18n } from "@/lib/i18n"
import {
  ArrowLeft,
  ArrowRight,
  Camera,
  CreditCard,
  UserCheck,
  CheckCircle2,
  RefreshCw,
  Shield,
  Sun,
  Maximize2,
  EyeOff,
} from "lucide-react"

type VerificationStep = 0 | 1 | 2

interface VerificationState {
  idFront: File | null
  idBack: File | null
  selfieWithId: File | null
}

const STEP_ICONS = [CreditCard, CreditCard, UserCheck]

function VerificationTips({ t, dir }: { t: (key: any) => string; dir: string }) {
  const tips = [
    { icon: Sun, text: t("verify.tip1") },
    { icon: Maximize2, text: t("verify.tip2") },
    { icon: EyeOff, text: t("verify.tip3") },
  ]

  return (
    <div className="rounded-xl bg-primary/5 p-4">
      <p className="text-xs font-bold text-primary">{t("verify.tips")}</p>
      <div className="mt-2 flex flex-col gap-2">
        {tips.map((tip, i) => {
          const Icon = tip.icon
          return (
            <div key={i} className={`flex items-center gap-2 ${dir === "rtl" ? "flex-row-reverse text-right" : ""}`}>
              <Icon className="h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="text-xs text-muted-foreground">{tip.text}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function UploadArea({
  file,
  onUpload,
  onRetake,
  stepIcon,
  title,
  description,
  isSelfie = false,
  t,
}: {
  file: File | null
  onUpload: (f: File) => void
  onRetake: () => void
  stepIcon: typeof CreditCard
  title: string
  description: string
  isSelfie?: boolean
  t: (key: any) => string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const Icon = stepIcon

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <Icon className="h-8 w-8 text-primary" />
        </div>
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {file ? (
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary bg-card shadow-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={URL.createObjectURL(file)}
            alt={title}
            className={`w-full object-cover ${isSelfie ? "aspect-[4/3] max-h-40" : "aspect-[16/10]"}`}
          />
          <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-foreground/60 to-transparent p-4">
            <button
              onClick={onRetake}
              className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm font-medium text-foreground shadow-lg"
            >
              <RefreshCw className="h-4 w-4" />
              {t("verify.retake")}
            </button>
          </div>
          <div className="absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <CheckCircle2 className="h-5 w-5 text-primary-foreground" />
          </div>
        </div>
      ) : (
        <button
          onClick={() => inputRef.current?.click()}
          className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-input bg-card transition-colors hover:border-primary hover:bg-primary/5"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Camera className="h-7 w-7 text-primary" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {t("verify.upload")}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        capture={isSelfie ? "user" : "environment"}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onUpload(file)
          if (inputRef.current) inputRef.current.value = ""
        }}
        className="hidden"
      />
    </div>
  )
}

export function WorkerVerificationScreen({
  onComplete,
  onBack,
}: {
  onComplete: () => void
  onBack: () => void
}) {
  const { t, dir } = useI18n()
  const [step, setStep] = useState<VerificationStep>(0)
  const [state, setState] = useState<VerificationState>({
    idFront: null,
    idBack: null,
    selfieWithId: null,
  })
  const [submitted, setSubmitted] = useState(false)

  const stepTitles = [
    t("verify.step1.title"),
    t("verify.step2.title"),
    t("verify.step3.title"),
  ]

  const stepDescs = [
    t("verify.step1.desc"),
    t("verify.step2.desc"),
    t("verify.step3.desc"),
  ]

  const fileKeys: (keyof VerificationState)[] = [
    "idFront",
    "idBack",
    "selfieWithId",
  ]

  const currentFile = state[fileKeys[step]]
  const canProceed = currentFile !== null

  if (submitted) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 pb-6 pt-4" dir={dir}>
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
          <Shield className="h-12 w-12 text-primary" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
          {t("verify.success.title")}
        </h2>
        <p className="mt-3 text-center text-sm leading-relaxed text-muted-foreground">
          {t("verify.success.desc")}
        </p>

        {/* Document Preview */}
        <div className="mt-6 flex gap-3">
          {[state.idFront, state.idBack, state.selfieWithId].map(
            (file, i) =>
              file && (
                <div key={i} className="h-16 w-16 overflow-hidden rounded-xl border border-border">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Document ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              )
          )}
        </div>

        <Button
          onClick={onComplete}
          className="mt-8 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {t("verify.continue")}
        </Button>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto px-6 pb-6 pt-4" dir={dir}>
      {/* Header */}
      <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
        <button
          onClick={() => (step > 0 ? setStep((step - 1) as VerificationStep) : onBack())}
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
          <h2 className="text-base font-bold text-foreground">{t("verify.title")}</h2>
          <p className="text-xs text-muted-foreground">{t("verify.subtitle")}</p>
        </div>
      </div>

      {/* Step Indicators */}
      <div className="mt-4 flex items-center gap-2">
        {[0, 1, 2].map((s) => (
          <div
            key={s}
            className={`flex h-2 flex-1 rounded-full transition-colors ${
              s <= step ? "bg-primary" : "bg-muted"
            }`}
          />
        ))}
      </div>

      {/* Progress Text */}
      <p className="mt-2 text-xs text-muted-foreground">
        {`${step + 1} / 3`}
      </p>

      {/* Upload Area */}
      <div className="mt-5 flex-1">
        <UploadArea
          key={step}
          file={currentFile}
          onUpload={(f) =>
            setState((prev) => ({ ...prev, [fileKeys[step]]: f }))
          }
          onRetake={() =>
            setState((prev) => ({ ...prev, [fileKeys[step]]: null }))
          }
          stepIcon={STEP_ICONS[step]}
          title={stepTitles[step]}
          description={stepDescs[step]}
          isSelfie={step === 2}
          t={t}
        />

        {/* Tips */}
        <div className="mt-5">
          <VerificationTips t={t} dir={dir} />
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 shrink-0 bg-background pb-2 pt-4">
        <Button
          onClick={() => {
            if (step < 2) setStep((step + 1) as VerificationStep)
            else setSubmitted(true)
          }}
          disabled={!canProceed}
          className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {step < 2 ? (
            <>
              {t("verify.next")}
              {dir === "rtl" ? (
                <ArrowLeft className="ms-2 h-4 w-4" />
              ) : (
                <ArrowRight className="ms-2 h-4 w-4" />
              )}
            </>
          ) : (
            t("verify.submit")
          )}
        </Button>
      </div>
    </div>
  )
}
