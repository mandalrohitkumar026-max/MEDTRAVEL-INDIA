import React, { createContext, useContext, useState } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  role: UserRole;
  isAuthenticated: boolean;
  setRole: (role: UserRole) => void;
  login: (email: string, role?: UserRole) => void;
  register: (userData: { name: string; email: string; country: string; phone?: string }) => void;
  logout: () => void;
  resetToDemoAhmed: () => void;
}

const defaultDemoUser: User = {
  id: 'user-ahmed',
  name: 'Ahmed Hossain',
  email: 'ahmed.hossain@demo.bd',
  role: 'PATIENT',
  country: 'Bangladesh',
  phone: '+880 1711 000000',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
};

const roleUsers: Record<UserRole, User> = {
  PATIENT: defaultDemoUser,
  HOSPITAL: {
    id: 'user-apollo-coord',
    name: 'Apollo International Desk (Dr. K. Nair)',
    email: 'chennai_intl@apollohospitals.demo',
    role: 'HOSPITAL',
    country: 'India',
    associatedEntityId: 'hosp-apollo-chennai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
  HOTEL: {
    id: 'user-lemon-tree',
    name: 'Lemon Tree Medical Concierge Desk',
    email: 'guestcare@lemontree.demo',
    role: 'HOTEL',
    country: 'India',
    associatedEntityId: 'hotel-lemon-tree-chennai',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  TRANSPORT_PARTNER: {
    id: 'user-medroute-dispatch',
    name: 'MedRoute Chauffeur Operations',
    email: 'dispatch@medroutecabs.demo',
    role: 'TRANSPORT_PARTNER',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  ADMIN: {
    id: 'user-super-admin',
    name: 'MEDTRAVEL Platform Admin',
    email: 'admin@medtravelindia.demo',
    role: 'ADMIN',
    country: 'India',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('PATIENT');
  const [user, setUser] = useState<User | null>(defaultDemoUser);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    setUser(roleUsers[newRole]);
  };

  const login = (email: string, chosenRole: UserRole = 'PATIENT') => {
    setRoleState(chosenRole);
    setUser({
      ...roleUsers[chosenRole],
      email: email || roleUsers[chosenRole].email
    });
  };

  const register = (userData: { name: string; email: string; country: string; phone?: string }) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || 'International Patient',
      email: userData.email,
      role: 'PATIENT',
      country: userData.country,
      phone: userData.phone,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    };
    setRoleState('PATIENT');
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  const resetToDemoAhmed = () => {
    setRoleState('PATIENT');
    setUser(defaultDemoUser);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role: user ? user.role : role, 
      isAuthenticated: user !== null, 
      setRole, 
      login, 
      register, 
      logout, 
      resetToDemoAhmed 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
