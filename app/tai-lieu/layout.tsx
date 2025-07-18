import CustomBreadcrumb from "@/components/custom-breadcrumb";
import SidebarNav from "@/components/sidebar-nav";
import ContentLayout from "@/components/content-layout";

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <CustomBreadcrumb />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <aside className="lg:w-64 shrink-0 lg:sticky lg:top-20 self-start">
          <SidebarNav />
        </aside>
        <main className="flex-1 min-w-0">
          <ContentLayout>{children}</ContentLayout>
        </main>
      </div>
    </div>
  );
}
