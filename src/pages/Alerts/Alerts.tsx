import DataTable from "@/components/DataTable/DataTable";
import { TableColumn } from "@/components/DataTable/DataTable.model";
import NoData from "@/components/NoData/NoData";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/components/ui/use-toast";
import { FlightCalendar, userService } from "@/services/user/UserService";
import { User } from "@/services/user/user.model";
import convertDateToGMT3 from "@/shared/utils/convertDateToGMT3";
import { ChevronsUpDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState<User[]>([]);
  const [flightCalendars, setFlightCalendars] = useState<FlightCalendar[]>([]);
  const { toast } = useToast();

  const [savedDestinationsOpen, setSavedDestinationsOpen] = useState(false);
  const [flightCalendarsOpen, setFlightCalendarsOpen] = useState(false);

  // const deleteAlert = (alertId: number) => {
  //   alertsService
  //     .deleteSavedDestination(alertId)
  //     .then(() => {
  //       fetchSavedDestinations();
  //       toast({ description: "Alerta deletado com sucesso" });
  //     })
  //     .catch(() => toast({ description: "Ocorreu um erro" }));
  // };

  const fetchSavedDestinations = () => {
    setLoading(true);
    userService
      .listSavedDestinations()
      .then((r) => {
        console.log("savedDestinations", r);
        setSavedDestinations(r);
      })
      .catch(() => toast({ description: "Ocorreu um erro" }))
      .finally(() => setLoading(false));
  };

  const fetchFlightCalendars = () => {
    setLoading(true);
    userService
      .listFlightCalendars()
      .then((r) => {
        setFlightCalendars(r);
      })
      .catch(() => toast({ description: "Ocorreu um erro" }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchSavedDestinations();
    fetchFlightCalendars();
  }, []);

  const columns: TableColumn[] = [
    {
      field: "departureAirport",
      name: "Detalhes",
      transformData: (row) => {
        return `${row.departureAirport} ➡️ ${row.arrivalAirport
          } em ${convertDateToGMT3(row.departureDate)}`;
      },
    },
    {
      field: "status",
      name: "Status",
      transformData: () => {
        return "Ativo";
      },
    },
  ];

  const fcColumns: TableColumn[] = [
    {
      field: "departureAirport",
      name: "Detalhes",
      transformData: (row) => {
        return `${row.departureAirport} ➡️ ${row.arrivalAirport
          } em ${row.userSavedDestinations
            .map((usd: any) => convertDateToGMT3(usd.departureDate))
            .join(", ")}`;
      },
    },
    {
      field: "status",
      name: "Status",
      transformData: () => {
        return "Ativo";
      },
    },
  ];

  return (
    <div className="flex flex-col text-left w-full">
      <header className="flex item-center justify-between">
        <div className="prose">
          <h1 className="text-base mb-2 font-bold">Alertas de passagens</h1>
          <h2 className="text-base mb-4">
            Insira os dados das passagens que você gostaria de receber alertas.
          </h2>
        </div>

        <NavLink to={"/alerts/create"}>
          <Button className="ml-4 md:ml-0">Novo alerta</Button>
        </NavLink>
      </header>

      <Collapsible
        open={savedDestinationsOpen}
        onOpenChange={setSavedDestinationsOpen}
        className="space-y-2"
      >
        <div className="flex items-center justify-between space-x-4 px-4 bg-white rounded-lg p-4">
          <h4 className="text-sm font-semibold">Alertas de voo</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {savedDestinations.length > 0 ? (
            loading ? (
              <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" />
            ) : (
              <DataTable
                columns={columns}
                data={savedDestinations}
              // handleDeleteClick={(alert) => deleteAlert(alert.id)}
              />
            )
          ) : (
            <NoData message={"Não encontramos nenhuma operação cadastrada"} />
          )}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible
        open={flightCalendarsOpen}
        onOpenChange={setFlightCalendarsOpen}
        className="space-y-2 mt-4"
      >
        <div className="flex items-center justify-between space-x-4 px-4 bg-white rounded-lg p-4">
          <h4 className="text-sm font-semibold">Alerta de Calendários</h4>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-9 p-0">
              <ChevronsUpDown className="h-4 w-4" />
              <span className="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          {flightCalendars.length > 0 ? (
            loading ? (
              <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" />
            ) : (
              <DataTable
                columns={fcColumns}
                data={flightCalendars}
              // handleDeleteClick={(alert) => deleteAlert(alert.id)}
              />
            )
          ) : (
            <NoData message={"Não encontramos nenhuma operação cadastrada"} />
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default Alerts;
