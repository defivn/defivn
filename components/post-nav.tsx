"use client"

import { posts } from "@/lib/posts"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { shortenTitle } from "@/lib/utils"

export default function PostNav() {

  const pathname = usePathname()

  const currentSection = posts.find((post) => post.posts.find((p) => p.url === pathname))
  const currentSectionId = currentSection?.id ?? 0
  const currentPostId = currentSection?.posts.find((p) => p.url === pathname)?.id ?? 0

  // based on the current post id, find the previous and next post
  const previousPost = currentPostId === 1 ? 
    (currentSectionId === 1 ? undefined : posts[currentSectionId - 2]?.posts[posts[currentSectionId - 2]?.posts.length - 1]) : 
    currentSection?.posts.find((post) => post.id === currentPostId - 1)
  const nextPost = currentPostId === currentSection?.posts.length ? 
    (currentSectionId === posts.length ? undefined : posts[currentSectionId]?.posts[0]) : 
    currentSection?.posts.find((post) => post.id === currentPostId + 1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
      <Button variant="outline" asChild className="h-[96px]">
        <Link href={previousPost?.url || "/"}>
          <div className="flex flex-row justify-between items-center gap-2 w-full">
            <ChevronLeft className="w-4 h-4" />
            <div className="flex flex-col gap-2 text-right">
              <p className="text-sm">Trước</p>
              <p className="text-md font-bold text-pretty">{previousPost ? shortenTitle(previousPost.title) : "Trang chủ"}</p>
            </div>
          </div>
        </Link>
      </Button>
      <Button variant="outline" asChild className="h-[96px]">
        <Link href={nextPost?.url || "/"}>
          <div className="flex flex-row justify-between items-center gap-2 w-full text-left">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Tiếp</p>
              <p className="text-md font-bold text-pretty">{nextPost ? shortenTitle(nextPost.title) : "Trang chủ"}</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </Button>
    </div>
  )
}