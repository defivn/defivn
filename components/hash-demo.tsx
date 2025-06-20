"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { sha256, toHex } from "viem"

export default function HashDemo() {
  const [data, setData] = useState("")

  return (
    <div className="flex flex-col gap-4 mt-4">
      <Textarea placeholder="Nhập dữ liệu vào đây" value={data} onChange={(e) => setData(e.target.value)} />
      <Button className="w-fit self-end hover:cursor-pointer" onClick={() => setData("")}>Xoá dữ liệu</Button>
      <Textarea placeholder="Kết quả băm dữ liệu sẽ hiện ra ở đây" value={data ? sha256(toHex(data)) : ""} readOnly />
    </div>
  )
}