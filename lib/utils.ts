import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string) {
  // text is in vietnamese so we need to remove all diacritics
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/Đ/g, 'D').toLowerCase()
  // replace all spaces with hyphens
  .replace(/ /g, '-')
}

export function shortenTitle(title: string, maxLength: number = 35) {
  return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
}