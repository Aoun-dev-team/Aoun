"use client"

import { useState, useMemo, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  ArrowRight,
  Minus,
  Plus,
  Clock,
  CalendarDays,
  ImagePlus,
  X,
  CheckCircle2,
  Building2,
  Home,
  Briefcase,
  Store,
  LandPlot,
  Sparkles,
  SprayCan,
  PackageOpen,
  HardHat,
  MapPin,
  AlertCircle,
  Navigation,
  Map,
  DollarSign,
  Coins,
} from "lucide-react"
import { Input } from "@/components/ui/input"

// --- Types ---
type PlaceType = "apartment" | "villa" | "office" | "shop" | "building"
type CleaningType = "basic" | "deep" | "move" | "construction"
type AreaSize = "small" | "medium" | "large"

interface LocationDetails {
  address: string
  street: string
  building: string
  floor: string
  apartment: string
}

interface CleaningState {
  placeType: PlaceType | null
  cleaningType: CleaningType | null
  rooms: number
  bathrooms: number
  areaSize: AreaSize | null
  date: string
  time: string
  location: LocationDetails
  budget: number
  provideTools: boolean
  kitchenCleaning: boolean
  balconyCleaning: boolean
  photos: File[]
}

// --- Constants ---
const PLACE_TYPES: { id: PlaceType; label: string; icon: typeof Home }[] = [
  { id: "apartment", label: "Apartment", icon: Home },
  { id: "villa", label: "Villa", icon: LandPlot },
  { id: "office", label: "Office", icon: Briefcase },
  { id: "shop", label: "Shop", icon: Store },
  { id: "building", label: "Building", icon: Building2 },
]

const CLEANING_TYPES: { id: CleaningType; label: string; icon: typeof Sparkles; desc: string }[] = [
  { id: "basic", label: "Basic", icon: Sparkles, desc: "Regular cleaning" },
  { id: "deep", label: "Deep Clean", icon: SprayCan, desc: "Thorough cleaning" },
  { id: "move", label: "Move-in/out", icon: PackageOpen, desc: "Pre/post move" },
  { id: "construction", label: "Post-Build", icon: HardHat, desc: "After construction" },
]

const AREA_SIZES: { id: AreaSize; label: string; sqm: string }[] = [
  { id: "small", label: "Small", sqm: "< 80 m\u00B2" },
  { id: "medium", label: "Medium", sqm: "80-150 m\u00B2" },
  { id: "large", label: "Large", sqm: "> 150 m\u00B2" },
]

function estimateDuration(
  rooms: number,
  bathrooms: number,
  areaSize: AreaSize | null,
  cleaningType: CleaningType | null
): string {
  const base = cleaningType === "deep" ? 2 : cleaningType === "construction" ? 2.5 : cleaningType === "move" ? 1.5 : 1
  const roomTime = rooms * 0.5
  const bathTime = bathrooms * 0.4
  const sizeMultiplier = areaSize === "large" ? 1.3 : areaSize === "medium" ? 1 : 0.8
  const total = Math.round((base + roomTime + bathTime) * sizeMultiplier * 2) / 2
  const hours = Math.floor(total)
  const minutes = (total - hours) * 60
  if (minutes > 0) return `${hours}h ${minutes.toFixed(0)}m`
  return `${hours}h`
}

function getMinDate(): string {
  const now = new Date()
  now.setHours(now.getHours() + 2)
  return now.toISOString().split("T")[0]
}

function getMinTime(selectedDate: string): string {
  const now = new Date()
  const today = now.toISOString().split("T")[0]
  if (selectedDate === today) {
    now.setHours(now.getHours() + 2)
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
  }
  return "06:00"
}

// --- Numeric Stepper ---
function NumericStepper({
  label,
  value,
  onChange,
  min = 1,
  max = 20,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  min?: number
  max?: number
}) {
  return (
    <div className="flex items-center justify-between rounded-xl bg-card p-4 shadow-sm">
      <span className="text-sm font-medium text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-foreground transition-colors disabled:opacity-30"
          aria-label={`Decrease ${label}`}
        >
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-8 text-center text-lg font-bold text-foreground">{value}</span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-colors disabled:opacity-30"
          aria-label={`Increase ${label}`}
        >
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

// --- Step Components ---
function Step1({
  state,
  onChange,
}: {
  state: CleaningState
  onChange: (s: Partial<CleaningState>) => void
}) {
  return (
    <div className="flex flex-col gap-5">
      {/* Place Type */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Place Type</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Select the type of place</p>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {PLACE_TYPES.map((pt) => {
            const Icon = pt.icon
            const isSelected = state.placeType === pt.id
            return (
              <button
                key={pt.id}
                onClick={() => onChange({ placeType: pt.id })}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 p-3 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-card shadow-sm"
                }`}
              >
                <Icon
                  className={`h-6 w-6 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                />
                <span
                  className={`text-xs font-medium ${isSelected ? "text-primary" : "text-foreground"}`}
                >
                  {pt.label}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Cleaning Type */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Cleaning Type</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">Choose the level of cleaning</p>
        <div className="mt-3 flex flex-col gap-2">
          {CLEANING_TYPES.map((ct) => {
            const Icon = ct.icon
            const isSelected = state.cleaningType === ct.id
            return (
              <button
                key={ct.id}
                onClick={() => onChange({ cleaningType: ct.id })}
                className={`flex items-center gap-3 rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-card shadow-sm"
                }`}
              >
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    isSelected ? "bg-primary" : "bg-muted"
                  }`}
                >
                  <Icon
                    className={`h-5 w-5 ${isSelected ? "text-primary-foreground" : "text-muted-foreground"}`}
                  />
                </div>
                <div className="text-left">
                  <p
                    className={`text-sm font-semibold ${isSelected ? "text-primary" : "text-foreground"}`}
                  >
                    {ct.label}
                  </p>
                  <p className="text-xs text-muted-foreground">{ct.desc}</p>
                </div>
                {isSelected && (
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-primary" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function Step2({
  state,
  onChange,
}: {
  state: CleaningState
  onChange: (s: Partial<CleaningState>) => void
}) {
  const duration = useMemo(
    () => estimateDuration(state.rooms, state.bathrooms, state.areaSize, state.cleaningType),
    [state.rooms, state.bathrooms, state.areaSize, state.cleaningType]
  )

  return (
    <div className="flex flex-col gap-5">
      {/* Estimated Duration Banner */}
      <div className="flex items-center gap-3 rounded-xl bg-primary/10 p-4">
        <Clock className="h-5 w-5 shrink-0 text-primary" />
        <div>
          <p className="text-xs text-muted-foreground">Estimated Duration</p>
          <p className="text-lg font-bold text-primary">{duration}</p>
        </div>
      </div>

      {/* Rooms and Bathrooms */}
      <div className="flex flex-col gap-3">
        <NumericStepper
          label="Rooms"
          value={state.rooms}
          onChange={(v) => onChange({ rooms: v })}
          min={1}
        />
        <NumericStepper
          label="Bathrooms"
          value={state.bathrooms}
          onChange={(v) => onChange({ bathrooms: v })}
          min={1}
        />
      </div>

      {/* Area Size */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Area Size</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {AREA_SIZES.map((as) => {
            const isSelected = state.areaSize === as.id
            return (
              <button
                key={as.id}
                onClick={() => onChange({ areaSize: as.id })}
                className={`flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all ${
                  isSelected
                    ? "border-primary bg-primary/5"
                    : "border-transparent bg-card shadow-sm"
                }`}
              >
                <span
                  className={`text-sm font-bold ${isSelected ? "text-primary" : "text-foreground"}`}
                >
                  {as.label}
                </span>
                <span className="text-xs text-muted-foreground">{as.sqm}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Budget constants (will be calculated by backend later)
const MIN_BUDGET = 200
const BEST_BUDGET = 350
const MAX_BUDGET = 800

function Step3({
  state,
  onChange,
}: {
  state: CleaningState
  onChange: (s: Partial<CleaningState>) => void
}) {
  const [showLocationOptions, setShowLocationOptions] = useState(false)
  const [locationMethod, setLocationMethod] = useState<"current" | "map" | null>(null)
  const [isLocating, setIsLocating] = useState(false)

  const handleCurrentLocation = () => {
    setIsLocating(true)
    // Simulate getting current location
    setTimeout(() => {
      onChange({
        location: {
          ...state.location,
          address: "Stanley Bridge, Gleem, Alexandria",
        },
      })
      setLocationMethod("current")
      setShowLocationOptions(false)
      setIsLocating(false)
    }, 1500)
  }

  const handleChooseMap = () => {
    // Simulate choosing from map
    onChange({
      location: {
        ...state.location,
        address: "Corniche Road, Sidi Gaber, Alexandria",
      },
    })
    setLocationMethod("map")
    setShowLocationOptions(false)
  }

  const updateLocationDetail = (key: keyof LocationDetails, value: string) => {
    onChange({
      location: { ...state.location, [key]: value },
    })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Date Picker */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Select Date</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Minimum 2 hours from now
        </p>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <CalendarDays className="h-5 w-5 shrink-0 text-primary" />
          <input
            type="date"
            min={getMinDate()}
            value={state.date}
            onChange={(e) => onChange({ date: e.target.value, time: "" })}
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none"
          />
        </div>
      </div>

      {/* Time Picker - Native time input */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Select Time</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          24-hour format (e.g., 14:30 = 2:30 PM)
        </p>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
          <Clock className="h-5 w-5 shrink-0 text-primary" />
          <input
            type="time"
            value={state.time}
            onChange={(e) => onChange({ time: e.target.value })}
            className="flex-1 bg-transparent text-sm font-medium text-foreground outline-none [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute"
          />
          <span className="text-xs text-muted-foreground">24h</span>
        </div>
        
        {/* Time until service */}
        {state.date && state.time && (
          <div className="mt-3 rounded-lg bg-primary/10 p-3 text-center">
            <p className="text-xs text-muted-foreground">Time until service</p>
            <p className="mt-1 text-base font-bold text-primary">
              {(() => {
                const now = new Date()
                const [h, m] = state.time.split(":").map(Number)
                if (h > 23 || m > 59) return "Invalid time"
                const serviceDate = new Date(state.date)
                serviceDate.setHours(h, m, 0, 0)
                const diff = serviceDate.getTime() - now.getTime()
                if (diff <= 0) return "Time has passed"
                const days = Math.floor(diff / (1000 * 60 * 60 * 24))
                const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
                if (days > 0) return `${days}d ${hours}h ${mins}m`
                if (hours > 0) return `${hours}h ${mins}m`
                return `${mins} minutes`
              })()}
            </p>
          </div>
        )}
      </div>

      {/* Service Location */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Service Location</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Select your location
        </p>
        
        {/* Location Selector Button */}
        {!state.location.address ? (
          <button
            onClick={() => setShowLocationOptions(true)}
            className="mt-3 flex w-full items-center gap-3 rounded-xl bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
          >
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <span className="flex-1 text-left text-sm text-muted-foreground">
              Tap to select location
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </button>
        ) : (
          <div className="mt-3 space-y-3">
            {/* Selected Location */}
            <div className="flex items-start gap-3 rounded-xl bg-card p-4 shadow-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                {locationMethod === "current" ? (
                  <Navigation className="h-5 w-5 text-primary" />
                ) : (
                  <Map className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {state.location.address}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {locationMethod === "current" ? "Current Location" : "Selected from Map"}
                </p>
              </div>
              <button
                onClick={() => {
                  onChange({
                    location: { address: "", street: "", building: "", floor: "", apartment: "" },
                  })
                  setLocationMethod(null)
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Additional Location Details */}
            <div className="rounded-xl bg-card p-4 shadow-sm">
              <p className="text-xs font-medium text-muted-foreground">
                Additional Details (Optional)
              </p>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground">Street Name</label>
                  <Input
                    placeholder="e.g., El-Horreya St."
                    value={state.location.street}
                    onChange={(e) => updateLocationDetail("street", e.target.value)}
                    className="mt-1 h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Building No.</label>
                  <Input
                    placeholder="e.g., 15"
                    value={state.location.building}
                    onChange={(e) => updateLocationDetail("building", e.target.value)}
                    className="mt-1 h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Floor</label>
                  <Input
                    placeholder="e.g., 3"
                    value={state.location.floor}
                    onChange={(e) => updateLocationDetail("floor", e.target.value)}
                    className="mt-1 h-10 text-sm"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground">Apt. No.</label>
                  <Input
                    placeholder="e.g., 12"
                    value={state.location.apartment}
                    onChange={(e) => updateLocationDetail("apartment", e.target.value)}
                    className="mt-1 h-10 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Location Options Modal */}
        {showLocationOptions && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 p-4">
            <div className="w-full max-w-md rounded-t-2xl bg-background p-6 pb-8 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-bold text-foreground">Choose Location</h3>
                <button
                  onClick={() => setShowLocationOptions(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCurrentLocation}
                  disabled={isLocating}
                  className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Navigation className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">
                      {isLocating ? "Locating..." : "Use Current Location"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Automatically detect your location
                    </p>
                  </div>
                </button>

                <button
                  onClick={handleChooseMap}
                  className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-sm transition-colors hover:bg-muted/50"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
                    <Map className="h-6 w-6 text-secondary" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-foreground">Choose from Map</p>
                    <p className="text-xs text-muted-foreground">
                      Select a location on the map
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Budget Range */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Your Budget</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Set your preferred price range for this service
        </p>

        {/* Budget Display */}
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-card p-4 shadow-sm">
          <Coins className="h-6 w-6 text-secondary" />
          <span className="text-3xl font-bold text-foreground">{state.budget}</span>
          <span className="text-lg text-muted-foreground">EGP</span>
        </div>

        {/* Budget Slider */}
        <div className="mt-4 px-2">
          <input
            type="range"
            min={MIN_BUDGET}
            max={MAX_BUDGET}
            step={25}
            value={state.budget}
            onChange={(e) => onChange({ budget: Number(e.target.value) })}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-muted accent-primary [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:shadow-md"
          />
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-muted-foreground">Min: {MIN_BUDGET}</span>
            <span className="font-medium text-secondary">Best: {BEST_BUDGET}</span>
            <span className="text-muted-foreground">Max: {MAX_BUDGET}</span>
          </div>
        </div>

        {/* Quick Budget Options */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          <button
            onClick={() => onChange({ budget: MIN_BUDGET })}
            className={`rounded-xl p-3 text-center transition-all ${
              state.budget === MIN_BUDGET
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground shadow-sm hover:bg-muted"
            }`}
          >
            <p className="text-xs text-inherit opacity-70">Minimum</p>
            <p className="text-sm font-bold">{MIN_BUDGET} EGP</p>
          </button>
          <button
            onClick={() => onChange({ budget: BEST_BUDGET })}
            className={`rounded-xl p-3 text-center transition-all ${
              state.budget === BEST_BUDGET
                ? "bg-secondary text-secondary-foreground"
                : "bg-card text-foreground shadow-sm hover:bg-muted"
            }`}
          >
            <p className="text-xs text-inherit opacity-70">Best Value</p>
            <p className="text-sm font-bold">{BEST_BUDGET} EGP</p>
          </button>
          <button
            onClick={() => onChange({ budget: MAX_BUDGET })}
            className={`rounded-xl p-3 text-center transition-all ${
              state.budget === MAX_BUDGET
                ? "bg-primary text-primary-foreground"
                : "bg-card text-foreground shadow-sm hover:bg-muted"
            }`}
          >
            <p className="text-xs text-inherit opacity-70">Premium</p>
            <p className="text-sm font-bold">{MAX_BUDGET} EGP</p>
          </button>
        </div>

        {/* Budget hint */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {state.budget < BEST_BUDGET
            ? "Lower budget may take longer to find a worker"
            : state.budget >= MAX_BUDGET
            ? "Premium budget attracts top-rated workers"
            : "Good budget for quality service"}
        </p>
      </div>

      {/* Tools Toggle */}
      <div className="rounded-xl bg-card p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-foreground">
              I will provide tools & materials
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Cleaning supplies, mops, etc.
            </p>
          </div>
          <Switch
            checked={state.provideTools}
            onCheckedChange={(checked) =>
              onChange({ provideTools: checked === true })
            }
          />
        </div>
        <div
          className={`mt-3 rounded-lg p-3 text-xs ${
            state.provideTools
              ? "bg-primary/10 text-primary"
              : "bg-secondary/20 text-secondary-foreground"
          }`}
        >
          {state.provideTools
            ? "Great! This reduces the service cost."
            : "Our team will bring all necessary tools (+50 EGP)."}
        </div>
      </div>
    </div>
  )
}

function Step4({
  state,
  onChange,
}: {
  state: CleaningState
  onChange: (s: Partial<CleaningState>) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const valid = files.filter((f) => f.size <= 10 * 1024 * 1024) // 10MB
    const total = [...state.photos, ...valid].slice(0, 5)
    onChange({ photos: total })
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  const removePhoto = (index: number) => {
    const updated = state.photos.filter((_, i) => i !== index)
    onChange({ photos: updated })
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Add-ons */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Optional Add-ons</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Select additional cleaning areas
        </p>
        <div className="mt-3 flex flex-col gap-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
            <Checkbox
              checked={state.kitchenCleaning}
              onCheckedChange={(checked) =>
                onChange({ kitchenCleaning: checked === true })
              }
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Kitchen Deep Cleaning</p>
              <p className="text-xs text-muted-foreground">Appliances, cabinets & surfaces</p>
            </div>
            <span className="text-sm font-bold text-secondary">+100 EGP</span>
          </label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl bg-card p-4 shadow-sm">
            <Checkbox
              checked={state.balconyCleaning}
              onCheckedChange={(checked) =>
                onChange({ balconyCleaning: checked === true })
              }
            />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Balcony / Terrace Cleaning
              </p>
              <p className="text-xs text-muted-foreground">Floors, railings & glass</p>
            </div>
            <span className="text-sm font-bold text-secondary">+75 EGP</span>
          </label>
        </div>
      </div>

      {/* Photo Upload */}
      <div>
        <h3 className="text-sm font-bold text-foreground">Upload Photos</h3>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {`Up to 5 photos (max 10MB each) - ${state.photos.length}/5`}
        </p>

        {/* Photo Grid */}
        <div className="mt-3 grid grid-cols-3 gap-2">
          {state.photos.map((photo, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-xl bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(photo)}
                alt={`Upload ${i + 1}`}
                className="h-full w-full object-cover"
              />
              <button
                onClick={() => removePhoto(i)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-foreground/80 text-background"
                aria-label={`Remove photo ${i + 1}`}
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {state.photos.length < 5 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-input bg-card text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <ImagePlus className="h-6 w-6" />
              <span className="text-[10px] font-medium">Add Photo</span>
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handlePhotoUpload}
          className="hidden"
        />
      </div>
    </div>
  )
}

// --- Main Component ---
const STEP_TITLES = [
  "Place & Cleaning Type",
  "Size & Rooms",
  "Schedule & Details",
  "Add-ons & Photos",
]

export function PlaceCleaningScreen({ onBack }: { onBack: () => void }) {
  const [step, setStep] = useState(0)
  const [state, setState] = useState<CleaningState>({
    placeType: null,
    cleaningType: null,
    rooms: 1,
    bathrooms: 1,
    areaSize: null,
    date: "",
    time: "",
    location: "",
    provideTools: false,
    kitchenCleaning: false,
    balconyCleaning: false,
    photos: [],
  })
  const [submitted, setSubmitted] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const update = (partial: Partial<CleaningState>) =>
    setState((prev) => ({ ...prev, ...partial }))

  const canProceed = useMemo(() => {
    switch (step) {
      case 0:
        return state.placeType !== null && state.cleaningType !== null
      case 1:
        return state.rooms >= 1 && state.areaSize !== null
      case 2:
        return state.date !== "" && state.time !== "" && state.location.trim() !== ""
      case 3:
        return true
      default:
        return false
    }
  }, [step, state])

  if (submitted) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center px-6 pb-6 pt-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-foreground">Booking Submitted!</h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          Your cleaning request has been sent. A professional will be assigned shortly.
        </p>
        <Button
          onClick={onBack}
          className="mt-8 h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Back to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="flex min-h-full flex-col px-6 pb-6 pt-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => (step > 0 ? setStep(step - 1) : onBack())}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted text-foreground"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <h2 className="text-base font-bold text-foreground">Place Cleaning</h2>
          <p className="text-xs text-muted-foreground">{`Step ${step + 1} of 4 - ${STEP_TITLES[step]}`}</p>
        </div>
      </div>

      {/* Progress */}
      <Progress value={((step + 1) / 4) * 100} className="mt-4 h-1.5" />

      {/* Step Content */}
      <div className="mt-5 flex-1">
        {step === 0 && <Step1 state={state} onChange={update} />}
        {step === 1 && <Step2 state={state} onChange={update} />}
        {step === 2 && <Step3 state={state} onChange={update} />}
        {step === 3 && <Step4 state={state} onChange={update} />}
      </div>

      {/* Navigation */}
      <div className="mt-6">
        <Button
          onClick={() => {
            if (step < 3) setStep(step + 1)
            else setShowConfirmation(true)
          }}
          disabled={!canProceed}
          className="h-12 w-full rounded-xl bg-primary text-base font-semibold text-primary-foreground hover:bg-primary/90"
        >
          {step < 3 ? (
            <>
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          ) : (
            "Confirm Booking"
          )}
        </Button>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
          <div className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl">
            {/* Close button */}
            <button
              onClick={() => setShowConfirmation(false)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-muted text-muted-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            
            {/* Icon */}
            <div className="flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <AlertCircle className="h-8 w-8 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h3 className="mt-4 text-center text-lg font-bold text-foreground">
              Confirm Your Booking
            </h3>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Please review your booking details
            </p>

            {/* Booking Summary */}
            <div className="mt-4 space-y-2 rounded-xl bg-muted/50 p-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium text-foreground">
                  {CLEANING_TYPES.find(c => c.id === state.cleaningType)?.label} Cleaning
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Place</span>
                <span className="font-medium text-foreground">
                  {PLACE_TYPES.find(p => p.id === state.placeType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time</span>
                <span className="font-medium text-foreground">{state.date} at {state.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="max-w-[150px] truncate font-medium text-foreground">{state.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rooms</span>
                <span className="font-medium text-foreground">{state.rooms} rooms, {state.bathrooms} bathrooms</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-3">
              <Button
                variant="outline"
                onClick={() => setShowConfirmation(false)}
                className="h-12 flex-1 rounded-xl text-sm font-semibold"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  setShowConfirmation(false)
                  setSubmitted(true)
                }}
                className="h-12 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
