import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface OrderFilterProps {
  value: string;
  onSelect: (value: string) => void;
  disabled: boolean;
}

const OrderFilter = ({ value, onSelect, disabled }: OrderFilterProps) => {
  const orderFilters = [
    {
      value: 'orderBy=updatedAt&order=desc',
      label: 'Mais novos'
    },
    {
      value: 'orderBy=updatedAt&order=asc',
      label: 'Mais antigos'
    },
    {
      value: 'orderBy=parityClub&order=asc',
      label: 'Menor pontuação'
    },
    {
      value: 'orderBy=parityClub&order=desc',
      label: 'Maior pontuação'
    },
  ]
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null)

  const handleSelectedFilter = (filter: string) => {
    onSelect(filter)
    triggerRef?.click()
  }

  return (
    <Popover>
      <PopoverTrigger asChild ref={(elementRef) => {
        setTriggerRef(elementRef)
      }}>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          className={cn(
            "w-full md:w-[250px] justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? orderFilters.find(
              (filter: any) => filter.value === value
            )?.label
            : "Ordenar por"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400-px] w-full p-0" style={{
        minWidth: triggerRef?.clientWidth ?? 400,
        width: triggerRef?.clientWidth ?? undefined,
      }}>
        <Command>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {orderFilters.map((filter: any) => (
              <CommandItem
                value={filter.value}
                key={filter.value}
                onSelect={() => handleSelectedFilter(filter.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    filter.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {filter.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default OrderFilter;
