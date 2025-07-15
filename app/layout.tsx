import type { Metadata } from "next";
// Vietnamese font
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import Footer from "@/components/footer";
import { AIButton } from "@/components/ai-button";
import Providers from "@/providers";

// initialize Vietnamese font
const fontVietnamese = Be_Vietnam_Pro({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DeFi.vn",
  description: "Bách khoa toàn thư về tài chính phi tập trung",
  metadataBase: new URL("https://www.defi.vn"),
  openGraph: {
    title: "DeFi.vn",
    description: "Bách khoa toàn thư về tài chính phi tập trung",
    url: "https://www.defi.vn",
    siteName: "DeFi.vn",
    images: [
      {
        url: "/defi-vn-tbn.png",
        width: 1200,
        height: 630,
        alt: "og-image",
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DeFi.vn",
    description: "Bách khoa toàn thư về tài chính phi tập trung",
    creator: "@zxstim",
    images: ["/defi-vn-tbn.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className={`${fontVietnamese.className} antialiased`}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="min-h-screen flex flex-col justify-between p-2 md:p-8 mb-12">
              <main className="max-w-2xl mx-auto w-full space-y-6">
                <Header />
                {children}
                <AIButton />
                <Footer />
              </main>
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
