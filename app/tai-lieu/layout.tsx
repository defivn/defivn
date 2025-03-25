import CustomBreadcrumb from "@/components/custom-breadcrumb";

export default function MdxLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="flex flex-col">
      <CustomBreadcrumb />
      {children}
    </div>
  );
}
