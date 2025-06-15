import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { loginFuncionario } from '../services/funcionarioService';
// Criação do contexto
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({children }) => {
    // Inicializa o estado com base no valor do sessionStorage
    // sessionStorage é um armazenamento temporário que persiste enquanto a aba estiver aberta
    const [isAuthenticated,setIsAuthenticated] = useState(() =>{
        return sessionStorage.getItem("loginRealizado") === "true";
    }) ;

    const [usuarioLogado, setUsuarioLogado] = useState(() => {
    return sessionStorage.getItem('usuario') || null;
    });

    const [grupoUsuario, setGrupoUsuario] = useState(() => {
    return sessionStorage.getItem('grupo') || null;
    });
    const [token, setToken] = useState(() => sessionStorage.getItem('token') || null);

    // useNavigate é um hook do React Router que permite programaticamente navegar entre rotas
    const navigate = useNavigate();

    // Função para login
    const login = async (usuario, senha) => {
         const usuarioLocal = import.meta.env.VITE_LOCAL_USERNAME;
         const senhaLocal = import.meta.env.VITE_LOCAL_PASSWORD;
         
        // Verifica se é login local (@ no início)
   if (usuario.startsWith('@')) {
      const usuarioSemArroba = usuario.slice(1);
      if (usuarioSemArroba === usuarioLocal && senha === senhaLocal) {
        setIsAuthenticated(true);
        setUsuarioLogado(usuarioSemArroba);
        setGrupoUsuario('Administrador');

        sessionStorage.setItem('loginRealizado', 'true');
        sessionStorage.setItem('usuario', usuarioSemArroba);
        sessionStorage.setItem('grupo', 'Administrador');

        toast.success('Login local realizado com sucesso!');
        navigate('/home');
        return true;
      } else {
        toast.error('Usuário ou senha local inválidos!');
        return false;
      }
    }
    try {
      // Chamada via Proxy /api/funcionario/login
      const data = await loginFuncionario(usuario,senha)

      // Se resposta inválida ou erro
      if (!data || !data.grupo) {
        toast.error("Erro inesperado na autenticação");
        return false;
      }

      // Checagem do grupo administrador == 1
      if (data.grupo !== 1) {
        toast.error("Usuário sem permissão para acessar o sistema.");
        return false;
      }

      // Salvar dados no contexto e localStorage
      const nomeUsuario = data.usuario || data.nome || usuario;
      setIsAuthenticated(true);
      setUsuarioLogado(nomeUsuario);
      setGrupoUsuario(data.grupo);
      setToken(data.token || null);

      sessionStorage.setItem('loginRealizado', 'true');
      sessionStorage.setItem('usuario', nomeUsuario);
      sessionStorage.setItem('grupo', data.grupo);
      if (data.token) sessionStorage.setItem('token', data.token);

      toast.success("Login via API realizado com sucesso!");
      navigate('/home');
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.erro || "Erro durante autenticação");
      return false;
    }
  };
    // Função para logout
    const loggout = () =>{
        setIsAuthenticated(false);
        setUsuarioLogado(null);
        setGrupoUsuario(null);
        setToken(null);
        sessionStorage.clear();
        toast.info("Logout realizado com sucesso!");
        navigate('/login');      
    };

    return(
        <AuthContext.Provider value={{isAuthenticated, login, loggout, token , usuarioLogado, grupoUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para usar o contexto
export const useAuth = () => useContext(AuthContext);