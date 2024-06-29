import { CabinBadge } from "@/components/CabinBadge/CabinBadge";
import { TableColumn } from "@/components/DataTable/DataTable.model";
import { Badge } from "@/components/ui/badge";

export const ticketSearchTableColumns: TableColumn[] = [
  {
    field: "departureAirport",
    name: "Origem",
  },
  {
    field: "arrivalAirport",
    name: "Destino"
  },
  {
    field: "departureDate",
    name: "Data e hora de partida"
  },
  {
    field: "arrivalDate",
    name: "Data e hora de chegada"
  },
  {
    field: "duration",
    name: "Duração do Voo"
  },
  {
    field: "airline",
    name: "Cia aérea"
  },
  {
    field: "cabinClass",
    name: "Cabine",
    transformData: ({ cabinClass }) => {
      return <CabinBadge cabin={cabinClass} />
    }
  },
  {
    field: "isAward",
    name: "Tipo de tarifa",
    transformData: ({ isAward }) => {
      return <Badge className={`${isAward ? 'bg-green-600' : 'bg-primary'}`}>{isAward ? '⭐️ Award ⭐️' : 'Pública'}</Badge>
    }
  },
  {
    field: "price",
    name: "Custo "
  },
];

export const ticketSearchTableData = [
  {
    departureAirport: 'VCP',
    arrivalAirport: 'GRU',
    departureDate: '12/03 11:43',
    arrivalDate: '16/03 10:43',
    duration: '3 horas',
    airline: 'Azul',
    price: 'R$ 1.103,00'
  }
]