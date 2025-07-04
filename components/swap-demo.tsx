"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { DEFIVN_WALLET_ADDRESS } from "@/lib/constants";
import { ArrowRightLeft, ArrowUpDown, CircleSlash } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import { formatUnits, parseUnits } from "viem";
import useDebounce from "@/hooks/use-debounce";

export default function SwapDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [balances, setBalances] = useState({
    eth: formatUnits(BigInt(100000000000000000000), 18),
    usdt: formatUnits(BigInt(0), 6),
  });
  const [buyAmount, setBuyAmount] = useState("");
  
  const EXCHANGE_RATE = 2500;

  const form = useForm({
    defaultValues: {
      sellAmount: "",
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  const debouncedSellAmount = useDebounce(form.state.values.sellAmount, 500);

  useEffect(() => {
    const sellAmount = parseUnits(debouncedSellAmount, 18);
    const buyAmount = sellAmount * BigInt(EXCHANGE_RATE);
    setBuyAmount(formatUnits(buyAmount, 6));
  }, [debouncedSellAmount]);

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
              <p className="text-muted-foreground">ETH</p>
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
              <p className="text-muted-foreground">USDT</p>
            </div>
          </div>
        </div>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4 border border-muted-foreground/10 rounded-md p-4">
          <div className="flex flex-row gap-2 items-center">
            <ArrowRightLeft className="w-4 h-4" />
            <h2 className="text-lg text-muted-foreground">
              Trao đổi tài sản (Swap)
            </h2>
          </div>
          {/* Sell */}
          <div className="flex flex-col gap-2">
            <h2>Bạn bán</h2>
            <form.Field
              name="sellAmount"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Hãy nhập số tài sản cần bán"
                    : BigInt(value) < BigInt(0)
                    ? "Số tài sản cần bán phải lớn hơn 0"
                    : parseUnits(value, 18) > parseUnits(balances.eth, 18)
                    ? "Số tài sản cần bán phải nhỏ hơn số dư tài khoản"
                    : undefined,
              }}
            >
              {(field) => (
                <>
                  <div className="flex flex-row gap-2 justify-between">
                    {isDesktop ? (
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="number"
                        placeholder="0"
                        className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    ) : (
                      <input
                        id={field.name}
                        name={field.name}
                        value={field.state.value || ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        type="number"
                        inputMode="decimal"
                        pattern="[0-9]*"
                        placeholder="0"
                        className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    )}
                    <p className="text-lg text-muted-foreground self-end">
                      ETH
                    </p>
                  </div>
                  <FieldInfo field={field} />
                </>
              )}
            </form.Field>
          </div>
          {/* Switch button */}
          <div className="flex flex-row gap-2 justify-center">
            <Button
              size="icon"
              variant="secondary"
              className="hover:cursor-pointer"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>
          {/* Buy */}
          <div className="flex flex-col gap-2">
            <h2>Bạn nhận</h2>
            <div className="flex flex-row gap-2 justify-between">
              <input
                id="buyAmount"
                name="buyAmount"
                value={buyAmount}
                type="text"
                placeholder="0"
                className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                readOnly
              />
              <p className="text-lg text-muted-foreground self-end">USDT</p>
            </div>
          </div>
          {/* Exchange rate */}
          <div className="flex flex-row gap-2 justify-end items-center">
            <CircleSlash className="w-4 h-4" />
            <p>1 ETH = {EXCHANGE_RATE} USDT</p>
          </div>
          {/* Action button */}

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <div className="flex flex-row gap-2 justify-between">
                <div className="flex flex-row gap-2">
                  <Button
                    size="icon"
                    variant="secondary"
                    className="hover:cursor-pointer"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="hover:cursor-pointer"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                  </Button>
                </div>
                <Button className="hover:cursor-pointer">
                  <ArrowRightLeft className="w-4 h-4" />
                  Trao đổi
                </Button>
              </div>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {!field.state.meta.isTouched ? (
        <em>Hãy nhập số tài sản cần bán</em>
      ) : field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em
          className={`${
            field.state.meta.errors.join(",") === "Hãy nhập số tài sản cần bán"
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
