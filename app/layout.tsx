import type { Metadata, Viewport } from 'next'
import { Inter, Playfair_Display, Noto_Sans_Arabic } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const notoArabic = Noto_Sans_Arabic({ subsets: ["arabic"], variable: "--font-arabic", weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: 'Aoun - عَوْن | On-Demand Services',
  description: 'Your trusted service marketplace. Book cleaning, pet care, home assistance, and installation services. Connect workers with customers.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#1B4F72',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${notoArabic.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
