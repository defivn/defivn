"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export default function CustomBreadcrumb() {
  // function shortenTitle(title: string) {
  //   // if the title is longer than 20 characters, shorten it
  //   if (title.length > 20) {
  //     return title.substring(0, 20) + "...";
  //   }
  //   return title;
  // }

  return (
    <Breadcrumb className="mb-8 mt-4 hidden lg:block">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink className="flex flex-row items-center gap-2" href="/">
            <Home className="w-4 h-4" />
            Trang chủ
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>...</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
