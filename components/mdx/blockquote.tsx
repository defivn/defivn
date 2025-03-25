export default function Blockquote({ children }: { children?: React.ReactNode }) {
  return (
    <blockquote className="text-muted-foreground mt-4 border-l-2 pl-4 italic">
      {children}
    </blockquote>
  )
}