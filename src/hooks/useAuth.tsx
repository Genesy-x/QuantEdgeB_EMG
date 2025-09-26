import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, AuthState, authAPI, getToken, setToken, removeToken } from '../lib/auth';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (email: string, password: string, name?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<{ success: boolean; message?: string }>;
  verifyWhopEmail: (email: string) => Promise<{ success: boolean; message?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  });

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      const token = getToken();
      if (token) {
        try {
          const response = await authAPI.getProfile();
          if (response.success && response.user) {
            setState({
              user: response.user,
              isLoading: false,
              isAuthenticated: true
            });
          } else {
            removeToken();
            setState({
              user: null,
              isLoading: false,
              isAuthenticated: false
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          removeToken();
          setState({
            user: null,
            isLoading: false,
            isAuthenticated: false
          });
        }
      } else {
        setState({
          user: null,
          isLoading: false,
          isAuthenticated: false
        });
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authAPI.login({ email, password });
      if (response.success && response.user && response.token) {
        setToken(response.token);
        setState({
          user: response.user,
          isLoading: false,
          isAuthenticated: true
        });
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const register = async (email: string, password: string, name?: string) => {
    try {
      const response = await authAPI.register({ email, password, name });
      if (response.success) {
        return { success: true, message: response.message || 'Registration successful! Please check your email to verify your account.' };
      } else {
        return { success: false, message: response.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const logout = () => {
    authAPI.logout().catch(console.error);
    setState({
      user: null,
      isLoading: false,
      isAuthenticated: false
    });
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      const response = await authAPI.updateProfile(data);
      if (response.success && response.user) {
        setState(prev => ({
          ...prev,
          user: response.user!
        }));
        return { success: true };
      } else {
        return { success: false, message: response.message || 'Profile update failed' };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const verifyWhopEmail = async (email: string) => {
    try {
      const response = await authAPI.verifyWhopEmail(email);
      if (response.success && response.user) {
        setState(prev => ({
          ...prev,
          user: response.user!
        }));
        return { success: true, message: 'Whop email verified successfully!' };
      } else {
        return { success: false, message: response.message || 'Whop verification failed' };
      }
    } catch (error) {
      console.error('Whop verification error:', error);
      return { success: false, message: 'Network error occurred' };
    }
  };

  const refreshUser = async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.success && response.user) {
        setState(prev => ({
          ...prev,
          user: response.user!
        }));
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    updateProfile,
    verifyWhopEmail,
    refreshUser
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};