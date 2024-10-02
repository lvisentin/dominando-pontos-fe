import { api } from "@/shared/api/api";

class HomeService {
  async getLoyaltyPrograms(
    filters: { livelo: boolean; esfera: boolean },
    categoryFilter: number,
    orderFilter: string,
    page: number,
    search: string
  ) {
    let appliedFilters = "";
    if (filters.livelo) {
      appliedFilters = "program=livelo";
    }

    if (filters.esfera) {
      appliedFilters = "program=esfera";
    }

    const authorization = `Bearer ${localStorage.getItem("authorization")}`;
    return await api.get(
      `partner-loyalty-programs?page=${page}&limit=15${
        appliedFilters ? `&${appliedFilters}` : ""
      }${categoryFilter ? `&partnerCategoryId=${categoryFilter}` : ""}${
        search ? `&search=${search}` : ""
      }${orderFilter ? `&${orderFilter}` : ""}`,
      { authorization }
    );
  }
}

// /api/loyalty-programs?page=1&limit=10

export const homeService = new HomeService();
