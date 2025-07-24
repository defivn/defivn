"use client";

import React, { useState, useEffect, useRef } from "react";
import { Transaction, Recipient } from "@/types/blockchain";
import {
  formatETHTruncated,
  generateTransactionFee,
  generateTransactionId,
} from "@/lib/blockchain/transactions";
import CircularCountdown from "./circular-countdown";
import { Card } from "../ui/card";
import { CircleCheck } from "lucide-react";

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Test transaction generation
const generateTestTransaction = (): Transaction => {
  const recipients: Recipient[] = ["Alice", "Bob", "Carol"];
  const amounts = [0.01, 0.05, 0.1, 0.02, 0.03];

  return {
    id: generateTransactionId(),
    chain: "ethereum",
    type: "send",
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    fee: generateTransactionFee(false),
    recipient: recipients[Math.floor(Math.random() * recipients.length)],
    status: "pending",
    timestamp: new Date(),
    nonce: Math.floor(Math.random() * 1000),
  };
};

interface BlockSlotProps {
  transaction?: Transaction;
  isEmpty: boolean;
  isConfirmed: boolean;
  slotIndex: number;
}

const BlockSlot: React.FC<BlockSlotProps> = ({
  transaction,
  isEmpty,
  isConfirmed,
  slotIndex,
}) => {
  if (isEmpty) {
    return (
      <div className="h-9 sm:h-9 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
        <span className="text-gray-500 text-xs sm:text-sm">Trống</span>
      </div>
    );
  }

  if (!transaction) return null;

  const getTransactionIcon = () => {
    if (isConfirmed) {
      return <CircleCheck className="size-4 text-green-500" />;
    }

    // For pending transactions, just show a simple pending icon
    return (
      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-yellow-500 rounded-full flex items-center justify-center">
        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full animate-pulse"></div>
      </div>
    );
  };

  // Mobile-optimized transaction text
  const getMobileText = () => {
    return `${formatETHTruncated(transaction.amount)} → ${
      transaction.recipient
    }`;
  };

  const getDesktopText = () => {
    return `Gửi ${formatETHTruncated(transaction.amount)} đến ${
      transaction.recipient
    }`;
  };

  return (
    <div
      className={`h-9 sm:h-9 p-1.5 sm:p-2 rounded-lg border transition-all duration-500 ${
        isConfirmed
          ? "bg-green-900/20 border-green-500/30"
          : "bg-yellow-900/20 border-yellow-500/30"
      }`}
      style={{
        animationDelay: `${slotIndex * 200}ms`,
      }}
    >
      <div className="flex items-center space-x-2 sm:space-x-3 h-full">
        <div className="flex-shrink-0">{getTransactionIcon()}</div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            {/* Mobile text (shorter) */}
            <div className="text-xs font-medium text-gray-200 truncate sm:hidden">
              {getMobileText()}
            </div>
            {/* Desktop text (full) */}
            <div className="hidden sm:block text-xs font-medium text-gray-200 truncate">
              {getDesktopText()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface BlockContainerProps {
  transactions: Transaction[];
  isConfirmed: boolean;
  isMoving: boolean;
  blockNumber: number;
  blockStartTime?: Date;
  shouldFadeOut?: boolean;
}

const BlockContainer: React.FC<BlockContainerProps> = ({
  transactions,
  isConfirmed,
  isMoving,
  blockNumber,
  blockStartTime,
  shouldFadeOut = false,
}) => {
  const slots = Array.from({ length: 4 }, (_, index) => {
    const transaction = transactions[index];
    return (
      <BlockSlot
        key={`slot-${blockNumber}-${index}`}
        transaction={transaction}
        isEmpty={!transaction}
        isConfirmed={isConfirmed}
        slotIndex={index}
      />
    );
  });

  const getBlockIcon = () => {
    if (isConfirmed) {
      return <CircleCheck className="size-4 text-green-500" />;
    }

    if (blockStartTime && transactions.length > 0) {
      return (
        <CircularCountdown
          duration={6000}
          startTime={blockStartTime}
          size={20}
          strokeWidth={2}
          theme="ethereum"
          className="sm:w-6 sm:h-4"
          displayScale={2}
        />
      );
    }

    return null;
  };

  return (
    <div
      className={`w-full max-w-[180px] sm:max-w-sm h-[220px] sm:h-[240px] bg-gray-800 border border-gray-700 rounded-lg p-2 sm:p-4 transition-all duration-1000 ${
        isMoving
          ? "transform translate-x-[calc(-100%-16px)] sm:translate-x-[calc(-100%-34px)] opacity-50"
          : ""
      } ${shouldFadeOut ? "opacity-0" : ""}`}
    >
      {/* Mobile layout - Block # on its own line */}
      <div className="flex flex-col items-center sm:hidden mb-2">
        <p className="text-sm font-semibold text-gray-100 text-center">
          Khối #{blockNumber}
        </p>
        <div className="flex items-center justify-between gap-2 sm:gap-0">
          <div className="flex items-center justify-center flex-1">
            {getBlockIcon()}
          </div>
          <span
            className={`text-xs px-1.5 py-0.5 rounded-full ${
              isConfirmed
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {isConfirmed ? "Đã xác nhận" : "Đang xử lý"}
          </span>
        </div>
      </div>

      {/* Desktop layout - everything in one line */}
      <div className="hidden sm:flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <p className="text-lg font-semibold text-gray-100">
            Khối #{blockNumber}
          </p>
          {getBlockIcon()}
        </div>
        <span
          className={`text-xs px-2 py-1 rounded-full ${
            isConfirmed
              ? "bg-green-500/20 text-green-400"
              : "bg-yellow-500/20 text-yellow-400"
          }`}
        >
          {isConfirmed ? "Đã xác nhận" : "Đang xử lý"}
        </span>
      </div>

      <div className="space-y-1 sm:space-y-2">{slots}</div>
    </div>
  );
};

const BlockAnimation: React.FC = () => {
  // Intersection observer for viewport detection
  const { ref, isVisible } = useIntersectionObserver(0.1);

  const [currentBlock, setCurrentBlock] = useState<Transaction[]>([]);
  const [previousBlock, setPreviousBlock] = useState<Transaction[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [blockNumber, setBlockNumber] = useState(1);
  const [previousBlockNumber, setPreviousBlockNumber] = useState(0);
  const [phase, setPhase] = useState<"filling" | "confirming" | "moving">(
    "filling"
  );
  const [blockStartTime, setBlockStartTime] = useState<Date | undefined>(
    undefined
  );

  // Use useRef to prevent multiple effect runs and track timeouts
  const isRunning = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach((timeoutId) => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    // Only run animation when component is visible
    if (!isVisible) {
      clearAllTimeouts();
      isRunning.current = false;
      return;
    }

    // Prevent multiple simultaneous runs
    if (isRunning.current) return;
    isRunning.current = true;

    const runBlockCycle = () => {
      // Clear any existing timeouts before starting new cycle
      clearAllTimeouts();
      // Phase 1: Fill the block with transactions
      setPhase("filling");
      setCurrentBlock([]);
      setIsConfirmed(false);
      setIsMoving(false);
      setBlockStartTime(undefined);

      // Generate 1-4 random transactions
      const numTransactions = Math.floor(Math.random() * 4) + 1;

      // Use a closure variable to track transactions across all setTimeout callbacks
      const allTransactions: Transaction[] = [];
      let firstTransactionAdded = false;

      for (let i = 0; i < numTransactions; i++) {
        const timeoutId = setTimeout(() => {
          const newTx = generateTestTransaction();
          allTransactions.push(newTx);

          // Update state with a copy of the transactions
          setCurrentBlock([...allTransactions]);

          // Set block start time when first transaction is added
          if (!firstTransactionAdded) {
            setBlockStartTime(new Date());
            firstTransactionAdded = true;
          }
        }, i * 500);
        timeoutsRef.current.push(timeoutId as unknown as number);
      }

      // Phase 2: Wait for confirmation (6 seconds from first transaction)
      const confirmTimeout = setTimeout(() => {
        setPhase("confirming");
        setIsConfirmed(true);
      }, 6000);
      timeoutsRef.current.push(confirmTimeout as unknown as number);

      // Phase 3: Move block to the right (after 7 seconds)
      const moveTimeout = setTimeout(() => {
        setPhase("moving");
        setIsMoving(true);
      }, 7000);
      timeoutsRef.current.push(moveTimeout as unknown as number);

      // Phase 4: Complete the move and update previous block (after 9 seconds)
      const completeTimeout = setTimeout(() => {
        // Move current block to previous
        setPreviousBlock([...allTransactions]);
        setPreviousBlockNumber((prev) => prev + 1);

        // Clear current block for next cycle
        setCurrentBlock([]);
        setIsMoving(false);

        // Start next cycle after a brief pause
        const nextCycleTimeout = setTimeout(() => {
          // Increment block number for the new cycle
          setBlockNumber((prev) => prev + 1);
          runBlockCycle();
        }, 1000);
        timeoutsRef.current.push(nextCycleTimeout as unknown as number);
      }, 9000);
      timeoutsRef.current.push(completeTimeout as unknown as number);
    };

    runBlockCycle();

    // Cleanup function
    return () => {
      clearAllTimeouts();
      isRunning.current = false;
    };
  }, [isVisible]); // Run when visibility changes

  // status message
  const getStatusMessage = () => {
    switch (phase) {
      case "filling":
        return "Đang thu thập giao dịch vào khối...";
      case "confirming":
        return "Khối đã được xác nhận! Tất cả giao dịch đã xử lý.";
      case "moving":
        return "Khối đã được thêm vào blockchain. Bắt đầu khối mới...";
      default:
        return "";
    }
  };

  return (
    <Card ref={ref} className="w-full">
      <div className="p-3 sm:p-6 pb-1">
        {/* Header */}
        <div className="text-center mb-4 sm:mb-6">
          <p className="text-xl sm:text-2xl font-bold mb-2">Xây dựng khối</p>
        </div>

        {/* Two-column layout for blocks - always 2 columns, but smaller on mobile */}
        <div className="grid grid-cols-2 gap-3 sm:gap-8 mb-4 sm:mb-6">
          {/* Previous Block (if exists) */}
          <div className="space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-lg font-semibold text-center">
              Khối trước
            </p>
            <div className="flex justify-center">
              {previousBlock.length > 0 ? (
                <BlockContainer
                  transactions={previousBlock}
                  isConfirmed={true}
                  isMoving={false}
                  blockNumber={previousBlockNumber}
                  shouldFadeOut={isMoving}
                />
              ) : (
                <div className="w-full max-w-[180px] sm:max-w-sm h-[220px] sm:h-[240px] bg-accent border border-dashed rounded-lg p-2 sm:p-4 flex items-center justify-center">
                  <span className="text-muted-foreground text-xs sm:text-sm text-center">
                    Không có khối trước
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Current Block */}
          <div className="space-y-2 sm:space-y-4">
            <p className="text-sm sm:text-lg font-semibold text-center">
              Khối hiện tại
            </p>
            <div className="flex justify-center">
              <BlockContainer
                transactions={currentBlock}
                isConfirmed={isConfirmed}
                isMoving={isMoving}
                blockNumber={blockNumber}
                blockStartTime={blockStartTime}
              />
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex justify-center">
          <div className="text-white text-xs sm:text-sm bg-black bg-opacity-50 px-3 sm:px-4 py-1.5 sm:py-2 rounded">
            {getStatusMessage()}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default BlockAnimation;
