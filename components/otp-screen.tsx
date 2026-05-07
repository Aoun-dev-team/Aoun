"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { useI18n } from "@/lib/i18n"
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react"

export function OTPScreen({
  phone,
  onVerify,
  onBack,
}: {
  phone: string
  onVerify: () => void
  onBack: () => void
}) {
  const { t, dir } = useI18n()
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    if (timer <= 0) {
      setCanResend(true)
      return
    }
    const interval = setInterval(() => setTimer((t) => t - 1), 1000)
    return () => clearInterval(interval)
  }, [timer])

  const handleResend = () => {
    setTimer(60)
    setCanResend(false)
    setOtp("")
  }

  const maskedPhone = phone
    ? `+20 ${phone.slice(0, 3)} *** ${phone.slice(-2)}`
    : "+20 1XX *** XX"

  return (
    <div className="flex min-h-full flex-col px-6 pb-6 pt-4" dir={dir}>
      {/* Header */}
      <button
        onClick={onBack}
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground"
        aria-label={t("common.back")}
      >
        {dir === "rtl" ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
      </button>

      {/* Icon */}
      <div className="mt-8 flex justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-10 w-10 text-primary" />
        </div>
      </div>

      {/* Text */}
      <h2 className="mt-6 text-center text-2xl font-bold text-foreground">
        {t("otp.title")}
      </h2>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        {`${t("otp.sent")} `}
        <span className="font-semibold text-foreground">{maskedPhone}</span>
      </p>

      {/* OTP Input */}
      <div className="mt-8 flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={(value) => setOtp(value)}
        >
          <InputOTPGroup className="gap-2">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <InputOTPSlot
                key={index}
                index={index}
                className="h-14 w-12 rounded-xl border-2 border-input bg-card text-lg font-bold text-foreground shadow-none data-[active=true]:border-primary data-[active=true]:ring-primary/20"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Timer / Resend */}
      <div className="mt-6 text-center">
        {canResend ? (
          <button
            onClick={handleResend}
            className="text-sm font-semibold text-primary"
          >
            {t("otp.resend")}
          </button>
        ) : (
          <p className="text-sm text-muted-foreground">
            {`${t("otp.resendIn")} `}
            <span className="font-semibold text-foreground">
              {`0:${timer.toString().padStart(2, "0")}`}
            </span>
          </p>
        )}
      </div>

      {/* Verify Button */}
      <div className="mt-auto pt-8">
        <Button
          onClick={onVerify}
          disabled={otp.length < 6}
          className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {t("otp.verify")}
        </Button>
      </div>
    </div>
  )
}
