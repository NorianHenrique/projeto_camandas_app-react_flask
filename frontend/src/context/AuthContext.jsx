import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// Criação do contexto
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({children }) => {
    // Inicializa o estado com base no valor do sessionStorage
    // sessionStorage é um armazenamento temporário que persiste enquanto a aba estiver aberta
    const [isAuthenticated,setIsAuthenticated] = useState(() =>{
        return sessionStorage.getItem("loginRealizado") === "true";
    }) ;

    // useNavigate é um hook do React Router que permite programaticamente navegar entre rotas
    const navigate = useNavigate();

    // Função para login
    const login = (username, password) => {
        if (username === 'norian' && password === 'senha123') {
            setIsAuthenticated(true);
            sessionStorage.setItem("loginRealizado", "true");
            toast.success("Login realizado com sucesso!"); // Notificação de sucesso
            navigate("/home"); 
        } else {
            toast.error("Usuário ou senha inválidos!"); // Notificação de erro
        }
    };

    // Função para logout
    const loggout = () =>{
        setIsAuthenticated(false);
        sessionStorage.removeItem("loginRealizado");
        toast.info("Logout realizado com sucesso!"); // Notificação de informação
        navigate("/login");
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, login, loggout}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);