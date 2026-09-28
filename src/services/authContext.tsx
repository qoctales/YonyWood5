import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAccount, UserRole } from '../types';

export const DEFAULT_ADMIN_USER: UserAccount = {
  id: 'usr-admin-romeo',
  email: 'qoctales@gmail.com',
  name: 'Romeo Nonvide',
  role: 'ADMIN',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  bio: 'Fondateur & Directeur éditorial de YonyWood. Passionné par les récits du réel et le cinéma documentaire immersif.',
  territory: 'Cotonou & Paris',
  country: 'Bénin',
  sharesCount: 125,
  createdAt: '2026-01-15'
};

export const INITIAL_DEMO_USERS: UserAccount[] = [
  DEFAULT_ADMIN_USER,
  {
    id: 'usr-creator-amina',
    email: 'amina.traore@yonywood.com',
    name: 'Amina Traoré',
    role: 'CREATOR',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bio: 'Passeuse de mémoires sonores et artisane du tissage traditionnel.',
    territory: 'Ganvié',
    country: 'Bénin',
    sharesCount: 45,
    createdAt: '2026-02-01'
  },
  {
    id: 'usr-creator-koffi',
    email: 'koffi.mensah@yonywood.com',
    name: 'Koffi Mensah',
    role: 'CREATOR',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    bio: 'Maître forgeron et gardien du feu sacré à Ouidah.',
    territory: 'Ouidah',
    country: 'Bénin',
    sharesCount: 30,
    createdAt: '2026-02-10'
  },
  {
    id: 'usr-coproducer-clara',
    email: 'clara.dupont@gmail.com',
    name: 'Clara Dupont',
    role: 'USER',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    bio: 'Coproductrice passionnée par les documentaires écologiques et la transmission.',
    territory: 'Lyon',
    country: 'France',
    sharesCount: 50,
    createdAt: '2026-02-20'
  },
  {
    id: 'usr-coproducer-tarek',
    email: 'tarek.benani@outlook.com',
    name: 'Tarek Benani',
    role: 'USER',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    bio: 'Investisseur à impact culturel et mécène de la création indépendante.',
    territory: 'Bruxelles',
    country: 'Belgique',
    sharesCount: 80,
    createdAt: '2026-03-01'
  }
];

interface AuthContextType {
  currentUser: UserAccount | null;
  usersList: UserAccount[];
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUserRole: (userId: string, newRole: UserRole) => void;
  deleteUser: (userId: string) => void;
}

const defaultAuthContext: AuthContextType = {
  currentUser: null,
  usersList: INITIAL_DEMO_USERS,
  isAuthenticated: false,
  isAdmin: false,
  login: async () => ({ success: false, message: 'Auth non initialisé' }),
  register: async () => ({ success: false, message: 'Auth non initialisé' }),
  logout: () => {},
  updateUserRole: () => {},
  deleteUser: () => {}
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Liste des utilisateurs mémorisée
  const [usersList, setUsersList] = useState<UserAccount[]>(() => {
    try {
      const saved = localStorage.getItem('yonywood_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_DEMO_USERS;
  });

  // Utilisateur actuellement connecté
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    try {
      const savedUser = localStorage.getItem('yonywood_current_user');
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch {
      // ignore
    }
    // Par défaut, pas connecté pour laisser l'onboarding et la connexion s'exprimer
    return null;
  });

  // Sauvegarde des utilisateurs
  useEffect(() => {
    try {
      localStorage.setItem('yonywood_registered_users', JSON.stringify(usersList));
    } catch {
      // ignore
    }
  }, [usersList]);

  // Sauvegarde de l'utilisateur courant
  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('yonywood_current_user', JSON.stringify(currentUser));
        localStorage.setItem('yonywood_auth_token', `demo-token-${currentUser.id}`);
      } else {
        localStorage.removeItem('yonywood_current_user');
        localStorage.removeItem('yonywood_auth_token');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const login = async (email: string, _password?: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    
    // Cas spécial administrateur garanti
    if (cleanEmail === 'qoctales@gmail.com') {
      setCurrentUser(DEFAULT_ADMIN_USER);
      return { success: true };
    }

    // Chercher dans la liste
    const found = usersList.find(u => u.email.toLowerCase() === cleanEmail);
    if (found) {
      setCurrentUser(found);
      return { success: true };
    }

    // Si nouveau compte avec un e-mail inconnu, créer automatiquement comme coproducteur
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: cleanEmail.split('@')[0].replace('.', ' '),
      role: 'USER',
      sharesCount: 10,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsersList(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const register = async (name: string, email: string, _password?: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = usersList.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      setCurrentUser(existing);
      return { success: true };
    }

    const isExplicitAdmin = cleanEmail === 'qoctales@gmail.com';
    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      email: cleanEmail,
      name: name.trim() || cleanEmail.split('@')[0],
      role: isExplicitAdmin ? 'ADMIN' : 'USER',
      sharesCount: 10,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsersList(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateUserRole = (userId: string, newRole: UserRole) => {
    setUsersList(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    if (currentUser?.id === userId) {
      setCurrentUser(prev => prev ? { ...prev, role: newRole } : null);
    }
  };

  const deleteUser = (userId: string) => {
    setUsersList(prev => prev.filter(u => u.id !== userId));
    if (currentUser?.id === userId) {
      setCurrentUser(null);
    }
  };

  const isAuthenticated = !!currentUser;
  const isAdmin = currentUser?.role === 'ADMIN';

  return (
    <AuthContext.Provider value={{
      currentUser,
      usersList,
      isAuthenticated,
      isAdmin,
      login,
      register,
      logout,
      updateUserRole,
      deleteUser
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context ?? defaultAuthContext;
};
