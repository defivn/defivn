import TOC from "@/components/mdx/toc";

export default function ContentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0 order-2 lg:order-1">
        {children}
      </div>
      <div className="w-full lg:w-64 shrink-0 order-1 lg:order-2">
        <TOC />
      </div>
    </div>
  );
}
