import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function A({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string | undefined;
}) {
  return (
    <Link
      href={href || "/"}
      className="font-medium text-blue-500 dark:text-blue-400 underline underline-offset-4"
      target={href?.includes('https') ? '_blank' : undefined}
    >
      {children}
      {href?.includes('https') && <ExternalLink className="ml-1 inline-block w-4 h-4" />}
    </Link>
  );
}
