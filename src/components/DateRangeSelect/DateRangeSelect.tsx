import { Calendar as CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { formatSelectedRangeDate } from "./utils";

type DateRangeSelect = {
  className?: string;
  date: any;
  setDate: any;
  min: any;
  disabled: boolean;
  mode?: "default" | "multiple" | "single" | "range"
}

export const DateRangeSelect = ({
  className,
  date,
  setDate,
  min,
  disabled,
  mode = "range"
}: DateRangeSelect) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            disabled={disabled}
            id="date"
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {formatSelectedRangeDate({ date, mode })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            disabled={disabled}
            initialFocus
            mode={mode}
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            fromDate={min}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
