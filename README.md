# Sistema de Gerenciamento de Comandas (React + Flask)

# Sobre o Projeto
Este projeto é um Sistema de Gerenciamento de Comandas completo, desenvolvido com uma arquitetura moderna que combina React no frontend e Flask no backend. 
Ele foi projetado para auxiliar restaurantes, bares e estabelecimentos similares na gestão eficiente de clientes, produtos e funcionários, 
otimizando o processo de atendimento e registro de vendas.

O objetivo principal é fornecer uma solução intuitiva e responsiva para o controle de comandas, permitindo operações como cadastro, edição, visualização e exclusão de informações essenciais para o dia a dia do negócio.

## Funcionalidades

  # Frontend (React):
    Autenticação de Usuário: Sistema de login com validação de credenciais (usuário: norian, senha: senha123) e controle de acesso a rotas protegidas. Exibe notificações de sucesso/erro via react-toastify.
  # Gestão de Funcionários:
    Listagem de todos os funcionários com opções de visualização, edição e exclusão.
    Formulário completo para cadastro e edição de funcionários, incluindo nome, CPF, matrícula, telefone, senha e grupo de acesso.
    Validação de formulários usando react-hook-form.
    Máscaras de entrada para CPF e telefone utilizando react-imask.
    Diálogo de alerta para CPF já cadastrado, permitindo visualizar ou editar o funcionário existente.
    Confirmação de exclusão com notificação interativa.
    
  # Gestão de Clientes:
    Listagem de clientes com informações detalhadas.
    Formulário de cadastro para clientes com campos de nome, CPF e telefone.
    Máscaras de entrada para CPF e telefone.
    
  # Gestão de Produtos:
    Listagem de produtos, exibindo nome, descrição e valor unitário.
    Formulário de cadastro para produtos, incluindo nome, descrição, valor unitário e opção para upload de imagem.
    Formatação monetária para o campo de valor unitário.

Interface Responsiva: Utiliza @mui/material para uma interface adaptável a diferentes tamanhos de tela (desktop e mobile).
Navegação: Componente de Navbar dinâmico que se adapta à autenticação do usuário e ao tamanho da tela (menu lateral em dispositivos móveis).
Rotas Protegidas: Implementação de PrivateRoute para garantir que apenas usuários autenticados possam acessar determinadas páginas.
Lazy Loading: Carregamento de componentes sob demanda para otimizar o desempenho da aplicação.
Página 404 (Não Encontrada): Rota de fallback para exibir uma página amigável quando a URL não corresponde a nenhuma rota existente.

# Backend (Flask)
  API RESTful: O backend em Flask fornecerá os endpoints necessários para as operações CRUD (Create, Read, Update, Delete) de funcionários, clientes e produtos. (Com base nos serviços do frontend, o backend deve ter estas funcionalidades).
  Validação de CPF: Endpoint para verificar se um CPF já existe no banco de dados, crucial para o cadastro de funcionários.
  Gestão de Credenciais: Lida com a autenticação de usuários e possivelmente com a gestão de senhas (criptografia, etc.).
  
# Tecnologias Utilizadas
  # Frontend
  React 19.0.0 - Biblioteca JavaScript para construção de interfaces de usuário.
  Vite 6.3.1 - Ferramenta de build frontend rápido e leve.
  Material-UI (MUI) - Biblioteca de componentes React para um design elegante e responsivo.
  @emotion/react, @emotion/styled
  @mui/icons-material, @mui/material
  React Router DOM 7.5.3 - Para gerenciamento de rotas na aplicação.
  React Hook Form 7.56.1 - Para gerenciamento e validação de formulários.
  React IMask 7.6.1 - Para aplicação de máscaras em campos de entrada.
  Axios 1.9.0 - Cliente HTTP para fazer requisições à API.
  React Toastify 11.0.5 - Para notificações personalizáveis.
  ESLint 9.22.0 - Para análise estática de código e identificação de problemas.
  @vitejs/plugin-react-swc 3.8.0 - Plugin do Vite para React usando SWC para Fast Refresh.
  
# Backend
  Flask - Framework web para Python.
  Python - Linguagem de programação.
  Banco de Dados - MySql.
 
