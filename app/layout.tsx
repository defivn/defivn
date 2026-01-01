import { RootProvider } from 'fumadocs-ui/provider/next';
import './global.css';
import type { Metadata } from "next";
// Vietnamese font
import { Be_Vietnam_Pro } from "next/font/google";

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

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="vi" className={`${fontVietnamese.className} antialiased`} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
