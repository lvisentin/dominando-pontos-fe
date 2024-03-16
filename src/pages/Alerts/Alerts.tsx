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

const Alerts = () => {
  const [loading, setLoading] = useState(false);
  const [savedDestinations, setSavedDestinations] = useState<User[]>([]);
  const { toast } = useToast();

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
      name: "Origem",
    },
    {
      field: "arrivalAirport",
      name: "Destino",
    },
    {
      field: "departureDate",
      name: "Data de saida",
      transformData: (user: User) => {
        return convertDateToGMT3(user.departureDate);
      },
    },
    {
      field: "arrivalDate",
      name: "Data de chegada",
      transformData: (user: User) => {
        return convertDateToGMT3(user.arrivalDate);
      },
    },
    {
      field: "status",
      name: "Status",
      transformData: () => {
        return 'Ativo'
      }
    },
  ]


  return <div className="flex flex-col text-left ">
    <header className="flex item-center justify-between">
      <div className="prose">
        <h1 className="text-base mb-2 font-bold">Alertas de passagens</h1>
        <h2 className="text-base mb-4">Insira os dados das passagens que você gostaria de receber alertas.</h2>
      </div>

      <NavLink to={'/alerts/create'}>
        <Button className="mt-5 mr-10">Novo alerta</Button>
      </NavLink>
    </header>

    {loading ? <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" /> : <DataTable columns={columns} data={savedDestinations} />}

  </div>
}

export default Alerts;