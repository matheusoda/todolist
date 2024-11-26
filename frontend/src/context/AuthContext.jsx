// src/context/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token')); // Verifica se o token já está armazenado
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('id');
        const storeIsAdmin = localStorage.getItem('isAdmin');

        if (token !== null && storedUserId !== null) {
            setIsAuthenticated(true);
            setUserId(storedUserId);
            setIsAdmin(storeIsAdmin === "true" ? true : false)
        }
    }, []);

    const login = (token, id, isAdmin) => {
        localStorage.setItem('token', token); // Armazena o token no localStorage
        localStorage.setItem('id', id);
        localStorage.setItem('isAdmin', isAdmin === true ? "true" : "false")
        setUserId(id)
        setIsAdmin(isAdmin)
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        localStorage.removeItem('id');
        localStorage.removeItem('isAmin');
        setUserId(null)
        setIsAdmin(null)
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userId, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Define que a função é obrigatória
};
