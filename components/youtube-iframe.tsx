"use client";

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function YoutubeIframe({
  src,
  title,
}: {
  src: string;
  title: string;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const watchUrl = `https://www.youtube.com/watch?v=${src.split("/").pop()?.split("?")[0]}`;
  
  return (
    <div className="w-full aspect-video relative">
      {/* Skeleton loading state */}
      {isLoading && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-lg" />
      )}
      
      {/* Transparent overlay for click handling */}
      <a 
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        href={watchUrl}
        target="_blank"
      />
      <iframe
        width="100%"
        height="100%"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </div>
  );
}
