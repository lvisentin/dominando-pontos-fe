import { z } from "zod";

export const TicketSearchSchema = z.object({
  departureAirport: z.string().min(3, {
    message: "Por favor, digite sua origem",
  }),
  arrivalAirport: z.string().min(3, {
    message: "Por favor, digite seu destino",
  }),
  date: z.coerce.date()
});