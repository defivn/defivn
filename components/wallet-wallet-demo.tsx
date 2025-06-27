"use client"

import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { generatePrivateKey, generateMnemonic, english, privateKeyToAccount, mnemonicToAccount } from 'viem/accounts'

export default function WalletDemo() {
  const [text, setText] = useState("")

  const account = text === "" ? "" : text.startsWith("0x") ? privateKeyToAccount(text as `0x${string}`) : mnemonicToAccount(text)

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-row gap-2">
        <Button className="w-fit self-end hover:cursor-pointer" onClick={() => setText(generatePrivateKey())}>Tạo private key</Button>
        <Button className="w-fit self-end hover:cursor-pointer" onClick={() => setText(generateMnemonic(english))}>Tạo mnemonic</Button>
        <Button className="w-fit self-end hover:cursor-pointer" onClick={() => setText("")}>Xoá</Button>
      </div>
      <Textarea placeholder="Bí mật được tạo" value={text} readOnly />
      <Textarea placeholder="Địa chỉ ví tương ứng" value={account && typeof account === 'object' ? account.address : ""} readOnly />
    </div>
  )
}