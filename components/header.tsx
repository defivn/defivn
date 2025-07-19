"use client";

import { ModeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarSheet } from "./sidebar-nav";
import TOC from "./mdx/toc";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const docsPage = pathname.includes("/tai-lieu");

  return (
    <header
      className={cn(
        "flex flex-col justify-between items-center ",
        isMobile && "sticky right-0 left-0 top-0 z-[20] bg-background"
      )}
    >
      <div className="flex items-center justify-between w-full">
        <Link href="/">
          <Image
            className="dark:invert"
            src="/hero.svg"
            alt="DeFi.vn hero"
            width={150}
            height={38}
            priority
          />
        </Link>
        <div className="flex gap-2">
          <ModeToggle />
          {docsPage && (
            <div className="block lg:hidden">
              <SidebarSheet />
            </div>
          )}
        </div>
      </div>
      <div className="sticky bg-background flex flex-row gap-6 w-full order-1 lg:hidden ">
        <TOC />
      </div>
    </header>
  );
}
