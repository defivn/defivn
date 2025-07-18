"use client";

import { posts } from "@/lib/posts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <div className="w-full lg:w-64 shrink-0">
      <h3 className="text-lg font-semibold mb-3">Nội dung</h3>
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
    </div>
  );
}
