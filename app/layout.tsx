import type React from "react"
import type { Metadata } from "next"
import { JetBrains_Mono } from "next/font/google"
import "./globals.css"

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
})

export const metadata: Metadata = {
  title: "4T88.xyz",
  description: "my socials",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  generator: 'v0.dev',
  openGraph: {
    title: '4T88.xyz',
    description: 'my socials',
    url: 'https://4t88.xyz',
    siteName: '4T88.xyz',
    images: [
      {
        url: '/favicon.png',
        width: 512,
        height: 512,
        alt: '4T88.xyz',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: '4T88.xyz',
    description: 'my socials',
    images: ['/favicon.png'],
    site: '@4T88xyz',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${jetbrainsMono.variable} font-mono antialiased`}>{children}</body>
    </html>
  )
}
