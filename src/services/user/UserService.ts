import { api } from "@/shared/api/api";
import { User } from "./user.model";

class UserService {
  async listSavedDestinations(): Promise<User[]> {
    const authorization = `Bearer ${localStorage.getItem('authorization')}`;
    return await api.get('users/saved-destinations', { authorization })
  }
  
}

export const userService = new UserService();