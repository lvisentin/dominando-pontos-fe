import { format } from "date-fns"

type formatSelectedRangeDate = {
  date?: any
  mode: "default" | "multiple" | "single" | "range"
}

export const formatSelectedRangeDate = ({ date, mode }: formatSelectedRangeDate): string => {
  if (mode === 'single') {
    return date ? format(date, "LLL dd, y") : 'Pick a date'
  }

  const formattedDateFrom = date?.from ? format(date.from, "LLL dd, y") : 'Pick a date'
  const formattedDateTo = date?.to ? ` - ${format(date.to, "LLL dd, y")}` : ''

  return `${formattedDateFrom}${formattedDateTo}`
}