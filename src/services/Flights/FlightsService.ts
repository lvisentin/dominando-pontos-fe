import { api } from "@/shared/api/api";

type GetFlightsParams = {
  departureAirport: string
  arrivalAirport: string
  departureDate: string
  limit: number
  page: number
}

class FlightsService {
  async getFlights({ departureAirport, arrivalAirport, departureDate, limit, page }: GetFlightsParams) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get(
      `flights?departureAirport=${departureAirport}&arrivalAirport=${arrivalAirport}&departureDate=${departureDate}&limit=${limit}&page=${page}`,
      { authorization }
    )
  }

  async getAllFlights({limit, page}: {limit: number, page: number;}) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get(`flights?&limit=${limit}&page=${page}`, { authorization })
  }
}

export const flightsService = new FlightsService();