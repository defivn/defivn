import { ModeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import Link from "next/link"

export function Header() {
  return (
    <header className="flex flex-row justify-between items-center">
      <Link href="/">
        <Image
          className="dark:invert"
          src="/hero.svg"
          alt="DeFi.vn hero"
          width={180}
          height={38}
          priority
        />
      </Link>
      <ModeToggle />
    </header>
  )
}