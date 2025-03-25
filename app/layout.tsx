import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
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
        className={`${sourceSans3.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen flex flex-col justify-between pt-0 md:pt-8 p-8">
            <main className="max-w-[60ch] mx-auto w-full space-y-6">
              <Header />
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
