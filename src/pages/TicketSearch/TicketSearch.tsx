import DataTable from "@/components/DataTable/DataTable";
import { TableColumn } from "@/components/DataTable/DataTable.model";
import { Loader2 } from "lucide-react";
import { useState } from "react";

const TicketSearch = () => {
  const [loading, setLoading] = useState(false);

  const columns: TableColumn[] = [
    {
      field: "origin",
      name: "Origem",
    },
    {
      field: "destiny",
      name: "Destino"
    },
    {
      field: "startTime",
      name: "Data e hora de partida"
    },
    {
      field: "endTime",
      name: "Data e hora de chegada"
    },
    {
      field: "flyTime",
      name: "Duração do Voo"
    },
    {
      field: "aerea",
      name: "Cia aérea"
    },
    {
      field: "cust",
      name: "Custo "
    },
  ];

  const dataTable = [
    {
      origin: 'VCP',
      destiny: 'GRU',
      startTime: '12/03 11:43',
      entTime: '16/03 10:43',
      flyTime: '3 horas',
      aerea: 'Azul',
      cust: 'R$ 1.103,00'
    }
  ]

  function teste() {
    setLoading(false)
  }

  return (
    <div className="flex flex-col text-left ">
      <h1 className="text-base mb-2 font-bold">Alertas de promoções</h1>
      <h2 className="text-base mb-4">
        Selecione as categorias que você gostaria de receber alertas.
      </h2>
      <button onClick={teste}>sd</button>
      {loading ? (
        <Loader2 className="mr-2 h-12 w-12 animate-spin self-center" />
      ) : (
        <DataTable columns={columns} data={dataTable} />
      )}
    </div>
  );
};

export default TicketSearch;
