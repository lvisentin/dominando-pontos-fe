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
import { airportsService } from "@/services/airports/AirportsService";
import { Airports } from "@/services/airports/airports.model";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";

const Alerts = () => {
  // const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const [airports, setAirports] = useState<Airports[]>([]);

  const fetchAirports = () => {
    // setLoading(true);
    airportsService.getAirports()
      .then((r) => {
        setAirports(r);
      })
      .catch(() => toast({ description: 'Ocorreu um erro ao carregar os aeroportos' }))
      // .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchAirports();
  }, [])

  console.log(airports);

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
  })

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
    // setLoading(true);
    console.log(values)
    // getAirports.getAirports({ data }).then((r: Airports) => {
    //   console.log(data);
    // }).catch(() => toast({ description: 'Campos inválidos' })).finally(() => setLoading(false))
  }

   return <div className="flex flex-col text-left ">
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
          <form onSubmit={form.handleSubmit(onSubmit)} className=" gap-4 w-full max-w-md flex flex-col">
            <CardContent className="grid grid-cols-1 gap-4">
                <FormField
                  control={form.control}
                  name="departureAirport"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Origem</FormLabel>
                      <FormControl>
                        <Input placeholder="Selecione a unidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="arrivalAirport"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Destino</FormLabel>
                      <FormControl>
                        <Input placeholder="Selecione a unidade" {...field} />
                      </FormControl>
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
                        <Input type="date" placeholder="Selecione a unidade" {...field} />
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
                        <Input type="date" placeholder="Selecione a unidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cabinClass"
                  render={({ field }) => (
                    <FormItem className="text-left">
                      <FormLabel>Cabine</FormLabel>
                      <FormControl>
                        <Input placeholder="Selecione a unidade" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </CardContent>

            <CardFooter className="flex">
              {/* <Button type="submit">Criar Alerta</Button> */}
              <LoadingButton text={'Criar Alerta'} type="submit" />
            </CardFooter>
          </form>
        </Form>
    </Card>
  </div>
}

export default Alerts;