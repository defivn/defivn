"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ListFilter } from "lucide-react";
import { shortenTitle } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function TOC() {
  const [headings, setHeadings] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setHeadings([]);
    setActiveId("");
    setIsDrawerOpen(false);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    const headingElements = Array.from(
      document.querySelectorAll("h2[id], h3[id]")
    );
    const newHeadings: TocItem[] = headingElements.map((element) => {
      observer.observe(element);
      return {
        id: element.id,
        text: element.textContent || "",
        level: element.tagName === "H2" ? 2 : 3,
      };
    });
    setHeadings(newHeadings);

    return () => {
      headingElements.forEach((element) => observer.unobserve(element));
    };
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  const activeHeadingText =
    headings.find((h) => h.id === activeId)?.text || "Mục lục";

  if (isMobile) {
    return (
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerTrigger asChild>
          <Button variant="outline" className="w-full bg-transparent">
            <ListFilter className="mr-2 h-4 w-4" />
            <span>{activeHeadingText}</span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Mục lục</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 overflow-auto max-h-[70vh pb-20">
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
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDrawerOpen(false);

                      setTimeout(() => {
                        const el = document.getElementById(heading.id);
                        if (el) {
                          window.scrollTo({
                            top:
                              el.getBoundingClientRect().top + window.scrollY,
                            behavior: "smooth",
                          });
                          history.pushState(null, "", `#${heading.id}`);
                        }
                      }, 700);
                    }}
                  >
                    {shortenTitle(heading.text, 35)}
                  </Link>
                </li>
              ))}
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop view (unchanged)
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
              {shortenTitle(heading.text, 35)}
            </Link>
          </li>
        ))}
      </nav>
    </div>
  );
}
