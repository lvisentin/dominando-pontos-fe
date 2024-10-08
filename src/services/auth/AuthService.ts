import { api } from "@/shared/api/api";

class AuthService {
  async signIn({ email, password }: { email: string, password: string }) {
    return await api.post(`auth/signin`, { email, password })
  }

  async signUp({ name, email, password, phone, invitationCode }: { name: string, email: string, password: string, phone: string, invitationCode: string }) {
    return await api.post(`auth/signup`, { name, email, password, phone, invitationCode })
  }

  async updatePassword({ email, password }: { email: string, password: string }) {
    return await api.post(`users/update-password`, { email, password })
  }

  logout() {
    localStorage.removeItem('authorization');
    localStorage.removeItem('userData');
    window.location.reload();
  }
}

export const authService = new AuthService();