"use client";

import { ArrowDownIcon, ArrowRightIcon, CircleCheck } from "lucide-react";
import React, { useState, useEffect } from "react";

// Static Blockchain Component
const StaticBlockchain: React.FC = () => {
  const [pulseIndex, setPulseIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % 4);
    }, 1500); // Pulse every 1.5 seconds

    return () => clearInterval(interval);
  }, []);

  // Simplified mobile data - only 3 blocks with 1-2 transactions each
  const mobileBlockData = [
    {
      blockNumber: 1,
      transactions: [{ from: "Alice", to: "Bob", amount: 0.05 }],
    },
    {
      blockNumber: 2,
      transactions: [{ from: "Bob", to: "Carol", amount: 0.02 }],
    },
    {
      blockNumber: 3,
      transactions: [{ from: "Carol", to: "Alice", amount: 0.01 }],
    },
  ];

  // Mock transaction data for each block
  const blockData = [
    {
      blockNumber: 1,
      transactions: [
        { from: "Alice", to: "Bob", amount: 0.05 },
        { from: "Carol", to: "Alice", amount: 0.02 },
        { from: "Bob", to: "Carol", amount: 0.01 },
      ],
    },
    {
      blockNumber: 2,
      transactions: [
        { from: "Bob", to: "Alice", amount: 0.03 },
        { from: "Alice", to: "Carol", amount: 0.01 },
      ],
    },
    {
      blockNumber: 3,
      transactions: [
        { from: "Carol", to: "Bob", amount: 0.04 },
        { from: "Alice", to: "Bob", amount: 0.02 },
        { from: "Bob", to: "Carol", amount: 0.01 },
      ],
    },
    {
      blockNumber: 4,
      transactions: [
        { from: "Bob", to: "Alice", amount: 0.06 },
        { from: "Carol", to: "Alice", amount: 0.01 },
      ],
    },
  ];

  return (
    <div className="w-full">
      {/* Desktop Layout */}
      <div className="hidden md:flex items-center justify-center space-x-4">
        {blockData.map((block, index) => (
          <React.Fragment key={block.blockNumber}>
            {/* Block */}
            <div
              className={`bg-card border rounded-lg p-4 w-48 h-66 flex flex-col transition-all duration-500 ${
                pulseIndex === index
                  ? "ring-2 ring-blue-400 ring-opacity-75 shadow-lg shadow-blue-400/25"
                  : ""
              }`}
            >
              <div className="flex items-center justify-center mb-3 space-x-2">
                <h4 className="font-semibold">Khối #{block.blockNumber}</h4>
                <CircleCheck className="size-4 text-green-500" />
              </div>

              <div className="flex-1 space-y-2">
                {block.transactions.map((tx, txIndex) => (
                  <div
                    key={txIndex}
                    className="bg-accent rounded p-2 text-xs text-foreground"
                  >
                    <div className="truncate text-foreground">
                      <span className="">{tx.from}</span>
                      <span className="text-muted-foreground mx-1">
                        <ArrowRightIcon className="size-2 inline-block" />
                      </span>
                      <span className="">{tx.to}</span>
                    </div>
                    <div className="text-foreground font-bold">
                      {tx.amount.toFixed(4)} ETH
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chain Connector - Vertically Centered */}
            {index < blockData.length - 1 && (
              <ArrowRightIcon className="size-6" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile Layout - Simplified with 3 blocks */}
      <div className="md:hidden">
        <div className="flex justify-center space-x-2 px-2">
          {mobileBlockData.map((block, index) => (
            <React.Fragment key={block.blockNumber}>
              {/* Block */}
              <div
                className={`bg-card border rounded-lg p-2 flex-1  flex flex-col transition-all duration-500 ${
                  pulseIndex === index
                    ? "ring-2 ring-blue-400 ring-opacity-75 shadow-lg shadow-blue-400/25 scale-105"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center mb-1 space-x-1">
                  <h3 className="text-xs font-semibold">
                    Khối #{block.blockNumber}
                  </h3>
                  <CircleCheck className="size-3 text-green-500" />
                </div>

                <div className="flex-1 space-y-1">
                  {block.transactions.map((tx, txIndex) => (
                    <div
                      key={txIndex}
                      className="bg-accent rounded p-1 text-xs text-foreground text-center"
                    >
                      <div className="text-muted-foreground text-xs leading-tight">
                        <div className="text-foreground truncate">
                          {tx.from}
                        </div>
                        <div className="text-muted-foreground text-center">
                          <ArrowDownIcon className="size-2 inline-block" />
                        </div>
                        <div className="text-foreground truncate">{tx.to}</div>
                      </div>
                      <div className="text-foreground font-bold text-xs text-center mt-0.5">
                        {tx.amount.toFixed(2)} ETH
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chain Connector for Mobile - Vertically Centered */}
              {index < mobileBlockData.length - 1 && (
                <div className="flex items-center justify-center w-4 h-32">
                  <div className="w-3 h-0.5 bg-gray-600"></div>
                  <div className="w-0 h-0 border-l-1 border-l-gray-600 border-t-0.5 border-t-transparent border-b-0.5 border-b-transparent"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaticBlockchain;
