export default function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  return (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full">
        <thead>
          <tr className="m-0 border-t p-0 even:bg-muted">
          {data.headers.map((header, index) => (
            <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right" key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr className="m-0 border-t p-0 even:bg-muted" key={index}>
            {row.map((cell, cellIndex) => (
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right" key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </table>
    </div>
  )
}
