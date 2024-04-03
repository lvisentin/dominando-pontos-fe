import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getArrayOfDates(from: any, to: any): string[] {
  console.log(from)
  const daysArray: string[] = [];

  for (let date = from; date <= to; date.setDate(date.getDate() + 1)) {
    daysArray.push(new Date(date).toISOString());
  }

  return daysArray;
}