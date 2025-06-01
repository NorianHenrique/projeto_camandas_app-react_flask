import axios from 'axios';

const PROXY_URL = import.meta.env.VITE_PROXY_BASE_URL + "cliente/";

// Configuração global do Axios para incluir credenciais (cookies)
axios.defaults.withCredentials = true;

// Obter todos os clientes
export const getClientes = async () => {
    try {
        const response = await axios.get(`${PROXY_URL}all`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
};

// Obter um cliente por ID
export const getClienteById = async (id) => {
    // Verificação do ID para evitar requisições com 'undefined'
    if (!id) {
        console.error("ID do cliente não fornecido");
        throw new Error("ID do cliente é obrigatório");
    }
    
    try {
        const response = await axios.get(`${PROXY_URL}one`, { 
            params: { id_cliente: id } 
        });
        
        // Verificação adicional para garantir que temos dados
        if (!response.data || response.data.length === 0) {
            throw new Error("Cliente não encontrado");
        }
        
        return response.data[0];
    } catch (error) {
        console.error(`Erro ao buscar cliente com ID ${id}:`, error);
        throw error;
    }
};

// Criar um novo cliente
export const createCliente = async (cliente) => {
    try {
        const response = await axios.post(`${PROXY_URL}`, cliente);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar cliente:", error);
        throw error;
    }
};

export const updateCliente = async (id, cliente) => {
  if (!id) throw new Error("ID do cliente é obrigatório para atualização");

   try {
    const response = await axios.put(
      `${PROXY_URL}`, cliente,
      { params: { id_cliente: id } }
    );
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar cliente com ID ${id}:`, error);
    throw error;
  }
};

// Deletar um cliente
export const deleteCliente = async (id) => {
    // Verificação do ID para evitar requisições com 'undefined'
    if (!id) {
        console.error("ID do cliente não fornecido para exclusão");
        throw new Error("ID do cliente é obrigatório para exclusão");
    }
    
    try {
        const response = await axios.delete(`${PROXY_URL}`, { 
            params: { id_cliente: id } 
        });
        return response.data;
    } catch (error) {
        console.error(`Erro ao deletar cliente com ID ${id}:`, error);
        throw error;
    }
};

export const checkCpfExists = async (cpf) => {
    if (!cpf) {
        console.error("CPF não fornecido para verificação");
        throw new Error("CPF é obrigatório para verificação");
    }
    
    try {
        const response = await axios.get(`${PROXY_URL}cpf`, { 
            params: { cpf: cpf } 
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao verificar CPF:", error);
        throw error;
    }
};
