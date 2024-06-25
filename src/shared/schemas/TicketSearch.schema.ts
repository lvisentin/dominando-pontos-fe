import { z } from "zod";

export const TicketSearchSchema = z.object({
  departureAirport: z.string(),
  arrivalAirport: z.string(),
  cabinClass: z.string()
});