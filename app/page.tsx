import Link from "next/link";
import { posts } from "@/lib/posts";
import YoutubeIframe from "@/components/youtube-iframe";

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          này cung cấp thông tin về các khái niệm, công nghệ và ứng dụng của
          DeFi, giúp người dùng hiểu rõ hơn về thế giới tài chính phi tập trung.
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
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Hướng dẫn
        </h2>
        <div className="flex flex-col gap-2">
          {posts
            .find((post) => post.section === "Hướng dẫn")
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
          Văn bản
        </h2>
        <div className="flex flex-col gap-2">
          {posts
            .find((post) => post.section === "Văn bản")
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
          Ý kiến
        </h2>
        <div className="flex flex-col gap-2">
          {posts
            .find((post) => post.section === "Ý kiến")
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
      <div className="space-y-6">
        <h1 className="mt-12 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          YouTube
        </h1>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Đăng ký{" "}
          <a
            href="https://www.youtube.com/@defivn"
            target="_blank"
            className="inline-block underline underline-offset-4 text-blue-500 dark:text-blue-400"
          >
            kênh DeFi.vn
          </a>{" "}
          để theo dõi hành trình nhà đầu tư DeFi của biên tập viên ZxStim. Nhiều chuỗi video mới sẽ được thêm vào trong thời gian tới. Thỉnh thoảng sẽ có livestream cho mọi người tương tác trực tiếp.
        </p>
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Mới nhất
        </h2>
        <YoutubeIframe
          src="https://www.youtube.com/embed/JKbrzhwZd7Q?si=ZgOiOqeI5se2o-c3"
          title="Giá Lên Nhanh, Bán Thì Hớ, Thế Chúng Ta Làm Gì?"
        />
      </div>
    </div>
  );
}
