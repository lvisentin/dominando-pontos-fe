import { authService } from "@/services/auth/AuthService";

class Api {
  private BASE_URL = import.meta.env.VITE_API_URL;

  async get(endpoint: string, headers = {}) {
    return await fetch(`${this.BASE_URL}/${endpoint}`, { headers }).then(r => {
      if (r.status === 401) {
        console.error('Token expirou, por favor faça login novamente!');
        authService.logout();
      }

      if (!r.ok) {
        return r.json().then((e) => { throw e })
      }

      return r.json()
    })
  }

  async post(endpoint: string, body: any, headers = {}) {
    headers = {
      ...headers,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }

    return await fetch(`${this.BASE_URL}/${endpoint}`,
      { method: 'POST', body: JSON.stringify(body), headers })
      .then(async r => {
        if (r.status === 401) {
          const { message } = await r.json();
          if(message === 'NO_PASSWORD_SET') {
            window.location.href = `${import.meta.env.VITE_APP_URL}/newPass`;
            return;
          }

          console.error('Token expirou, por favor faça login novamente!');
          authService.logout();
        }

        if (!r.ok) {
          return r.json().then((e) => { throw e })
        }

        return r.json()
      })
  }

  async delete(endpoint: string, headers = {}) {
    return await fetch(`${this.BASE_URL}/${endpoint}`,
      { method: 'DELETE', headers })
      .then(r => {
        if (r.status === 401) {
          console.error('Token expirou, por favor faça login novamente!');
          authService.logout();
        }

        if (!r.ok) {
          return r.json().then((e) => { throw e })
        }

        return r.json()
      })
  }
}

export const api = new Api();