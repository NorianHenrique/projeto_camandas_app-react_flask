import React, { useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, 
  Card, CardContent, CardActions, Divider, Chip, Avatar,
  Grid, useMediaQuery, useTheme
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Person } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

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

// Botão Novo estilizado
const AddButton = styled(Button)(({ theme }) => ({
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

// Card do funcionário para exibição mobile
const FuncionarioCard = ({ id, nome, cpf, matricula }) => {
  const [expanded, setExpanded] = useState(false);
  
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
              {cpf}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2" color="textSecondary">
              Matrícula:
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: 500 }}>
              {matricula}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ justifyContent: 'space-around', p: 1 }}>
        <IconButton size="small" sx={{ 
          color: '#3a7bd5', 
          backgroundColor: 'rgba(58, 123, 213, 0.08)',
          '&:hover': { 
            backgroundColor: 'rgba(58, 123, 213, 0.15)',
          }
        }}>
          <Visibility fontSize="small" />
        </IconButton>
        
        <IconButton size="small" sx={{ 
          color: '#ffc107', 
          backgroundColor: 'rgba(255, 193, 7, 0.08)',
          '&:hover': { 
            backgroundColor: 'rgba(255, 193, 7, 0.15)',
          }
        }}>
          <Edit fontSize="small" />
        </IconButton>
        
        <IconButton size="small" sx={{ 
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

function FuncionarioList(){
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Dados de exemplo
    const funcionarios = [
      { id: 10, nome: 'Abc', cpf: '12345', matricula: '678' }
    ];

    return(
        <Box sx={{
          padding: { xs: 1.5, sm: 2, md: 3 },
          backgroundColor: '#f8f9fa', 
          minHeight: '100vh'
        }}>
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
                Funcionários
              </Typography>
              <AddButton 
                color="primary" 
                variant="contained" 
                onClick={() => navigate('/funcionario')} 
                startIcon={<Add />}
                fullWidth={isSmall}
              >
                Novo Funcionário
              </AddButton>
            </Toolbar>

            {isMobile ? (
              // Visualização Mobile: Cards
              <Box sx={{ p: 2 }}>
                {funcionarios.map(funcionario => (
                  <FuncionarioCard 
                    key={funcionario.id}
                    id={funcionario.id}
                    nome={funcionario.nome}
                    cpf={funcionario.cpf}
                    matricula={funcionario.matricula}
                  />
                ))}
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
                      <TableCell>Matrícula</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </StyledTableHead>

                  <TableBody>
                    {funcionarios.map(funcionario => (
                      <StyledTableRow key={funcionario.id}>
                        <TableCell>{funcionario.id}</TableCell>
                        <TableCell>{funcionario.nome}</TableCell>
                        <TableCell>{funcionario.cpf}</TableCell>
                        <TableCell>{funcionario.matricula}</TableCell>
                        <TableCell align="center">
                          <IconButton 
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Paper>
        </Box>
    );
};

export default FuncionarioList;
