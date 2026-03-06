"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { WaveDecoration } from "@/components/wave-decoration"
import { useI18n } from "@/lib/i18n"
import {
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react"

type AuthMode = "phone" | "email"

export function LoginScreen({
  onSendOTP,
  onEmailLogin,
  onBack,
  role = "customer",
}: {
  onSendOTP: (phone: string) => void
  onEmailLogin: () => void
  onBack?: () => void
  role?: "customer" | "worker"
}) {
  const { t, locale, dir } = useI18n()
  const [authMode, setAuthMode] = useState<AuthMode>("phone")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex min-h-full flex-col" dir={dir}>
      {/* Hero Section */}
      <div className="relative bg-primary px-6 pb-12 pt-6">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className={`absolute top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10 text-primary-foreground ${dir === "rtl" ? "right-4" : "left-4"}`}
            aria-label={t("common.back")}
          >
            {dir === "rtl" ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
          </button>
        )}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-secondary shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/awn-logo.jpg"
              alt="Awn logo"
              className="h-full w-full object-cover"
            />
          </div>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-primary-foreground">
            {t("app.name")}
          </h1>
          <p className="text-sm text-primary-foreground/70">
            {t("app.tagline")}
          </p>
        </div>
        <WaveDecoration className="absolute bottom-0 left-0 right-0 h-8 w-full" />
      </div>

      {/* Auth Form */}
      <div className="flex flex-1 flex-col px-6 pt-6 pb-4">
        <h2 className="text-xl font-bold text-foreground">{t("login.welcome")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {role === "worker" ? t("login.subtitle.worker") : t("login.subtitle")}
        </p>

        {/* Toggle Auth Mode */}
        <div className="mt-5 flex gap-2 rounded-xl bg-muted p-1">
          <button
            onClick={() => setAuthMode("phone")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              authMode === "phone"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Phone className="h-4 w-4" />
            {t("login.phone")}
          </button>
          <button
            onClick={() => setAuthMode("email")}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
              authMode === "email"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground"
            }`}
          >
            <Mail className="h-4 w-4" />
            {t("login.email")}
          </button>
        </div>

        {authMode === "phone" ? (
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="phone" className="text-sm font-medium text-foreground">
                {t("login.phoneNumber")}
              </Label>
              <div className="flex gap-2">
                <div className="flex h-11 items-center justify-center rounded-lg border border-input bg-muted px-3 text-sm font-medium text-foreground">
                  +20
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="1XX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11 flex-1 rounded-lg border-input bg-card text-foreground placeholder:text-muted-foreground"
                />
              </div>
            </div>
            <Button
              onClick={() => onSendOTP(phone)}
              disabled={phone.length < 10}
              className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {t("login.sendOtp")}
              {dir === "rtl" ? <ArrowLeft className="ms-2 h-4 w-4" /> : <ArrowRight className="ms-2 h-4 w-4" />}
            </Button>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("login.emailAddress")}
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-lg border-input bg-card text-foreground placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm font-medium text-foreground">
                {t("login.password")}
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-lg border-input bg-card pr-10 text-foreground placeholder:text-muted-foreground"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              onClick={onEmailLogin}
              disabled={!email || !password}
              className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {t("login.signIn")}
              {dir === "rtl" ? <ArrowLeft className="ms-2 h-4 w-4" /> : <ArrowRight className="ms-2 h-4 w-4" />}
            </Button>
          </div>
        )}

        {/* Divider */}
        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-border" />
          <span className="text-xs text-muted-foreground">{t("login.orContinue")}</span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Google Sign In */}
        <Button
          variant="outline"
          className="mt-4 h-12 w-full rounded-xl border-input bg-card text-foreground hover:bg-muted"
        >
          <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          {t("login.google")}
        </Button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {`${t("login.terms")} `}
          <span className="font-medium text-primary underline">{t("login.termsLink")}</span>
          {` ${t("login.and")} `}
          <span className="font-medium text-primary underline">{t("login.privacyLink")}</span>
        </p>
      </div>
    </div>
  )
}
