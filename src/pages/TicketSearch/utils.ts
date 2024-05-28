import { TableColumn } from "@/components/DataTable/DataTable.model";

export const ticketSearchTableColumns: TableColumn[] = [
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

export const ticketSearchTableData = [
  {
    origin: 'VCP',
    destiny: 'GRU',
    startTime: '12/03 11:43',
    endTime: '16/03 10:43',
    flyTime: '3 horas',
    aerea: 'Azul',
    cust: 'R$ 1.103,00'
  }
]