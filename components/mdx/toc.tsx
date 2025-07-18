"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TocItem[]>([]);

  useEffect(() => {
    // Get all headings from the page (h2, h3)
    const elements = Array.from(document.querySelectorAll("h2, h3")).map(
      (element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.charAt(1)),
      })
    );
    setHeadings(elements);
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 sticky top-20">
      <h3 className="text-lg font-semibold mb-3">Mục lục</h3>
      <nav className="space-y-2">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              "list-none text-sm",
              heading.level === 2 ? "ml-0" : "ml-4"
            )}
          >
            <Link
              href={`#${heading.id}`}
              className="text-muted-foreground hover:text-foreground hover:underline transition-colors"
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
