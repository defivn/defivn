"use client";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1 min-w-0 order-2 lg:order-1">
        <div className="content-main">{children}</div>
      </div>
    </div>
  );
}
