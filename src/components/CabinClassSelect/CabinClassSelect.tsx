import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CabinClassSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

const CabinClassSelect = ({ value, onSelect }: CabinClassSelectProps) => {
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null)

  const cabinClasses = [
    { label: 'Todas', value: "all"},
    { label: 'Econômica', value:"economy"},
    { label: 'Econômica Premium', value:"premiumEconomy"},
    { label: 'Executiva', value:"business"},
    { label: 'Primeira Classe', value:"first"},
  ]

  return (
    <Popover>
      <PopoverTrigger asChild ref={(elementRef) => { 
            setTriggerRef(elementRef)
        }}>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value
            ? cabinClasses.find(
                (cabinClass) => cabinClass.value === value
              )?.label
            : "Selecione uma cabine"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400-px] w-full p-0" style={{
        minWidth: triggerRef?.clientWidth ?? 400,
        width: triggerRef?.clientWidth ?? undefined,
      }}>
        <Command>
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {cabinClasses.map((cabinClass) => (
              <CommandItem
                value={cabinClass.label}
                key={cabinClass.value}
                onSelect={() => onSelect(cabinClass.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    cabinClass.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {cabinClass.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CabinClassSelect;
