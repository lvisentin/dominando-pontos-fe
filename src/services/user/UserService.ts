import { api } from "@/shared/api/api";
import { User } from "./user.model";

class UserService {
  async listSavedDestinations(): Promise<User[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('users/saved-destinations', { authorization })
  }

  async createSavedDestinations({ departureAirport, arrivalAirport, departureDate, arrivalDate, cabinClass }: { departureAirport: string, arrivalAirport: string, departureDate: string, arrivalDate: string, cabinClass: string }) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    console.log(authorization)
    return await api.post(`/users/saved-destinations`, { departureAirport, arrivalAirport, departureDate, arrivalDate, cabinClass }, { authorization })
  }
  
}

export const userService = new UserService();