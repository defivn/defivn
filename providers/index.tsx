import { BlockchainProvider } from "@/contexts/blockchain-context";
import React from "react";
import { PostHogProvider } from "./posthog-providers";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      <BlockchainProvider>{children}</BlockchainProvider>
    </PostHogProvider>
  );
}
