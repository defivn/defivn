import type React from "react";
import CustomBreadcrumb from "@/components/custom-breadcrumb";
import ContentLayout from "@/components/content-layout";
import TOC from "@/components/mdx/toc";
import { SidebarNav } from "@/components/sidebar-nav";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <CustomBreadcrumb />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <aside className="hidden lg:block lg:w-64 shrink-0 lg:sticky lg:top-20 self-start lg:order-none">
          <SidebarNav />
        </aside>

        <main className="flex-1 min-w-0 order-2 lg:order-none">
          <ContentLayout>{children}</ContentLayout>
        </main>

        <div className="hidden lg:block w-full lg:w-64 shrink-0 order-3 lg:order-none">
          <TOC />
        </div>
      </div>
    </div>
  );
}
