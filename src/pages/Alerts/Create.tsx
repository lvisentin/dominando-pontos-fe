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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { userService } from "@/services/user/UserService";
import AirportSelect from "@/components/AirportSelect/AirportSelect";
import CabinClassSelect from "@/components/CabinClassSelect/CabinClassSelect";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const currentDate = new Date().toISOString().split('T')[0];

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
        <Button className="ml-4 md:ml-0">Voltar</Button>
      </NavLink>
    </header>

    <Card>
      <CardHeader>
        <CardTitle>Buscar Passagem</CardTitle>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <CardContent className="grid  grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Input type="date" min={currentDate} max={form.watch('arrivalDate')} placeholder="Selecione uma unidade" {...field} />
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
                    <Input type="date" min={form.watch('departureDate') || currentDate} placeholder="Selecione uma unidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cabinClass"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cabine</FormLabel>
                  <CabinClassSelect
                    value={field.value}
                    onSelect={(value) => form.setValue("cabinClass", value)}
                  />
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