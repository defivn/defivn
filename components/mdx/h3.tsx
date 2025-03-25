import { HashIcon } from "lucide-react";
import Link from "next/link";

export default function H3({ children }: { children?: React.ReactNode }) {
  
  const normalizedId = children
    ?.toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove unsafe URL characters
    .split(" ")
    .join("-");

  return (
    <h3
      id={normalizedId}
      className="flex flex-row justify-between items-center gap-1 scroll-m-20 text-2xl font-semibold tracking-tight mt-6"
    >
      {children}
      <Link className="self-start" href={`#${normalizedId}`}>
        <HashIcon className="text-muted hover:text-muted-foreground w-6 h-6" />
      </Link>
    </h3>
  );
}
