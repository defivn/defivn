"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { Loader2, Check, CircleDashed } from "lucide-react";
import {
  generatePrivateKey,
  generateMnemonic,
  english,
  privateKeyToAccount,
  mnemonicToAccount,
} from "viem/accounts";
import { Address } from "viem";
import { useForm } from "@tanstack/react-form";
import type { AnyFieldApi } from "@tanstack/react-form";
import { useMediaQuery } from "@/hooks/use-media-query";

export default function WalletDemo() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [text, setText] = useState("");
  const [balance, setBalance] = useState("");
  const [address, setAddress] = useState<Address | "">(
    "0xEf44d56d75E86FAF8688B8509d41d791d7548EFB"
  );
  const [sendIsConfirming, setSendIsConfirming] = useState(false);
  const [sendIsSuccess, setSendIsSuccess] = useState(false);
  const [receiverBalance, setReceiverBalance] = useState("");
  const [currentStage, setCurrentStage] = useState(0);

  const GAS_FEE = "0.00001"

  const form = useForm({
    defaultValues: {
      sendAmount: "",
    },
    onSubmit: async ({ value }) => {
      setSendIsConfirming(true);
      setCurrentStage(1);
      
      // Stage 1: Signing transaction (0.5s)
      setTimeout(() => setCurrentStage(2), 1000);
      
      // Stage 2: Sending to node (1s)
      setTimeout(() => setCurrentStage(3), 2000);
      
      // Stage 3: Creating block (1.5s)
      setTimeout(() => setCurrentStage(4), 3000);
      
      // Stage 4: Adding to chain (2s)
      setTimeout(() => setCurrentStage(5), 4000);
      
      // Stage 5: Confirming (2.5s) - Update balances here
      setTimeout(() => {
        setCurrentStage(6);
        setSendIsConfirming(false);
        setSendIsSuccess(true);
        // Update balances after all stages complete
        setReceiverBalance(
          String(Number(receiverBalance) + Number(value.sendAmount))
        );
        setBalance(String(Number(balance) - Number(value.sendAmount) - Number(GAS_FEE)));
      }, 5000);
      
      setTimeout(() => {
        setSendIsSuccess(false);
      }, 7000);
      
      form.reset();
    },
  });

  const account =
    text === ""
      ? ""
      : text.startsWith("0x")
      ? privateKeyToAccount(text as `0x${string}`)
      : mnemonicToAccount(text);

  function handleResetDemo() {
    setText("");
    setBalance("");
    setAddress("");
    setReceiverBalance("");
    setCurrentStage(0);
    form.reset();
  }

  useEffect(() => {
    if (sendIsConfirming) {
      setTimeout(() => {
        setSendIsConfirming(false);
      }, 1000);
    }
  }, [sendIsConfirming]);

  return (
    <div className="flex flex-col gap-4 mt-4">
      <p>
        Để bắt đầu, bạn cần tạo một tài khoản ví. Nhấn nút dưới đây để khởi tạo
        ra một cặp khóa bí mật (private key) và địa chỉ ví. Mnemonic là một
        chuỗi các từ được sử dụng để tạo ra private key; đặc điểm của mnemonic
        là dễ nhớ hơn private key. Bạn có thể nhấn các nút Tạo nhiều lần.
      </p>
      <Button
        className="w-fit self-end hover:cursor-pointer"
        onClick={handleResetDemo}
      >
        Thử lại
      </Button>
      <div className="flex flex-row gap-2">
        <Button
          className="w-fit self-end hover:cursor-pointer"
          onClick={() => setText(generatePrivateKey())}
        >
          Tạo private key
        </Button>
        <Button
          className="w-fit self-end hover:cursor-pointer"
          onClick={() => setText(generateMnemonic(english))}
        >
          Tạo mnemonic
        </Button>
        <Button
          className="w-fit self-end hover:cursor-pointer"
          onClick={() => setText("")}
        >
          Xoá
        </Button>
      </div>
      <Textarea placeholder="Bí mật được tạo" value={text} readOnly />
      <Textarea
        placeholder="Địa chỉ ví tương ứng"
        value={account && typeof account === "object" ? account.address : ""}
        readOnly
      />
      <p>
        Sau khi khởi tạo ví, bạn có thể gửi tài sản vào ví của mình. Bấm nút nạp
        ETH ở dưới đây để nạp ETH vào ví của bạn.
      </p>
      <h2 className="text-lg text-muted-foreground">Số dư tài khoản</h2>
      <div className="flex flex-row gap-2">
        <input
          type="number"
          placeholder="0"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          readOnly
          className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <p className="text-lg text-muted-foreground self-end">ETH</p>
        <Button
          className="w-fit self-end hover:cursor-pointer ml-4"
          onClick={() => {
            setBalance(String(Number(balance) + 10));
          }}
        >
          Nạp ETH
        </Button>
      </div>
      <h2>
        Bạn có thể gửi ETH đến địa chỉ ví của người khác, không khác nhiều với
        việc gửi đến số tài khoản ngân hàng. Bạn có thể nhập địa chỉ ví người
        nhận vào ô bên dưới, hoặc để trống để gửi ETH đến ví của DeFi.vn.
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="receiver-address" className="text-muted-foreground">
              Địa chỉ ví người nhận
            </Label>
            <Input
              id="receiver-address"
              placeholder="0xEf44d56d75E86FAF8688B8509d41d791d7548EFB"
              value={address}
              onChange={(e) => setAddress(e.target.value as Address)}
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* A type-safe field component*/}
            <form.Field
              name="sendAmount"
              validators={{
                onChange: ({ value }) =>
                  !value
                    ? "Hãy nhập số ETH gửi"
                    : Number(value) < 0
                    ? "Số ETH gửi phải lớn hơn 0"
                    : Number(value) + Number(GAS_FEE) > Number(balance)
                    ? "Số ETH gửi phải nhỏ hơn số dư tài khoản cộng phí gas"
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
          <p>
            Để gửi giao dịch, bạn phải trả cho mạng lưới Ethereum một khoản
            phí gọi là phí gas. Phí gas được tính bằng ETH. Phí gas giao động
            thường xuyên tuỳ thuộc vào tình trạng mạng lưới hiện tại.
          </p>
          <div className="flex flex-col gap-2">
            <h2 className="text-lg text-muted-foreground">Phí gas</h2>
            <div className="flex flex-row gap-2">
              <input
                type="number"
                value={GAS_FEE}
                readOnly
                className="bg-transparent text-4xl outline-none w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <p className="text-lg text-muted-foreground self-end">ETH</p>
            </div>
          </div>
          <p>
            Nhấn gửi khi bạn đã sẵn sàng và theo dõi trạng thái giao dịch.
          </p>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {([canSubmit, isSubmitting]) => (
              <Button
                size="lg"
                className="hover:cursor-pointer font-bold self-end w-full"
                type="submit"
                disabled={!canSubmit || isSubmitting || sendIsConfirming}
              >
                {sendIsConfirming ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Đang gửi...
                  </>
                ) : sendIsSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    Gửi thành công!
                  </>
                ) : (
                  <>Gửi ETH</>
                )}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
      <div className="flex flex-col gap-2">
        <div className={`flex flex-row gap-2 items-center`}>
          {currentStage === 1 ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStage > 1 ? (
            <Check className="w-4 h-4" />
          ) : (
            <CircleDashed className="w-4 h-4" />
          )}
          <p>Dùng private key để tạo ra chữ ký cho giao dịch</p>
        </div>
        <div className={`flex flex-row gap-2 items-center`}>
          {currentStage === 2 ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStage > 2 ? (
            <Check className="w-4 h-4" />
          ) : (
            <CircleDashed className="w-4 h-4" />
          )}
          <p>Gửi giao dịch đến Node (Nút) của mạng lưới Ethereum</p>
        </div>
        <div className={`flex flex-row gap-2 items-center`}>
          {currentStage === 3 ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStage > 3 ? (
            <Check className="w-4 h-4" />
          ) : (
            <CircleDashed className="w-4 h-4" />
          )}
          <p>Khối các giao dịch được khởi tạo</p>
        </div>
        <div className={`flex flex-row gap-2 items-center`}>
          {currentStage === 4 ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStage > 4 ? (
            <Check className="w-4 h-4" />
          ) : (
            <CircleDashed className="w-4 h-4" />
          )}
          <p>Khối các giao dịch được thêm vào chuỗi</p>
        </div>
        <div className={`flex flex-row gap-2 items-center`}>
          {currentStage === 5 ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : currentStage > 5 ? (
            <Check className="w-4 h-4" />
          ) : (
            <CircleDashed className="w-4 h-4" />
          )}
          <p>Khối vừa thêm vào được xác nhận bởi mạng lưới Ethereum</p>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg text-muted-foreground">Số dư ví người nhận</h2>
        <div className="flex flex-row gap-2">
          <input
            type="number"
            placeholder="0"
            value={receiverBalance}
            readOnly
            className="bg-transparent text-4xl outline-none w-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <p className="text-lg text-muted-foreground self-end">ETH</p>
        </div>
      </div>
      <Button className="w-fit self-end hover:cursor-pointer" onClick={handleResetDemo}>
        Thử lại
      </Button>
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
