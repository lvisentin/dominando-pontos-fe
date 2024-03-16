import { api } from "@/shared/api/api";
import { Airports } from "./airports.model";

class AirportsService {
  async getAirports({ search }: { search: string }): Promise<Airports[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    if (!search || search.length <= 1) return []
    return await api.get(`airports?search=${search}`, { authorization })
  }
}

export const airportsService = new AirportsService();