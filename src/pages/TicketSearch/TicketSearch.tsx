import AirportSelect from "@/components/AirportSelect/AirportSelect";
import DataTable from "@/components/DataTable/DataTable";
import { DateRangeSelect } from "@/components/DateRangeSelect/DateRangeSelect";
import LoadingButton from "@/components/LoadingButton/LoadingButton";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { flightsService } from "@/services/Flights/FlightsService";
import { convertDateWithHours } from "@/shared/utils/convertDateWithHours";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ticketSearchTableColumns } from "./utils";

const TicketSearch = () => {
  const [loading, setLoading] = useState(false);
  const [flights, setFlights] = useState([]);
  const limit = 10;

  const fetchAllFlights = async () => {
    const result = await flightsService.getAllFlights({ limit, page: 1 });

    setFlights(
      result.map((flight: any) => ({
        ...flight,
        departureDate: convertDateWithHours(flight.departureDate),
        arrivalDate: convertDateWithHours(flight.arrivalDate),
      }))
    );
  };

  useEffect(() => {
    fetchAllFlights();
  }, []);

  const form = useForm({
    // TODO: consertar isso
    // <z.infer<typeof TicketSearchSchema>>
    // resolver: zodResolver(TicketSearchSchema),
    defaultValues: {
      departureAirport: "",
      arrivalAirport: "",
      cabinClass: undefined,
      date: undefined,
    },
  });

  async function fetchFilteredFlights(page: number = 1) {
    try {
      const { date, ...formData } = form.getValues();
      let result: any = [];
      setLoading(true);

      const params = {
        departureAirport: formData.departureAirport ? formData.departureAirport : undefined,
        cabinClass: (formData.cabinClass && formData.cabinClass !== 'all') ? formData.cabinClass : undefined,
        arrivalAirport: formData.arrivalAirport ? formData.arrivalAirport : undefined,
        departureDate: date ? date.toISOString().split('T')[0] : undefined,
        page: 1,
        limit,
      }

      if (!formData.arrivalAirport && !formData.departureAirport && !formData.cabinClass && !date) {
        result = await flightsService.getAllFlights({ limit, page });
      } else {
        result = await flightsService.getFlights({
          ...params,
          page,
          limit,
        });
      }

      setFlights(
        result.map((flight: any) => ({
          ...flight,
          departureDate: convertDateWithHours(flight.departureDate),
          arrivalDate: convertDateWithHours(flight.arrivalDate),
        }))
      );
    } catch (error) {
      console.error("Error fetching flights:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col text-left ">
      <h1 className="text-base mb-2 font-bold">Busca por passagens</h1>
      <h2 className="text-base mb-4">
        Busque o destino que você deseja ir e veja as disponibilidades em nosso
        sistema.
      </h2>

      <Card className="pt-6 mb-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => fetchFilteredFlights())}
            className="w-full"
          >
            <CardContent className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
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
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="pb-1">Data</FormLabel>
                    <DateRangeSelect
                      disabled={false}
                      min={new Date()}
                      date={field.value}
                      setDate={(date: any) => form.setValue("date", date)}
                      mode="single"
                      className="w-full mt-2"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <LoadingButton loading={loading} text="Buscar" type="submit" />
            </CardContent>
          </form>
        </Form>
      </Card>

      <DataTable
        pagination
        onPageNavigation={fetchFilteredFlights}
        isNavigationDisabled={flights?.length < 10}
        columns={ticketSearchTableColumns}
        data={flights}
      />
    </div>
  );
};

export default TicketSearch;
