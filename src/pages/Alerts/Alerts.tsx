import { NavLink } from "react-router-dom";
import DataTable from "@/components/DataTable/DataTable";
import { TableColumn } from "@/components/DataTable/DataTable.model";
import { useToast } from "@/components/ui/use-toast";
import { userService } from "@/services/user/UserService";
import { User } from "@/services/user/user.model";
import convertDateToGMT3 from "@/shared/utils/convertDateToGMT3";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import NoData from "@/components/NoData/NoData";
import { alertsService } from "@/services/alerts/AlertsService";

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState<User[]>([]);
  const { toast } = useToast();

  const deleteAlert = (alertId: number) => {
    alertsService.deleteSavedDestination(alertId)
      .then(() => {
        fetchSavedDestinations();
        toast({ description: 'Alerta deletado com sucesso' })
      })
      .catch(() => toast({ description: 'Ocorreu um erro' }))
  }

  const fetchSavedDestinations = () => {
    setLoading(true);
    userService.listSavedDestinations()
      .then((r) => {
        setSavedDestinations(r)
      })
      .catch(() => toast({ description: 'Ocorreu um erro' }))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchSavedDestinations(); 
  }, [])

  const columns: TableColumn[] = [
    {
      field: "departureAirport",
      name: "Detalhes",
      transformData: (row) => {
        return `${row.departureAirport} ➡️ ${row.arrivalAirport} em ${convertDateToGMT3(row.departureDate)}`
      }
    },
    {
      field: "status",
      name: "Status",
      transformData: () => {
        return 'Ativo'
      }
    },
  ]

  return <div className="flex flex-col text-left w-full">
    <header className="flex item-center justify-between">
      <div className="prose">
        <h1 className="text-base mb-2 font-bold">Alertas de passagens</h1>
        <h2 className="text-base mb-4">Insira os dados das passagens que você gostaria de receber alertas.</h2>
      </div>

      <NavLink to={'/alerts/create'}>
        <Button className="ml-4 md:ml-0">Novo alerta</Button>
      </NavLink>
    </header>

    {
      savedDestinations.length > 0
        ? loading ? <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" /> : <DataTable columns={columns} data={savedDestinations} handleDeleteClick={(alert) => deleteAlert(alert.id)} />
        : <NoData message={'Não encontramos nenhuma operação cadastrada'} />
    }
  </div>
}

export default Alerts;