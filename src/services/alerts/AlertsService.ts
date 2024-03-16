import { api } from "@/shared/api/api";

class AlertsService {
  async deleteSavedDestination(alertId: number): Promise<any> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.delete(`user/saved-destinations/${alertId}`, { authorization })
  }
}

export const alertsService = new AlertsService();