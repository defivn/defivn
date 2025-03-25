import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Lời ngỏ</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        DeFi.vn là một trang web tài liệu về tài chính phi tập trung (DeFi).
        Trang web này cung cấp thông tin về các khái niệm, công nghệ và ứng dụng của DeFi,
        giúp người dùng hiểu rõ hơn về thế giới tài chính phi tập trung.
      </p>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Tài liệu</h2>
      <div className="flex flex-col gap-2">
        {
          posts.map((post) => (
            <div key={post.id} className="flex flex-row items-center gap-2">
              <h3 className="text-sm font-semibold bg-muted p-2 rounded-full w-8 h-8 flex items-center justify-center">{post.id}</h3>
              <Link className="underline underline-offset-4 text-blue-500 dark:text-blue-400" href={post.url}>
                {post.title}
              </Link>
            </div>
          ))
        }
      </div>
    </div>
  );
}
