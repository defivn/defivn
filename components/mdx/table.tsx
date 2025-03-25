export default function Table({ children }: { children?: React.ReactNode }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        {children}
      </table>
    </div>
  )
}

