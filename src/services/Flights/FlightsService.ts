import { getEndpointParams } from "@/lib/utils";
import { api } from "@/shared/api/api";
import { CabinClass } from "@/shared/enums/CabinClass";

type GetFlightsParams = {
  departureAirport: string
  arrivalAirport: string
  departureDate: string
  cabinClass: CabinClass
  limit: number
  page: number
}

class FlightsService {
  async getFlights({ departureAirport, cabinClass, arrivalAirport, departureDate, limit, page }: GetFlightsParams) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    const url = getEndpointParams('flights', { departureAirport, cabinClass, arrivalAirport, departureDate, limit, page });
    
    return await api.get(
      url,
      { authorization }
    )
  }

  async getAllFlights({ limit, page }: { limit: number, page: number; }) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get(`flights?&limit=${limit}&page=${page}`, { authorization })
  }
}

export const flightsService = new FlightsService();