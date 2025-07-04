"use client";

import { useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { DEFIVN_WALLET_ADDRESS } from "@/lib/constants";

export default function SwapDemo() {
  const [balances, setBalances] = useState({
    eth: 100,
    usdt: 100,
  });

  const form = useForm({
    defaultValues: {
      sendAmount: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="flex flex-col gap-4 mt-4">
      <div className="flex flex-col gap-4 border border-muted-foreground/10 rounded-md p-4">
        <h2 className="text-lg text-muted-foreground">Thống kê tài sản</h2>
        <p className="text-sm">{DEFIVN_WALLET_ADDRESS}</p>
        <div className="flex flex-row gap-2 bg-muted-foreground/10 rounded-md p-2 w-fit">
          <Image
            src="/logo.svg"
            alt="defivnlogo"
            width={24}
            height={24}
            className="rounded-full"
          />
          <p>defivn.eth</p>
        </div>
        <div className="flex flex-col gap-2 w-[200px]">
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-row gap-2">
              <Image
                src="/logos/eth.svg"
                alt="ETH"
                width={24}
                height={24}
                className="rounded-full"
              />
              <p>Ethereum</p>
            </div>
            <div className="flex flex-row gap-2">
              <p>{balances.eth}</p>
              <p>ETH</p>
            </div>
          </div>
          <div className="flex flex-row gap-2 justify-between items-center">
            <div className="flex flex-row gap-2">
              <Image
                src="/logos/usdt.svg"
                alt="USDT"
                width={24}
                height={24}
                className="rounded-full"
              />
              <p>Tether</p>
            </div>
            <div className="flex flex-row gap-2">
              <p>{balances.usdt}</p>
              <p>USDT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {!field.state.meta.isTouched ? (
        <em>Hãy nhập số ETH gửi</em>
      ) : field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em
          className={`${
            field.state.meta.errors.join(",") === "Hãy nhập số ETH gửi"
              ? ""
              : "text-red-500"
          }`}
        >
          {field.state.meta.errors.join(",")}
        </em>
      ) : (
        <em className="text-green-500">Ok!</em>
      )}
      {field.state.meta.isValidating ? "Đang xác thực..." : null}
    </>
  );
}
