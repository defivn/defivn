import Footer from "@/components/footer";
import { Header } from "@/components/header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
