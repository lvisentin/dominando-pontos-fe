import { NavLink } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { userService } from "@/services/user/UserService";
import AirportSelect from "@/components/airportSelector/airportSelector";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [triggerRef, setTriggerRef] = useState<HTMLButtonElement | null>(null)

  const currentDate = new Date().toISOString().split('T')[0];

  const cabinClasses = [
    { label: 'Economica', value:"economy"},
    { label: 'Economica Premium', value:"premiumEconomy"},
    { label: 'Executiva', value:"business"},
    { label: 'Primeira Classe', value:"first"},
  ]

  const formSchema = z.object({
    departureAirport: z.string().min(3, {
      message: "Por favor, digite sua origem",
    }),
    arrivalAirport: z.string().min(3, {
      message: "Por favor, digite seu destino",
    }),
    departureDate: z.string().min(3, {
      message: "Por favor, selecione sua data",
    }),
    arrivalDate: z.string().min(3, {
      message: "Por favor, selecione sua data",
    }),
    cabinClass: z.string().min(1, {
      message: "Por favor, selecione sua cabine",
    }),
  }).refine(data => new Date(data.arrivalDate) >= new Date(data.departureDate), {
    message: "A data de volta não pode ser anterior à data de ida",
    path: ["arrivalDate"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      departureDate: "",
      arrivalDate: "",
      cabinClass: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
  
    const formattedValues = {
      ...values,
      departureDate: new Date(values.departureDate).toISOString(),
      arrivalDate: new Date(values.arrivalDate).toISOString(),
    };
  
    userService.createSavedDestinations(formattedValues)
      .then(() => toast({ description: 'Alerta cadastrado com sucesso!' }))
      .catch(() => toast({ description: 'Campos inválidos' }))
      .finally(() => setLoading(false));
  }

   return <div className="flex flex-col text-left">
    <header className="flex item-center justify-between">
      <div className="prose">
        <h1 className="text-base mb-2 font-bold">Criar novo alerta de passagem</h1>
        <h2 className="text-base mb-4">Insira as informações da viagem que você deseja ser alertado.</h2>
      </div>

      <NavLink to={'/alerts'}>
        <Button className="mt-5 mr-5">Voltar</Button>
      </NavLink>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>Buscar Passagem</CardTitle>
      </CardHeader>
      
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardContent className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="departureAirport"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pb-1">Origem</FormLabel>
                    <AirportSelect
                      value={field.value}
                      onSelect={(value) => form.setValue("departureAirport", value)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalAirport"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pb-1">Destino</FormLabel>
                    <AirportSelect
                      value={field.value}
                      onSelect={(value) => form.setValue("arrivalAirport", value)}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departureDate"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Data de ida</FormLabel>
                    <FormControl>
                      <Input className="w-[170px]" type="date" min={currentDate} max={form.watch('arrivalDate')} placeholder="Selecione uma unidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrivalDate"
                render={({ field }) => (
                  <FormItem className="text-left">
                    <FormLabel>Data de volta</FormLabel>
                    <FormControl>
                      <Input className="w-[170px]" type="date" min={form.watch('departureDate') || currentDate} placeholder="Selecione uma unidade" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* <FormField
                control={form.control}
                name="cabinClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabine</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a cabine" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="economy">Economica</SelectItem>
                        <SelectItem value="premiumEconomy">Economica Premium</SelectItem>
                        <SelectItem value="business">Executiva</SelectItem>
                        <SelectItem value="first">Primeira Classe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

              <FormField
                control={form.control}
                name="cabinClass"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cabine</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild ref={(elementRef) => { 
                            setTriggerRef(elementRef)
                        }}>
                        <Button
                          variant="outline"
                          role="select"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? cabinClasses.find(
                                (cabinClass) => cabinClass.value === field.value
                              )?.label
                            : "Selecione a cabine"}
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
                                onSelect={() => {
                                  form.setValue("cabinClass", cabinClass.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    cabinClass.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {cabinClass.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>

            <CardFooter className="flex">
              <LoadingButton loading={loading} text={'Criar Alerta'} type="submit" />
            </CardFooter>
          </form>
        </Form>
    </Card>
  </div>
}

export default Alerts;