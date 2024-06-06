import { TableColumn } from "@/components/DataTable/DataTable.model";

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