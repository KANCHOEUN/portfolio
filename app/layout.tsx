import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/header"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "Developer Portfolio",
  description: "A code editor themed developer portfolio",
  icons: {
    icon: [
      { url: '/favicons/favicon.ico' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [
      { url: '/favicons/apple-touch-icon.png' },
    ],
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: '/favicons/apple-touch-icon.png',
      },
    ],
  },
  manifest: '/favicons/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Portfolio',
  },
  applicationName: 'Portfolio',
  formatDetection: {
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
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
        <link rel="icon" href="/favicons/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
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
