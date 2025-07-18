"use client";

import { posts } from "@/lib/posts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="space-y-6 pr-2 max-h-[calc(100vh-120px)] overflow-y-auto pb-8">
      {posts.map((section) => (
        <div key={section.id} className="space-y-2">
          <h4 className="font-medium text-lg border-b pb-1">
            {section.section}
          </h4>
          <ul className="space-y-1">
            {section.posts.map((post) => (
              <li key={post.id}>
                <Link
                  href={post.url}
                  className={cn(
                    "block py-1.5 px-3 rounded-md text-sm transition-colors",
                    pathname === post.url
                      ? "bg-muted font-medium text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

export function SidebarSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-4 w-[280px] sm:w-[300px]">
        <SheetTitle className="sr-only">Danh sách tài liệu</SheetTitle>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
