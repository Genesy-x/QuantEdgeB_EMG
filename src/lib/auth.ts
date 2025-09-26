// Authentication utilities and types
export interface User {
  id: string;
  email: string;
  name?: string;
  verified: boolean;
  whopVerified: boolean;
  tier: 'free' | 'premium';
  avatar?: string;
  createdAt: string;
  lastLogin?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

// API endpoints
const API_BASE = '/.netlify/functions';

export const authAPI = {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async logout(): Promise<void> {
    await fetch(`${API_BASE}/auth-logout`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    removeToken();
  },

  async verifyEmail(token: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    });
    return response.json();
  },

  async forgotPassword(email: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return response.json();
  },

  async resetPassword(token: string, password: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password })
    });
    return response.json();
  },

  async getProfile(): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-profile`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    return response.json();
  },

  async updateProfile(data: Partial<User>): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-update-profile`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  async verifyWhopEmail(email: string): Promise<AuthResponse> {
    const response = await fetch(`${API_BASE}/auth-verify-whop`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ email })
    });
    return response.json();
  }
};

// Token management
export const getToken = (): string | null => {
  return localStorage.getItem('quantedgeb_token');
};

export const setToken = (token: string): void => {
  localStorage.setItem('quantedgeb_token', token);
};

export const removeToken = (): void => {
  localStorage.removeItem('quantedgeb_token');
};

// Google OAuth configuration
export const googleOAuthConfig = {
  clientId: import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID || '',
  redirectUri: `${window.location.origin}/auth/callback/google`,
  scope: 'openid email profile'
};

export const initiateGoogleOAuth = (): void => {
  const params = new URLSearchParams({
    client_id: googleOAuthConfig.clientId,
    redirect_uri: googleOAuthConfig.redirectUri,
    response_type: 'code',
    scope: googleOAuthConfig.scope,
    access_type: 'offline'
  });
  
  window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
};