"use client"

import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function AIButton() {
  const pathname = usePathname();

  if (pathname === "/ai") {
    return null;
  }

  return (
    <Button asChild className="fixed bottom-4 right-4 md:fixed md:top-12 md:right-8 z-10">
      <Link href="/ai">
        <Sparkles className="h-[1.2rem] w-[1.2rem]" />
        Hỏi AI
      </Link>
    </Button>
  )
}