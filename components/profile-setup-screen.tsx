"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useI18n } from "@/lib/i18n"
import {
  ArrowLeft,
  ArrowRight,
  User,
  Phone,
  Mail,
  FileText,
  Camera,
} from "lucide-react"

interface ProfileData {
  fullName: string
  phone: string
  email: string
  bio: string
  photo: File | null
}

export function ProfileSetupScreen({
  role,
  onComplete,
  onBack,
}: {
  role: "customer" | "worker"
  onComplete: (data: ProfileData) => void
  onBack: () => void
}) {
  const { t, dir } = useI18n()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [fullName, setFullName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [bio, setBio] = useState("")
  const [photo, setPhoto] = useState<File | null>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setPhoto(file)
    }
  }

  const isValid = fullName.trim() && phone.trim() && email.trim()

  const handleSubmit = () => {
    if (isValid) {
      onComplete({
        fullName,
        phone,
        email,
        bio,
        photo,
      })
    }
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto" dir={dir}>
      {/* Header */}
      <div className="shrink-0 px-6 pb-4 pt-4">
        <div className={`flex items-center gap-3 ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground"
            aria-label={t("common.back")}
          >
            {dir === "rtl" ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
          </button>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-foreground">{t("profile.title")}</h2>
            <p className="text-xs text-muted-foreground">
              {role === "worker" ? t("profile.subtitle.worker") : t("profile.subtitle")}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 pb-6">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoUpload}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-primary/10"
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={URL.createObjectURL(photo)}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-10 w-10 text-primary" />
            )}
            <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Camera className="h-4 w-4" />
            </div>
          </button>
          <p className="mt-2 text-xs text-muted-foreground">
            {photo ? t("profile.photo.change") : t("profile.photo.add")}
          </p>
        </div>

        {/* Full Name */}
        <div className="mt-6">
          <Label htmlFor="fullName" className={`flex items-center gap-2 text-sm font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <User className="h-4 w-4 text-primary" />
            {t("profile.fullName")}
          </Label>
          <Input
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t("profile.fullName.placeholder")}
            className={`mt-2 h-12 rounded-xl ${dir === "rtl" ? "text-right" : ""}`}
          />
        </div>

        {/* Phone */}
        <div className="mt-4">
          <Label htmlFor="phone" className={`flex items-center gap-2 text-sm font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Phone className="h-4 w-4 text-primary" />
            {t("profile.phone")}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("profile.phone.placeholder")}
            className={`mt-2 h-12 rounded-xl ${dir === "rtl" ? "text-right" : ""}`}
            dir="ltr"
          />
        </div>

        {/* Email */}
        <div className="mt-4">
          <Label htmlFor="email" className={`flex items-center gap-2 text-sm font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <Mail className="h-4 w-4 text-primary" />
            {t("profile.email")}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("profile.email.placeholder")}
            className={`mt-2 h-12 rounded-xl ${dir === "rtl" ? "text-right" : ""}`}
            dir="ltr"
          />
        </div>

        {/* Bio */}
        <div className="mt-4">
          <Label htmlFor="bio" className={`flex items-center gap-2 text-sm font-medium ${dir === "rtl" ? "flex-row-reverse" : ""}`}>
            <FileText className="h-4 w-4 text-primary" />
            {t("profile.bio")}
          </Label>
          <Textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder={t("profile.bio.placeholder")}
            className={`mt-2 min-h-24 rounded-xl resize-none ${dir === "rtl" ? "text-right" : ""}`}
          />
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="mt-6 h-14 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {t("profile.save")}
        </Button>
      </div>
    </div>
  )
}
