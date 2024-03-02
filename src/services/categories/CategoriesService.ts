import { api } from "@/shared/api/api";
import { Category } from "./categories.model";

class CategoriesService {
  async listAll(): Promise<Category[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('categories', { authorization })
  }

  async toggleCategory(categoryKey: string): Promise<any> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.post('categories/toggle', { categoryKey }, { authorization })
  }
}

export const categoriesService = new CategoriesService();