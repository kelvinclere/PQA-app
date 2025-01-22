export interface LoginCredentials {
  userName: string;
  email: string;
  password: string;
}

export interface RegisterCredentials {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken?: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}
