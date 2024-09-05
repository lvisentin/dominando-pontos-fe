import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { categoriesService } from "@/services/categories/CategoriesService";
import { Check, ChevronsUpDown } from "lucide-react";
import { useEffect, useState } from "react";

interface AlertCategorySelectProps {
  value: string;
  onSelect: (value: number) => void;
  disabled: boolean;
}

const AlertCategorySelect = ({ value, onSelect, disabled }: AlertCategorySelectProps) => {
  const { toast } = useToast();

  const [categories, setCategories] = useState<any>([]);
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null)

  const fetchCategories = () => {
    categoriesService
      .listAll()
      .then((r) => {
        setCategories(r.sort((a, b) => a.id - b.id));
      })
      .catch(() => toast({ description: "Ocorreu um erro" }))
  };

  const handleSelectedCategory = (category: number) => {
    onSelect(category)
    triggerRef?.click()
  }

  useEffect(() => { fetchCategories(); }, [])

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
            ? categories.find(
              (category) => category.id === value
            )?.name
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
            {categories.map((category) => (
              <CommandItem
                value={category.name}
                key={category.id}
                onSelect={() => handleSelectedCategory(category.id)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    category.id === value ? "opacity-100" : "opacity-0"
                  )}
                />
                {category.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default AlertCategorySelect;
