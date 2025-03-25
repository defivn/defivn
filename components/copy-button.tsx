"use client";
 
import { useState } from "react";
import { ClipboardList, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
 
export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
 
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
 
    setTimeout(() => {
      setIsCopied(false);
    }, 5000);
  };
 
  return (
    <Button variant="ghost" size="icon" disabled={isCopied} onClick={copy}>
      {isCopied ?
        <Check className="h-6 w-6" />
      : 
        <ClipboardList className="h-6 w-6" />
      }
    </Button>
  );
};