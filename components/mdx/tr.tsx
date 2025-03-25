export default function TR({ children }: { children?: React.ReactNode }) {
  return (
    <tr className="m-0 border-t p-0 even:bg-muted">
      {children}
    </tr>
  )
}