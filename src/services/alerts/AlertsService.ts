import { api } from "@/shared/api/api";

class AlertsService {
  async deleteSavedDestination(alertId: number): Promise<any> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.delete(`users/saved-destinations/${alertId}`, { authorization })
  }

  async deleteFlightCalendar(alertId: number): Promise<any> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.delete(`users/flight-calendars/${alertId}`, { authorization })
  }
}

export const alertsService = new AlertsService();