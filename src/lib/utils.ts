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

export const getEndpointParams = (url: string, params: any) => {
  let newUrl = `${url}?`;
  
  for (const param of Object.keys(params)) {
    if (params[param]) {
      newUrl += `&${param}=${params[param]}`
    }
  }

  return newUrl
}