import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { z } from "zod";

import AirportSelect from "@/components/AirportSelect/AirportSelect";
import CabinClassSelect from "@/components/CabinClassSelect/CabinClassSelect";
import { DateRangeSelect } from "@/components/DateRangeSelect/DateRangeSelect";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import {
  CreateFlightCalendarRequest,
  CreateSavedDestinationsRequest,
  userService,
} from "@/services/user/UserService";
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { getArrayOfDates } from "@/lib/utils";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [departureDate, setDepartureDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [arrivalDate, setArrivalDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const changeDepartureDate = (val: any) => {
    setDepartureDate(val);
    setArrivalDate({ from: undefined, to: undefined });
  };

  const formSchema = z.object({
    departureAirport: z.string().min(3, {
      message: "Por favor, digite sua origem",
    }),
    arrivalAirport: z.string().min(3, {
      message: "Por favor, digite seu destino",
    }),
    cabinClass: z.string().min(1, {
      message: "Por favor, selecione sua cabine",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      cabinClass: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (departureDate?.to || arrivalDate?.to) {
      const departureDates = getArrayOfDates(
        departureDate?.from,
        departureDate?.to
      );
      const returnDates = getArrayOfDates(arrivalDate?.from, arrivalDate?.to);

      const payload: CreateFlightCalendarRequest = {
        ...values,
        dates: {
          departureDates,
          returnDates,
        },
      };

      return userService
        .createFlightCalendar(payload)
        .then(() => toast({ description: "Alerta cadastrado com sucesso!" }))
        .catch(() => toast({ description: "Campos inválidos" }))
        .finally(() => setLoading(false));
    }

    const payload: CreateSavedDestinationsRequest = {
      ...values,
      departureDate: departureDate?.from?.toISOString()!,
      arrivalDate: arrivalDate?.from?.toISOString()!,
    };

    return userService
      .createSavedDestinations(payload)
      .then(() => toast({ description: "Alerta cadastrado com sucesso!" }))
      .catch(() => toast({ description: "Campos inválidos" }))
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex flex-col text-left">
      <header className="flex item-center justify-between">
        <div className="prose">
          <h1 className="text-base mb-2 font-bold">
            Criar novo alerta de passagem
          </h1>
          <h2 className="text-base mb-4">
            Insira as informações da viagem que você deseja ser alertado.
          </h2>
        </div>

        <NavLink to={"/alerts"}>
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
                      onSelect={(value) =>
                        form.setValue("departureAirport", value)
                      }
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
                      onSelect={(value) =>
                        form.setValue("arrivalAirport", value)
                      }
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <FormLabel>Data de Ida</FormLabel>
                <DateRangeSelect
                  disabled={false}
                  min={new Date()}
                  date={departureDate}
                  setDate={changeDepartureDate}
                  className="w-full mt-2"
                />
              </div>

              <div>
                <FormLabel>Data de Volta</FormLabel>
                <DateRangeSelect
                  disabled={!departureDate?.from}
                  date={arrivalDate}
                  min={departureDate?.from}
                  setDate={setArrivalDate}
                  className="w-full md:w-full mt-2"
                />
              </div>

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

            <CardFooter className="flex flex-col justify-start text-left items-start">
              {(departureDate?.to || arrivalDate?.to) && (
                <p className="text-red-500 font-bold text-sm mb-4">
                  "Você receberá somente alertas da Smiles para esse voo. Para
                  receber alertas Azul, selecione somente uma data de ida e uma
                  de volta"
                </p>
              )}

              <LoadingButton
                loading={loading}
                text={"Criar Alerta"}
                type="submit"
              />
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default Alerts;
