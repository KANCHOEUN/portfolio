import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A code editor themed developer portfolio",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
      </head>
      <body>
        <LanguageProvider>
          <Header />
          <main className="flex-1">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  )
}
