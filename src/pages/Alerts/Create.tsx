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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import LoadingButton from "@/components/LoadingButton/LoadingButton";
// import { airportsService } from "@/services/airports/AirportsService";
// import { Airports } from "@/services/airports/airports.model";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { userService } from "@/services/user/UserService";
import { User } from "@/services/user/user.model";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  // const [airports, setAirports] = useState<Airports[]>([]);

  // const fetchAirports = () => {
  //   setLoading(true);
  //   airportsService.getAirports()
  //     .then((r) => {
  //       setAirports(r);
  //     })
  //     .catch(() => toast({ description: 'Ocorreu um erro ao carregar os aeroportos' }))
  //     .finally(() => setLoading(false))
  // }

  // useEffect(() => {
  //   fetchAirports();
  // }, [])

  // console.log(airports);

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
  
    // Convert Date objects to ISO string format
    const formattedValues = {
      ...values,
      departureDate: new Date(values.departureDate).toISOString(),
      arrivalDate: new Date(values.arrivalDate).toISOString(),
    };
  
    userService.createSavedDestinations(formattedValues)
      .then((r: User) => {
        console.log(r);
      })
      .catch(() => toast({ description: 'Campos inválidos' }))
      .finally(() => setLoading(false));
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardContent className="grid grid-cols-2 gap-4">
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
                        <Input type="date" min={currentDate} placeholder="Selecione a unidade" {...field} />
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
                        <Input type="date" min={form.watch('departureDate')} placeholder="Selecione a unidade" {...field} />
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
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