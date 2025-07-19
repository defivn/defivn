"use client";

import BalanceComponent from "@/components/blockchain/balance-component";
import BlockAnimation from "@/components/blockchain/block-animation";
import StaticBlockchain from "@/components/blockchain/static-blockchain";
import ProfileCards from "@/components/profile-cards";

export default function Test() {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Test</h1>
      <BalanceComponent showReceiveAction={true} />
      <ProfileCards recipients={["Alice", "Bob", "Carol"]} />
      <BalanceComponent
        showSendAction={true}
        allowedRecipients={["Alice", "Bob", "Carol"]}
      />
      <BalanceComponent
        showSendAction={true}
        allowedRecipients={["Alice", "Bob", "Carol"]}
        disableButtonsOnPending={false}
        autoCycleRecipients={true}
        showSentCheckmarks={true}
        componentId="intro-cycling-balance"
      />
      <BlockAnimation />
      <StaticBlockchain />
    </div>
  );
}
