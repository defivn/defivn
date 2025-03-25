import Link from "next/link";

const posts = [
  {
    id: 1,
    title: "Blockchain là gì?",
    url: "/tai-lieu/blockchain-la-gi",
  },
  {
    id: 2,
    title: "Tài chính phi tập trung là gì?",
    url: "/tai-lieu/tai-chinh-phi-tap-trung-la-gi",
  },
  {
    id: 3,
    title: "Ứng dụng phi tập trung là gì?",
    url: "/tai-lieu/ung-dung-phi-tap-trung-la-gi",
  },
  {
    id: 4,
    title: "Hợp đồng thông minh là gì?",
    url: "/tai-lieu/hop-dong-thong-minh-la-gi",
  },
]
export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Lời ngỏ</h1>
      <p className="leading-7 [&:not(:first-child)]:mt-6">
        DeFi.vn là một trang web tài liệu về tài chính phi tập trung (DeFi).
        Trang web này cung cấp thông tin về các khái niệm, công nghệ và ứng dụng của DeFi,
        giúp người dùng hiểu rõ hơn về thế giới tài chính phi tập trung.
      </p>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">Tài liệu</h2>
      <div className="flex flex-col gap-2">
        {
          posts.map((post) => (
            <Link className="underline underline-offset-4 text-blue-500 dark:text-blue-400" key={post.id} href={post.url}>
              {post.title}
            </Link>
          ))
        }
      </div>
    </div>
  );
}
