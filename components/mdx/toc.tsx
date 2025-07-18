"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    // Reset headings when pathname changes
    setHeadings([]);
    setActiveId("");

    // Function to extract headings
    const extractHeadings = () => {
      const mainContent = document.querySelector(".content-main");
      if (!mainContent) return;

      const elements = Array.from(mainContent.querySelectorAll("h2, h3")).map(
        (element) => {
          // Generate ID if none exists
          if (!element.id) {
            element.id = `heading-${Math.random().toString(36).substr(2, 9)}`;
          }
          return {
            id: element.id,
            text: element.textContent || "",
            level: Number(element.tagName.charAt(1)),
          };
        }
      );
      setHeadings(elements);
    };

    // Initial extraction
    extractHeadings();

    // Set up a mutation observer to detect when the content changes
    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    const mainContent = document.querySelector(".content-main");
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
      });
    }

    // Small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      extractHeadings();
    }, 300);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [pathname]); // Re-run effect when pathname changes

  // Scroll spy effect
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 100; // Offset from top of viewport

      // Find the current active heading
      let currentActiveId = "";

      for (let i = headings.length - 1; i >= 0; i--) {
        const heading = headings[i];
        const element = document.getElementById(heading.id);

        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;

          if (scrollY >= elementTop - offset) {
            currentActiveId = heading.id;
            break;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="border rounded-lg p-4 sticky top-20 max-h-[calc(100vh-120px)] overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3">Mục lục</h3>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <li
            key={`${heading.id}-${index}`}
            className={cn(
              "list-none text-sm",
              heading.level === 2 ? "ml-0" : "ml-4"
            )}
          >
            <Link
              href={`#${heading.id}`}
              className={cn(
                "block py-1 transition-all duration-300",
                activeId === heading.id
                  ? "text-foreground font-bold border-l-2 border-primary pl-2"
                  : "text-muted-foreground hover:text-foreground hover:underline pl-0 border-l-2 border-transparent"
              )}
            >
              {heading.text}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
