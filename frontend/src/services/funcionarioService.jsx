import axios from 'axios';

const PROXY_URL = import.meta.env.VITE_PROXY_BASE_URL + "funcionario/";

// Configuração global do Axios para incluir credenciais (cookies)
axios.defaults.withCredentials = true;

// Função para configurar o token dinamicamente
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

// Função para obter token do localStorage ou sessionStorage
const getToken = () => {
  return localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
};

// Interceptor para adicionar token automaticamente a todas as requisições
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Obter todos os funcionários
export const getFuncionarios = async () => {
    try {
        const response = await axios.get(`${PROXY_URL}all`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        throw error;
    }
};

// Obter um funcionário por ID
export const getFuncionarioById = async (id) => {
    // Verificação do ID para evitar requisições com 'undefined'
    if (!id) {
        console.error("ID do funcionário não fornecido");
        throw new Error("ID do funcionário é obrigatório");
    }
    
    try {
        const response = await axios.get(`${PROXY_URL}one`, { 
            params: { id_funcionario: id } 
        });
        
        // Verificação adicional para garantir que temos dados
        if (!response.data || response.data.length === 0) {
            throw new Error("Funcionário não encontrado");
        }
        
        return response.data[0];
    } catch (error) {
        console.error(`Erro ao buscar funcionário com ID ${id}:`, error);
        throw error;
    }
};

// Criar um novo funcionário
export const createFuncionario = async (funcionario) => {
    try {
        const response = await axios.post(`${PROXY_URL}`, funcionario);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        throw error;
    }
};

export const updateFuncionario = async (id, funcionario) => {
  if (!id) throw new Error("ID do funcionário é obrigatório para atualização");

  const funcionarioData = { 
    ...funcionario, 
    id_funcionario: id 
  };

  // Se não quiser alterar a senha, apenas remova o campo
  if (!funcionarioData.senha || funcionarioData.senha === '') {
    delete funcionarioData.senha;
  }

  try {
    const response = await axios.put(
      `${PROXY_URL}`,
      funcionarioData
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar funcionário com ID ${id}:`, error);
    throw error;
  }
};

// Deletar um funcionário
export const deleteFuncionario = async (id) => {
    // Verificação do ID para evitar requisições com 'undefined'
    if (!id) {
        console.error("ID do funcionário não fornecido para exclusão");
        throw new Error("ID do funcionário é obrigatório para exclusão");
    }
    
    try {
        const response = await axios.delete(`${PROXY_URL}`, { 
            params: { id_funcionario: id } 
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar funcionário com ID ${id}:`, error);
        throw error;
    }
};

export const checkCpfExists = async (cpf) => {
    if (!cpf) {
        console.error("CPF não fornecido para verificação");
        throw new Error("CPF é obrigatório para verificação");
    }
    
    try {
        const response = await axios.get(`${PROXY_URL}check-cpf`, { 
            params: { cpf: cpf } 
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao verificar CPF:", error);
        throw error;
    }
};

export const loginFuncionario = async (cpf, senha) => {
    if (!cpf || !senha) {
        throw new Error("CPF e senha são obrigatórios para login");
    }

    try {
        // Limpar CPF antes de enviar (remove formatação)
        const cpfLimpo = cpf.replace(/\D/g, '');
        
        console.log('Tentando login com CPF:', cpfLimpo);
        
        const response = await axios.post(`${PROXY_URL}login`, { 
            cpf: cpfLimpo, 
            senha 
        });
        
        console.log('Login bem-sucedido:', response.data);
        return response.data;
        
    } catch (error) {
        console.error("Erro ao realizar login do funcionário:", error);
        
        // Log mais detalhado do erro
        if (error.response) {
            console.error('Dados da resposta de erro:', error.response.data);
            console.error('Status da resposta:', error.response.status);
            console.error('Headers da resposta:', error.response.headers);
        } else if (error.request) {
            console.error('Requisição feita mas sem resposta:', error.request);
        } else {
            console.error('Erro na configuração da requisição:', error.message);
        }
        
        throw error;
    }
};