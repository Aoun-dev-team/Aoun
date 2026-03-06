"use client"

import { useState } from "react"
import { I18nProvider } from "@/lib/i18n"
import { PhoneFrame } from "@/components/phone-frame"
import { RoleSelectionScreen } from "@/components/role-selection-screen"
import { LoginScreen } from "@/components/login-screen"
import { OTPScreen } from "@/components/otp-screen"
import { ProfileSetupScreen } from "@/components/profile-setup-screen"

import { HomeScreen } from "@/components/home-screen"
import { PlaceCleaningScreen } from "@/components/place-cleaning-screen"
import { WorkerVerificationScreen } from "@/components/worker-verification-screen"
import { WorkerHomeScreen } from "@/components/worker-home-screen"
import { WorkerJobListScreen } from "@/components/worker-job-list-screen"
import { WorkerJobDetailScreen } from "@/components/worker-job-detail-screen"
import type { JobPost } from "@/components/worker-job-list-screen"

type Screen =
  | "role-select"
  | "login"
  | "otp"
  | "profile-setup"
  | "home"
  | "cleaning"
  | "worker-verify"
  | "worker-home"
  | "worker-jobs"
  | "worker-job-detail"

export default function Page() {
  const [screen, setScreen] = useState<Screen>("role-select")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState<"customer" | "worker">("customer")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedJob, setSelectedJob] = useState<JobPost | null>(null)
  const [isNewUser] = useState(true) // For demo, always treat as new user

  const handleLogout = () => {
    setScreen("role-select")
    setRole("customer")
    setPhone("")
    setSelectedCategory("")
    setSelectedJob(null)
  }

  return (
    <I18nProvider>
      <PhoneFrame>
        {/* Role Selection */}
        {screen === "role-select" && (
          <RoleSelectionScreen
            onSelectRole={(r) => {
              setRole(r)
              setScreen("login")
            }}
          />
        )}

        {/* Login */}
        {screen === "login" && (
          <LoginScreen
            role={role}
            onBack={() => setScreen("role-select")}
            onSendOTP={(p) => {
              setPhone(p)
              setScreen("otp")
            }}
            onEmailLogin={() => {
              if (isNewUser) {
                setScreen("profile-setup")
              } else if (role === "worker") {
                setScreen("worker-verify")
              } else {
                setScreen("home")
              }
            }}
          />
        )}

        {/* OTP */}
        {screen === "otp" && (
          <OTPScreen
            phone={phone}
            onVerify={() => {
              if (isNewUser) {
                setScreen("profile-setup")
              } else if (role === "worker") {
                setScreen("worker-verify")
              } else {
                setScreen("home")
              }
            }}
            onBack={() => setScreen("login")}
          />
        )}

        {/* Profile Setup (for new users) */}
        {screen === "profile-setup" && (
          <ProfileSetupScreen
            role={role}
            onComplete={() => {
              if (role === "worker") {
                setScreen("worker-verify")
              } else {
                setScreen("home")
              }
            }}
            onBack={() => setScreen("login")}
          />
        )}

        {/* ===== CUSTOMER FLOW ===== */}
        {screen === "home" && (
          <HomeScreen
            onSelectCategory={(id) => {
              if (id === "cleaning") {
                setScreen("cleaning")
              }
            }}
            onLogout={handleLogout}
          />
        )}

        {screen === "cleaning" && (
          <PlaceCleaningScreen onBack={() => setScreen("home")} />
        )}

        {/* ===== WORKER FLOW ===== */}
        {screen === "worker-verify" && (
          <WorkerVerificationScreen
            onComplete={() => setScreen("worker-home")}
            onBack={() => setScreen("login")}
          />
        )}

        {screen === "worker-home" && (
          <WorkerHomeScreen
            onSelectCategory={(id) => {
              setSelectedCategory(id)
              setScreen("worker-jobs")
            }}
            onLogout={handleLogout}
          />
        )}

        {screen === "worker-jobs" && (
          <WorkerJobListScreen
            categoryId={selectedCategory}
            onSelectJob={(job) => {
              setSelectedJob(job)
              setScreen("worker-job-detail")
            }}
            onBack={() => setScreen("worker-home")}
          />
        )}

        {screen === "worker-job-detail" && selectedJob && (
          <WorkerJobDetailScreen
            job={selectedJob}
            onBack={() => setScreen("worker-jobs")}
            onBackToHome={() => setScreen("worker-home")}
          />
        )}
      </PhoneFrame>
    </I18nProvider>
  )
}
