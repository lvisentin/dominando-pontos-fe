export interface SignUpResponse extends AuthResponse { }

export interface SignInResponse extends AuthResponse { }

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  refreshToken?: string;
  cellphone?: string;
  telegramChatId?: string;
  stripeCustomerId?: string;
  trialEndsAt?: string;
  createdAt: string
  updatedAt: string
}
