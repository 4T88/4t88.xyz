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
  title: "4T88 - Links",
  description: "Social links for 4T88",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/4t88.xyz/favicon.png",
    shortcut: "/4t88.xyz/favicon.png",
    apple: "/4t88.xyz/favicon.png",
  },
    generator: 'v0.dev'
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
