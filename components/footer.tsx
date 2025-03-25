import { ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="flex flex-col">
      <hr className="border-t border-border" />
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
