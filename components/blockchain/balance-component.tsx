"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useBlockchainContext } from "@/contexts/blockchain-context";
import type { Recipient } from "@/types/blockchain";
import { formatETH, formatETHTruncated } from "@/lib/blockchain/transactions";
import {
  getRecipientAddress,
  getRecipientEmoji,
} from "@/lib/blockchain/recipients";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface BalanceComponentProps {
  showSendAction?: boolean;
  showReceiveAction?: boolean;
  allowedRecipients?: Recipient[];
  className?: string;
  disableButtonsOnPending?: boolean;
  autoCycleRecipients?: boolean;
  showSentCheckmarks?: boolean;
  componentId?: string;
  useSplitter?: boolean;
  splitterAmount?: number;
  autoInitializeETH?: boolean;
  showRecipientSelection?: boolean;
}

const BalanceComponent: React.FC<BalanceComponentProps> = ({
  showSendAction = false,
  showReceiveAction = false,
  allowedRecipients = ["Alice", "Bob", "Carol"],
  className = "",
  disableButtonsOnPending = true,
  autoCycleRecipients = false,
  showSentCheckmarks = false,
  componentId,
  useSplitter = false,
  splitterAmount = 0.03,
  autoInitializeETH = false,
  showRecipientSelection = true,
}) => {
  const {
    ethereumState,
    sendMoney,
    sendToSplitter,
    receiveETH,
    transactionHistory,
  } = useBlockchainContext();

  const [selectedRecipient, setSelectedRecipient] = useState<Recipient>(
    allowedRecipients[0] || "Bob"
  );
  const [lastTransactionCount, setLastTransactionCount] = useState(0);
  const [componentTransactionIds, setComponentTransactionIds] = useState<
    Set<string>
  >(new Set());
  const [pendingSendFromComponent, setPendingSendFromComponent] = useState<{
    recipient: Recipient;
    amount: number;
    timestamp: number;
  } | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (autoInitializeETH && ethereumState.balance === 0 && !hasInitialized) {
      setHasInitialized(true);
      receiveETH();
    }
  }, [autoInitializeETH, ethereumState.balance, hasInitialized, receiveETH]);

  useEffect(() => {
    if (componentId && pendingSendFromComponent) {
      const matchingTransaction = transactionHistory.find(
        (tx) =>
          tx.type === "send" &&
          tx.chain === "ethereum" &&
          tx.recipient === pendingSendFromComponent.recipient &&
          tx.amount === pendingSendFromComponent.amount &&
          !componentTransactionIds.has(tx.id) &&
          tx.timestamp.getTime() >= pendingSendFromComponent.timestamp
      );

      if (matchingTransaction) {
        setComponentTransactionIds(
          (prev) => new Set([...prev, matchingTransaction.id])
        );
        setPendingSendFromComponent(null);
      }
    }
  }, [
    transactionHistory,
    componentId,
    pendingSendFromComponent,
    componentTransactionIds,
  ]);

  useEffect(() => {
    if (autoCycleRecipients) {
      const currentTransactionCount = transactionHistory.filter(
        (tx) => tx.type === "send" && tx.chain === "ethereum"
      ).length;

      if (currentTransactionCount > lastTransactionCount) {
        const currentIndex = allowedRecipients.indexOf(selectedRecipient);
        const nextIndex = (currentIndex + 1) % allowedRecipients.length;
        setSelectedRecipient(allowedRecipients[nextIndex]);
        setLastTransactionCount(currentTransactionCount);
      }
    }
  }, [
    transactionHistory,
    autoCycleRecipients,
    allowedRecipients,
    selectedRecipient,
    lastTransactionCount,
  ]);

  const quickSendAmounts = useSplitter ? [splitterAmount] : [0.01];

  const isPendingSendToRecipient = (recipient: Recipient) => {
    if (useSplitter) {
      return transactionHistory.some(
        (tx) =>
          tx.type === "send" &&
          tx.recipient === "Splitter" &&
          tx.status === "pending" &&
          tx.chain === "ethereum"
      );
    }
    return transactionHistory.some(
      (tx) =>
        tx.type === "send" &&
        tx.recipient === recipient &&
        tx.status === "pending" &&
        tx.chain === "ethereum"
    );
  };

  const hasSentMoneyToRecipient = (recipient: Recipient) => {
    if (!componentId) return false;

    return transactionHistory.some(
      (tx) =>
        tx.type === "send" &&
        tx.recipient === recipient &&
        tx.status === "confirmed" &&
        tx.chain === "ethereum" &&
        componentTransactionIds.has(tx.id)
    );
  };

  const handleQuickSend = (amount: number) => {
    if (amount > 0 && amount <= ethereumState.balance) {
      if (useSplitter) {
        if (componentId) {
          setPendingSendFromComponent({
            recipient: "Splitter",
            amount: amount,
            timestamp: Date.now(),
          });
        }
        sendToSplitter("ethereum", amount);
      } else {
        if (componentId) {
          setPendingSendFromComponent({
            recipient: selectedRecipient,
            amount: amount,
            timestamp: Date.now(),
          });
        }
        sendMoney("ethereum", selectedRecipient, amount);
      }
    }
  };

  return (
    <Card className={`${className}`}>
      <CardHeader>
        <CardTitle>Ví của bạn</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* User Address */}
        <div>
          <Label className="text-sm">Địa chỉ</Label>
          <div className="text-sm font-mono break-all mt-1">
            0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2
          </div>
        </div>

        {/* Main Balance */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col space-y-2">
            <Badge variant="secondary">Số dư khả dụng</Badge>
            <div className="text-3xl font-bold">
              {formatETH(ethereumState.balance)}
            </div>
          </div>
          {showReceiveAction && (
            <div className="space-y-2">
              <div>
                <Label className="text-md font-medium">Nhận ETH</Label>
              </div>
              <Button onClick={receiveETH}>Nhận 1 ETH</Button>
            </div>
          )}
        </div>

        {/* Send Action */}
        {showSendAction && (
          <div className="space-y-4">
            <div>
              <Label className="text-md font-medium">Gửi ETH</Label>
            </div>

            {showRecipientSelection ? (
              <div className="space-y-3">
                <Label className="text-sm break-all">
                  Đến:{" "}
                  {useSplitter
                    ? "Hợp đồng chia tiền"
                    : getRecipientAddress(selectedRecipient)}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {allowedRecipients.map((recipient) => {
                    const recipientBalance =
                      ethereumState.recipientBalances[recipient] || 0;
                    const hasSentMoney = hasSentMoneyToRecipient(recipient);

                    return (
                      <>
                        <Button
                          key={recipient}
                          variant={
                            selectedRecipient === recipient
                              ? "default"
                              : "outline"
                          }
                          onClick={() => setSelectedRecipient(recipient)}
                          className={`
                                w-full h-auto flex flex-col items-center space-y-1 p-3
                              `}
                        >
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {getRecipientEmoji(recipient)}
                            </span>
                            <span className="text-sm font-medium">
                              {recipient}
                            </span>
                            {showSentCheckmarks && hasSentMoney && (
                              <Check className="h-4 w-4 text-green-400" />
                            )}
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {formatETHTruncated(recipientBalance)}
                          </Badge>
                        </Button>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <Label className="text-sm text-slate-400 break-all">
                  Người nhận: Alice, Bob và Carol mỗi người sẽ nhận{" "}
                  {formatETHTruncated(splitterAmount / 3)}
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {allowedRecipients.map((recipient) => {
                    const recipientBalance =
                      ethereumState.recipientBalances[recipient] || 0;
                    const hasSentMoney = hasSentMoneyToRecipient(recipient);

                    return (
                      <>
                        <Card className="bg-slate-800 border-slate-600">
                          <CardContent className="p-3 flex flex-col items-center space-y-1">
                            <div className="flex items-center space-x-2">
                              <span className="text-lg">
                                {getRecipientEmoji(recipient)}
                              </span>
                              <span className="text-sm font-medium text-slate-300">
                                {recipient}
                              </span>
                              {showSentCheckmarks && hasSentMoney && (
                                <Check className="h-4 w-4 text-green-400" />
                              )}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {formatETHTruncated(recipientBalance)}
                            </Badge>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quick Send Buttons */}
            <div className="w-full">
              {quickSendAmounts.map((amount) => {
                const isLoading =
                  disableButtonsOnPending &&
                  isPendingSendToRecipient(selectedRecipient);
                const canAfford = amount <= ethereumState.balance;
                const shouldDisable = isLoading || !canAfford;

                return (
                  <Button
                    key={amount}
                    onClick={() => handleQuickSend(amount)}
                    disabled={shouldDisable}
                    className={`
                      w-full relative font-medium transition-all
                    `}
                  >
                    {ethereumState.balance === 0
                      ? "Không đủ số dư"
                      : shouldDisable
                      ? "Đang gửi..."
                      : useSplitter
                      ? `Gửi ${formatETHTruncated(amount)} tới Splitter`
                      : `Gửi ${formatETHTruncated(
                          amount
                        )} tới ${selectedRecipient}`}
                  </Button>
                );
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceComponent;
