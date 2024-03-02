import { api } from "@/shared/api/api";

class AuthService {
  async signIn({ email, password }: { email: string, password: string }) {
    return await api.post(`auth/signin`, { email, password })
  }

  async signUp({ name, email, password }: { name: string, email: string, password: string }) {
    return await api.post(`auth/signup`, { name, email, password })
  }

  logout() {
    localStorage.removeItem('authorization');
  }
}

export const authService = new AuthService();