import { posts } from "@/lib/posts"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PostNav({ currentPostId }: { currentPostId: number }) {
  // based on the current post id, find the previous and next post
  const previousPost = currentPostId === 1 ? undefined : posts.find((post) => post.id === currentPostId - 1)
  const nextPost = posts.find((post) => post.id === currentPostId + 1)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-12">
      <Button variant="outline" asChild className="h-[96px]">
        <Link href={previousPost?.url || "/"}>
          <div className="flex flex-row justify-between items-center gap-2 w-full">
            <ChevronLeft className="w-4 h-4" />
            <div className="flex flex-col gap-2 text-right">
              <p className="text-[12px]">Trước</p>
              <p className="text-md font-bold">{previousPost ? previousPost.title : "Trang chủ"}</p>
            </div>
          </div>
        </Link>
      </Button>
      <Button variant="outline" asChild className="h-[96px]">
        <Link href={nextPost?.url || ""}>
          <div className="flex flex-row justify-between items-center gap-2 w-full text-left">
            <div className="flex flex-col gap-2">
              <p className="text-sm">Tiếp</p>
              <p className="text-md font-bold">{nextPost?.title}</p>
            </div>
            <ChevronRight className="w-4 h-4" />
          </div>
        </Link>
      </Button>
    </div>
  )
}