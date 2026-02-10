'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check for mock session
        const session = localStorage.getItem('user_session');
        if (session) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = () => {
        localStorage.setItem('user_session', 'mock_token');
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('user_session');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
