import { api } from "@/shared/api/api";
import { User } from "./user.model";

export interface CreateFlightRequest {
  departureAirport: string;
  arrivalAirport: string;
  cabinClass?: string | null;
}

export interface CreateSavedDestinationsRequest extends CreateFlightRequest {
  arrivalDate: string | null;
  departureDate: string;
}

export interface UserSavedDestination {
  arrivalAirport: string;
  arrivalDate: string;
  cabinClass: string;
  calendarId: number;
  createdAt: string;
  departureAirport: string;
  departureDate: string;
  id: number;
  source?: any;
  updatedAt: string;
  userId: number;
}

export interface CreateFlightCalendarRequest extends CreateFlightRequest {
  dates: {
    departureDates: string[];
    returnDates: string[];
  }
}

export interface FlightCalendar {
  arrivalAirport: string;
  cabinClass?: string;
  createdAt: string;
  departureAirport: string;
  id: number;
  updatedAt: string;
  userId: number;
  userSavedDestinations: UserSavedDestination[];
}

class UserService {
  async listSavedDestinations(): Promise<User[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('users/saved-destinations', { authorization })
  }

  async listFlightCalendars(): Promise<FlightCalendar[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('users/flight-calendars', { authorization })
  }

  async createSavedDestinations({ departureAirport, arrivalAirport, departureDate, arrivalDate, cabinClass }: CreateSavedDestinationsRequest) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.post(`/users/saved-destinations`, { departureAirport, arrivalAirport, departureDate, arrivalDate, cabinClass }, { authorization })
  }

  async createFlightCalendar({ departureAirport, arrivalAirport, dates }: CreateFlightCalendarRequest) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.post(`/users/flight-calendars`, { departureAirport, arrivalAirport, dates }, { authorization })
  }

  async createSubscription({ planId }: { planId: number }) {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.post(`/users/subscription`, { planId }, { authorization });
  }
}

export const userService = new UserService();