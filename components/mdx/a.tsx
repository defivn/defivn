import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function A({
  children,
  href,
}: {
  children?: React.ReactNode;
  href?: string | undefined;
}) {
  const className = "font-medium text-blue-500 dark:text-blue-400 underline underline-offset-4";
  const isExternal = href?.includes('https');

  // For external links or no href, use a regular anchor tag
  if (!href || isExternal) {
    return (
      <a 
        href={href} 
        className={className}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        {children}
        {isExternal && <ExternalLink className="ml-1 inline-block w-4 h-4" />}
      </a>
    );
  }

  // For internal links, use Next.js Link component
  return (
    <Link
      href={href}
      className={className}
    >
      {children}
    </Link>
  );
}
