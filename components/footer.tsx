import { ExternalLink } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex flex-col">
      <div className="flex flex-col gap-4 bg-secondary rounded-md px-4 pt-4 pb-6 border-2 border-muted-foreground/10">
        <div className="flex flex-row justify-between items-center w-full">
          <Image src="/hero.svg" className="dark:invert" alt="logo" width={100} height={50} />
          <Button asChild variant="link" size="icon">
            <Link target="_blank" href="https://github.com/defivn/defivn">
              <Image src="/github.svg" alt="github" width={24} height={24} className="dark:invert" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-primary font-semibold">Liên kết hữu ích</p>
          <div className="flex flex-col gap-2">
            <Link className="text-sm underline underline-offset-4 text-blue-500 dark:text-blue-400 w-fit" href="/dong-gop-noi-dung">Đóng góp nội dung</Link>
            <Link className="text-sm underline underline-offset-4 text-blue-500 dark:text-blue-400 w-fit" href="/ve-defi-vn">Về DeFi.vn</Link>
          </div>
        </div>
      </div>
      <p className="text-sm text-center text-muted-foreground mt-2">
        Một dự án cộng đồng từ{" "}
        <a
          href="https://ethstation.org"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block underline underline-offset-4 text-blue-500 dark:text-blue-400"
        >
          Eth Station
          <ExternalLink className="w-4 h-4 inline-block ml-1 mr-2" />
        </a>
      </p>
    </footer>
  );
}
