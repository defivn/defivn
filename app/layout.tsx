import type { Metadata } from "next";
// import { Source_Sans_3 } from "next/font/google";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { PostHogProvider } from "@/app/providers";
import Footer from "@/components/footer";
import { AIButton } from "@/components/ai-button";

// const sourceSans3 = Source_Sans_3({
//   subsets: ["latin"],
// });

const fontVietnamese = Inter({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: 'DeFi.vn',
  description: 'Bách khoa toàn thư về tài chính phi tập trung',
  metadataBase: new URL('https://www.defi.vn'),
  openGraph: {
    title: 'DeFi.vn',
    description: 'Bách khoa toàn thư về tài chính phi tập trung',
    url: 'https://www.defi.vn',
    siteName: 'DeFi.vn',
    images: [
      {
        url: '/defi-vn-tbn.png',
        width: 1200,
        height: 630,
        alt: 'og-image',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DeFi.vn',
    description: 'Bách khoa toàn thư về tài chính phi tập trung',
    creator: '@zxstim',
    images: ['/defi-vn-tbn.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body
        className={`${fontVietnamese.className} antialiased`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col justify-between p-2 md:p-8 mb-12">
              <main className="max-w-xl mx-auto w-full space-y-6">
                <Header />
                {children}
                <AIButton />
                <Footer />
              </main>
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
