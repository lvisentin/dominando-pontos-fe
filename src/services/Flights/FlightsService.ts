import { api } from "@/shared/api/api";

type Flight = {
  departureAirport: string
  arrivalAirport: string
  departureDate: string
}

class FlightsService {
  async getFlights({ departureAirport, arrivalAirport, departureDate }: Flight) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get(
      `flights?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&departureDate=${departureDate}&limit=100&page=1`,
      { authorization }
    )
  }
}

export const flightsService = new FlightsService();