import AirportSelect from "@/components/AirportSelect/AirportSelect";
import CabinClassSelect from "@/components/CabinClassSelect/CabinClassSelect";
import DataTable from "@/components/DataTable/DataTable";
import { DateRangeSelect } from "@/components/DateRangeSelect/DateRangeSelect";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { flightsService } from "@/services/Flights/FlightsService";
import { convertDateWithHours } from "@/shared/utils/convertDateWithHours";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ticketSearchTableColumns } from "./utils";
import { Button } from "@/components/ui/button";

const TicketSearch = () => {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const [page, setPage] = useState(1);
  const { toast } = useToast();
  const limit = 10;

  const fetchData = async () => {
    const result = await flightsService.getAllFlights({ limit, page })

    setFlights(result.map((flight: any) => ({
      ...flight,
      departureDate: convertDateWithHours(flight.departureDate),
      arrivalDate: convertDateWithHours(flight.arrivalDate)
    })))
  }

  const form = useForm({
    // TODO: consertar isso
    // <z.infer<typeof TicketSearchSchema>>
    // resolver: zodResolver(TicketSearchSchema),
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      cabinClass: 'all',
      date: undefined,
    },
  });


  useEffect(() => {
    const formData = form.getValues();

    if (!formData.arrivalAirport && !formData.departureAirport && !formData.cabinClass && !formData.date) {
      fetchData();
      return;
    }

    fetchFlights({ ...formData, page });
  }, [page])


  const fetchFlights = async ({ departureAirport, cabinClass, arrivalAirport, date, page }: any) => {
    const result = await flightsService.getFlights({
      departureAirport: departureAirport && departureAirport,
      cabinClass: (cabinClass && cabinClass !== 'all') ? cabinClass : undefined,
      arrivalAirport: arrivalAirport && arrivalAirport,
      departureDate: date && date.toISOString().split('T')[0],
      page,
      limit,
    })
      .catch(() => {
        toast({ description: "Ocorreu um erro, tente novamente" });
        return;
      })
      .finally(() => setLoading(false))

    if (!result) {
      return
    }

    setFlights(result.map((flight: any) => ({
      ...flight,
      departureDate: convertDateWithHours(flight.departureDate),
      arrivalDate: convertDateWithHours(flight.arrivalDate)
    })))

    setLoading(false)
  }

  async function onSubmit({ departureAirport, cabinClass, arrivalAirport, date }: any) {
    setLoading(true)
    setPage(1)
    fetchFlights({ departureAirport, cabinClass, arrivalAirport, date, page: 1 })
  }

  const clearFields = () => {
    // estou com sono, relevar esse código até 2a ordem
    // PERIGO ☢️☢️☢️ altos indices de chernobyl aqui
    const formData = form.getValues();

    if (!formData.arrivalAirport && !formData.departureAirport && !formData.cabinClass && !formData.date) {
      return;
    }

    form.setValue('arrivalAirport', "");
    form.setValue('departureAirport', "");
    form.setValue('cabinClass', "");
    form.setValue('date', undefined);

    const params = {
      'arrivalAirport': "",
      'departureAirport': "",
      'cabinClass': "",
      'date': undefined,
    }

    fetchFlights(params);
  }

  return (
    <div className="flex flex-col text-left ">
      <h1 className="text-base mb-2 font-bold">Busca por passagens</h1>
      <h2 className="text-base mb-4">
        Busque o destino que você deseja ir e veja as disponibilidades em nosso sistema.
      </h2>

      <Card className="pt-6 mb-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <CardContent className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-end">
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

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pb-1">Data</FormLabel>
                    <DateRangeSelect
                      disabled={false}
                      min={new Date()}
                      date={field.value}
                      setDate={(date: any) => form.setValue('date', date)}
                      mode="single"
                      className="w-full mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton
                loading={loading}
                text="Buscar"
                type="submit"
              />
              <Button onClick={clearFields} variant="outline" type="button">Limpar filtros</Button>
            </CardContent>
          </form>
        </Form>
      </Card>

      <DataTable isNavigationDisabled={flights.length < 10} page={page} limit={limit} setPage={setPage} pagination={true} columns={ticketSearchTableColumns} data={flights} />
    </div>
  );
};

export default TicketSearch;
