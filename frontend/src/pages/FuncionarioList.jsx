import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box
} from '@mui/material';
import { Edit, Delete, Visibility, Add } from '@mui/icons-material';
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

function FuncionarioList(){
    const navigate = useNavigate()

    return(
        <Box sx={{
          padding: 3,
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
              padding: '16px 24px', 
              display: 'flex', 
              justifyContent: 'space-between',
            }}>
              <Typography 
                variant="h5" 
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
              >
                Novo Funcionário
              </AddButton>
            </Toolbar>

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
                  <StyledTableRow>
                    <TableCell>10</TableCell>
                    <TableCell>Abc</TableCell>
                    <TableCell>12345</TableCell>
                    <TableCell>678</TableCell>
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
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Box>
    );
};

export default FuncionarioList;
