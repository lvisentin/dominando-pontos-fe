import { api } from "@/shared/api/api";
import { Airports } from "./airports.model";

class AirportsService {
  async getAirports(): Promise<Airports[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('airports', { authorization })
  }
  
}

export const airportsService = new AirportsService();