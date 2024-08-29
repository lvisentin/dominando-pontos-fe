import { api } from "@/shared/api/api";

class HomeService {
    async getLoyaltyPrograms() {
        const authorization = `Bearer ${localStorage.getItem('authorization')}`;
        return await api.get(`loyalty-programs?page=1&limit=15`, { authorization });
    }
}

// /api/loyalty-programs?page=1&limit=10

export const homeService = new HomeService();