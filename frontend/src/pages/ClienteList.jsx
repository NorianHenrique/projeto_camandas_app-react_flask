import React, { useState,useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, 
  Card, CardContent, CardActions, Divider, Chip, Avatar,
  Grid, useMediaQuery, useTheme, Badge
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Person, Phone} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {getClientes,deleteCliente } from '../services/clienteService';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

// Estilizando o cabeçalho da tabela
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  '& .MuiTableCell-head': {
    fontWeight: 700,
    color: '#333',
    fontSize: '0.95rem',
    borderBottom: '2px solid #3a7bd5',
    padding: '16px 24px',
  },
}));

// Estilizando as linhas da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(58, 123, 213, 0.03)',
  },
  '&:hover': {
    backgroundColor: 'rgba(58, 123, 213, 0.08)',
    transition: 'background-color 0.2s ease',
  },
}));

// Botão de ação estilizado
const AddButton = styled(Button)(({ theme, color }) => ({
  backgroundColor: '#3a7bd5',
  borderRadius: '10px',
  paddingLeft: '20px',
  paddingRight: '20px',
  boxShadow: '0 4px 12px rgba(58, 123, 213, 0.3)',
  textTransform: 'none',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#1e5daa',
    boxShadow: '0 6px 16px rgba(58, 123, 213, 0.4)',
    transform: 'translateY(-2px)',
  },
  transition: 'all 0.3s ease',
}));

// Formata CPF no padrão 000.000.000-00
const formatCpf = (cpf) => {
  if (!cpf) return '';
  const str = cpf.toString();
  if (str.length !== 11) return cpf; // Retorna original se tamanho inválido
  return str.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Formata telefone no padrão (00) 00000-0000 ou (00) 0000-0000
const formatTelefone = (telefone) => {
  if (!telefone) return '';
  const str = telefone.toString();
  if (str.length === 11) {
    return str.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  } else if (str.length === 10) {
    return str.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return telefone;
};


/// Card do funcionário para exibição mobile
const ClienteCard = ({ id, nome, cpf, telefone, onView, onEdit, onDelete }) => {
  return (
    <Card 
      sx={{ 
        mb: 2, 
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)'
        }
      }}
    >
      <Box 
        sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          background: 'rgba(58, 123, 213, 0.04)',
          borderBottom: '1px solid rgba(58, 123, 213, 0.08)'
        }}
      >
        <Avatar 
          sx={{ 
            bgcolor: '#3a7bd5', 
            mr: 2 
          }}
        >
          <Person />
        </Avatar>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            {nome}
          </Typography>
          <Chip 
            label={`ID: ${id}`}
            size="small"
            sx={{ 
              backgroundColor: 'rgba(58, 123, 213, 0.1)',
              fontWeight: 500,
              fontSize: '0.75rem'
            }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ pt: 2 }}>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              CPF:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                {formatCpf(cpf)}
            </Typography>
          </Grid>
           <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Telefone:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {formatTelefone(telefone)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <Divider />
      <CardActions sx={{ justifyContent: 'space-around', p: 1 }}>
        <IconButton size="small" onClick={onView} sx={{ 
          color: '#3a7bd5', 
          backgroundColor: 'rgba(58, 123, 213, 0.08)',
          '&:hover': { 
            backgroundColor: 'rgba(58, 123, 213, 0.15)',
          }
        }}>
          <Visibility fontSize="small" />
        </IconButton>
        
        <IconButton size="small" onClick={onEdit} sx={{ 
          color: '#ffc107', 
          backgroundColor: 'rgba(255, 193, 7, 0.08)',
          '&:hover': { 
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
          }
        }}>
          <Edit fontSize="small" />
        </IconButton>
        
        <IconButton size="small" onClick={onDelete} sx={{ 
          color: '#f44336', 
          backgroundColor: 'rgba(244, 67, 54, 0.08)',
          '&:hover': { 
            backgroundColor: 'rgba(244, 67, 54, 0.15)',
          }
        }}>
          <Delete fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
};

function ClienteList(){
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [clientes,setClientes] = useState([])

    useEffect(() =>{
       fetchClientes();
    },[])

    const fetchClientes = async () => {
       try{
         const data = await getClientes();
         setClientes(data);
       }catch(error){
        console.error('Erro ao buscar clientes:', error);
        toast.error('Não foi possível carregar os clientes.');
       }
    }

   // Função para lidar com o clique no botão de deletar cliente
    const handleDeleteClick = (cliente) => {
        toast(
          <div>
              <Typography>
                Tem certeza que deseja excluir o cliente <strong>{cliente.nome}</strong>?
              </Typography>
              <div style={{ 
                marginTop: '10px', 
                display: 'flex', 
                justifyContent: 'flex-end' 
              }}>
                <Button
                  variant="contained" 
                  color="error" 
                  size="small"
                  onClick={() => handleDeleteConfirm(cliente.id_cliente)} 
                  style={{ marginRight: '10px' }}
                >
                  Excluir
                </Button>
                <Button 
                  variant="outlined" 
                  size="small" 
                  onClick={() => toast.dismiss()}
                >
                  Cancelar
                </Button>
              </div>
          </div>,
          {
            position: "top-center", 
            autoClose: false, 
            closeOnClick: false, 
            draggable: false, 
            closeButton: false,
          }
        );
    };

    const handleDeleteConfirm = async (id) => {
        try {
          await deleteCliente(id); 
          fetchClientes();
          toast.dismiss(); // Fecha o toast após a exclusão
          toast.success('Cliente excluído com sucesso!', { position: "top-center" });
        } catch (error) {
          console.error('Erro ao deletar cliente:', error);
          toast.error('Erro ao excluir cliente.', { position: "top-center" });
        }
    };

  return(
        <Box sx={{
          padding: { xs: 1.5, sm: 2, md: 3 },
          backgroundColor: '#f8f9fa', 
          minHeight: '100vh'
        }}>
          <ToastContainer /> {/* Adicionar este componente para exibir os toasts */}
          
          <Paper 
            elevation={3} 
            sx={{
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Toolbar sx={{ 
              background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
              padding: { xs: '12px 16px', md: '16px 24px' }, 
              display: 'flex', 
              flexDirection: isSmall ? 'column' : 'row',
              alignItems: isSmall ? 'stretch' : 'center',
              gap: isSmall ? 2 : 0,
              justifyContent: 'space-between',
            }}>
              <Typography 
                variant={isSmall ? "h6" : "h5"} 
                sx={{
                  color: 'white',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Clientes
              </Typography>
              <AddButton 
                color="primary" 
                variant="contained" 
                onClick={() => navigate('/cliente')} 
                startIcon={<Add />}
                fullWidth={isSmall}
              >
                Novo Cliente
              </AddButton>
            </Toolbar>

            {isMobile ? (
              // Visualização Mobile: Cards
              <Box sx={{ p: 2 }}>
                {clientes.length > 0 ? (
                  clientes.map(cliente => (
                    <ClienteCard 
                      key={cliente.id_cliente}
                      id={cliente.id_cliente}
                      nome={cliente.nome}
                      cpf={cliente.cpf}
                      telefone={cliente.telefone}
                      onView={() => navigate(`/cliente/view/${cliente.id_cliente}`)}
                      onEdit={() => navigate(`/cliente/edit/${cliente.id_cliente}`)}
                      onDelete={() => handleDeleteClick(cliente)}
                    />
                  ))
                ) : (
                  <Typography 
                    align="center" 
                    sx={{ py: 4, color: 'text.secondary' }}
                  >
                    Nenhum cliente encontrado
                  </Typography>
                )}
              </Box>
            ) : (
              // Visualização Desktop: Tabela
              <TableContainer>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>CPF</TableCell>  
                      <TableCell>Telefone</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </StyledTableHead>

                  <TableBody>
                    {clientes.length > 0 ? (
                      clientes.map(cliente => (
                        <StyledTableRow key={cliente.id_cliente}>
                          <TableCell>{cliente.id_cliente}</TableCell>
                          <TableCell>{cliente.nome}</TableCell>
                          <TableCell>{formatCpf(cliente.cpf)}</TableCell>
                          <TableCell>{formatTelefone(cliente.telefone)} </TableCell>
                          <TableCell align="center">
                            <IconButton 
                              onClick={() => navigate(`/cliente/view/${cliente.id_cliente}`)}
                              sx={{ 
                                color: '#3a7bd5', 
                                backgroundColor: 'rgba(58, 123, 213, 0.08)',
                                margin: '0 5px',
                                transition: 'all 0.2s',
                                '&:hover': { 
                                  backgroundColor: 'rgba(58, 123, 213, 0.15)',
                                  transform: 'translateY(-2px)',
                                }
                              }}
                            >
                              <Visibility />
                            </IconButton>
                            <IconButton 
                              onClick={() => navigate(`/cliente/edit/${cliente.id_cliente}`)}
                              sx={{ 
                                color: '#ffc107', 
                                backgroundColor: 'rgba(255, 193, 7, 0.08)',
                                margin: '0 5px',
                                transition: 'all 0.2s',
                                '&:hover': { 
                                  backgroundColor: 'rgba(255, 193, 7, 0.15)',
                                  transform: 'translateY(-2px)',
                                }
                              }}
                            >
                              <Edit />
                            </IconButton>
                            <IconButton 
                              onClick={() => handleDeleteClick(cliente)}
                              sx={{ 
                                color: '#f44336', 
                                backgroundColor: 'rgba(244, 67, 54, 0.08)',
                                margin: '0 5px',
                                transition: 'all 0.2s',
                                '&:hover': { 
                                  backgroundColor: 'rgba(244, 67, 54, 0.15)',
                                  transform: 'translateY(-2px)',
                                }
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                          Nenhum cliente encontrado
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>
    );
};
export default ClienteList;
