import React from "react";
import { PostHogProvider } from "./posthog-providers";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PostHogProvider>
      {children}
    </PostHogProvider>
  );
}
