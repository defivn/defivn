import Link from "next/link";
import { posts } from "@/lib/posts";

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Lời ngỏ
      </h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        <Link
          href="/"
          className="inline-block underline underline-offset-4 text-blue-500 dark:text-blue-400"
        >
          DeFi.vn
        </Link>{" "}
        là một trang web tài liệu về tài chính phi tập trung (DeFi). Trang web
        này cung cấp thông tin về các khái niệm, công nghệ và ứng dụng của DeFi,
        giúp người dùng hiểu rõ hơn về thế giới tài chính phi tập trung.
      </p>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Định nghĩa
      </h2>
      <div className="flex flex-col gap-2">
        {posts
          .find((post) => post.section === "Định nghĩa")
          ?.posts.map((post) => (
            <div key={post.id} className="flex flex-row items-center gap-2">
              <h3 className="text-sm font-semibold bg-muted p-2 rounded-full w-8 h-8 flex items-center justify-center">
                {post.id}
              </h3>
              <Link
                className="font-medium underline underline-offset-4 text-blue-500 dark:text-blue-400 w-fit"
                href={post.url}
              >
                {post.title}
              </Link>
            </div>
          ))}
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Các hệ sinh thái
      </h2>
      <div className="flex flex-col gap-2">
        {posts
          .find((post) => post.section === "Các hệ sinh thái")
          ?.posts.map((post) => (
            <div key={post.id} className="flex flex-row items-center gap-2">
              <h3 className="text-sm font-semibold bg-muted p-2 rounded-full w-8 h-8 flex items-center justify-center">
                {post.id}
              </h3>
              <Link
                className="font-medium underline underline-offset-4 text-blue-500 dark:text-blue-400 w-fit"
                href={post.url}
              >
                {post.title}
              </Link>
            </div>
          ))}
      </div>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        Ứng dụng
      </h2>
      <div className="flex flex-col gap-2">
        {posts
          .find((post) => post.section === "Ứng dụng")
          ?.posts.map((post) => (
            <div key={post.id} className="flex flex-row items-center gap-2">
              <h3 className="text-sm font-semibold bg-muted p-2 rounded-full w-8 h-8 flex items-center justify-center">
                {post.id}
              </h3>
              <Link
                className="font-medium underline underline-offset-4 text-blue-500 dark:text-blue-400 w-fit"
                href={post.url}
              >
                {post.title}
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
}
