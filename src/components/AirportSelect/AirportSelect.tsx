import { useState, useEffect, useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandLoading } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { airportsService } from "@/services/airports/AirportsService";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface AirportSelectProps {
  value: string;
  onSelect: (value: string) => void;
}

const AirportSelect = ({ value, onSelect }: AirportSelectProps) => {
  const [loading, setLoading] = useState(false);
  const [airports, setAirports] = useState<{ value: string; label: string; }[]>([]);
  const { toast } = useToast();
  const [searchInput, setSearchInput] = useState('');
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null)

  const fetchAirports = useCallback(() => {
    setLoading(true);
    airportsService.getAirports({ search: searchInput })
      .then((res) => {
        const airportsWithOptions = res.map((airport) => ({
          value: airport.code,
          label: `${airport.code} - ${airport.name}`
        }));
        setAirports(airportsWithOptions);
      })
      .catch(() => toast({ description: 'Ocorreu um erro ao carregar os aeroportos' }))
      .finally(() => setLoading(false));
  }, [searchInput, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAirports();
    }, 2000);

    return () => clearTimeout(timer);
  }, [searchInput, fetchAirports]);

  return (
    <Popover>
      <PopoverTrigger asChild ref={(elementRef) => { 
            setTriggerRef(elementRef)
        }}>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            "w-full  justify-between",
            !value && "text-muted-foreground"
          )}
        >
          {value ? airports.find((airport) => airport.value === value)?.label : "Selecione a unidade"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[400-px] w-full p-0" style={{
        minWidth: triggerRef?.clientWidth ?? 400,
        width: triggerRef?.clientWidth ?? undefined,
      }}>
        <Command>
          <CommandInput onChangeCapture={(e) => setSearchInput(e.currentTarget.value)} placeholder="Selecione a unidade" />
          { loading && <CommandLoading>Carregando os aeroportos...</CommandLoading> }
          { !loading && <CommandEmpty className="pr-2 pl-2">
            { searchInput.length <= 1 ? 'Digite pelo menos 2 caracteres' : 'Nenhum aeroporto encontrado.'}
            </CommandEmpty>}
          <CommandGroup className="max-h-[200px] overflow-y-auto">
            {airports.map((airport) => (
              <CommandItem
                value={airport.label}
                key={airport.value}
                onSelect={() => onSelect(airport.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    airport.value === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {airport.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AirportSelect;
