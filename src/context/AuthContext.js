import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verifica se há um utilizador logado usando token armazenado
    const checkLoggedUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (token) {
          // Carrega dados do utilizador que foram salvos no localStorage
          const userData = {
            id: localStorage.getItem('userID'),
            name: localStorage.getItem('userName'),
            image: localStorage.getItem('userImage') || null,
            codigoPostal: localStorage.getItem('codigoPostal')
          };
          
          setUser(userData);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        setLoading(false);
      }
    };
    
    checkLoggedUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};