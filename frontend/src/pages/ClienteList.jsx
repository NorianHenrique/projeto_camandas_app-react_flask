import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, Avatar, Chip
} from '@mui/material';
import { 
  Edit, Delete, Visibility, Add, Person
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Estilizando o cabeçalho da tabela
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(to right, #f3f4f6, #e5e7eb)',
  '& .MuiTableCell-head': {
    fontWeight: 700,
    color: '#374151',
    fontSize: '0.95rem',
    padding: '16px 24px',
    borderBottom: '2px solid #43cea2',
  },
}));

// Estilizando as linhas da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(67, 206, 162, 0.04)',
  },
  '&:hover': {
    backgroundColor: 'rgba(67, 206, 162, 0.08)',
    transition: 'background-color 0.2s ease',
  },
  '& .MuiTableCell-root': {
    padding: '14px 24px',
  }
}));

// Botão de ação estilizado
const ActionButton = styled(IconButton)(({ theme, color }) => ({
  margin: '0 4px',
  backgroundColor: color === 'primary' 
    ? 'rgba(24, 90, 157, 0.08)' 
    : color === 'secondary' 
      ? 'rgba(156, 39, 176, 0.08)' 
      : 'rgba(211, 47, 47, 0.08)',
  padding: '8px',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: color === 'primary' 
      ? 'rgba(24, 90, 157, 0.16)' 
      : color === 'secondary' 
        ? 'rgba(156, 39, 176, 0.16)' 
        : 'rgba(211, 47, 47, 0.16)',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
  },
}));

function ClienteList() {
    const navigate = useNavigate();

    return (
      <Box sx={{
        padding: 3,
        backgroundColor: '#f9fafb', 
        minHeight: '100vh'
      }}>
        <Paper 
          elevation={3} 
          sx={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.08)',
          }}
        >
          <Toolbar sx={{ 
            background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
            padding: '16px 24px', 
            display: 'flex', 
            justifyContent: 'space-between',
          }}>
            <Typography 
              variant="h5" 
              sx={{
                color: 'white',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
              }}
            >
              Clientes
            </Typography>
            
            <Button 
              color="inherit" 
              variant="contained" 
              onClick={() => navigate('/cliente')} 
              startIcon={<Add />}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                padding: '8px 20px',
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  boxShadow: '0 6px 15px rgba(0, 0, 0, 0.15)',
                }
              }}
            >
              Novo Cliente
            </Button>
          </Toolbar>

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
                <StyledTableRow key={1}>
                  <TableCell>
                    <Chip 
                      label="1"
                      size="small"
                      sx={{ 
                        backgroundColor: 'rgba(67, 206, 162, 0.15)',
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ 
                      bgcolor: 'rgba(67, 206, 162, 0.8)', 
                      width: 36, 
                      height: 36 
                    }}>
                      <Person />
                    </Avatar>
                    João Silva
                  </TableCell>
                  <TableCell>123.456.789-01</TableCell>
                  <TableCell>(11) 91234-5678</TableCell>
                  <TableCell align="center">
                    <ActionButton color="primary">
                      <Visibility color="primary" />
                    </ActionButton>
                    <ActionButton color="secondary">
                      <Edit color="secondary" />
                    </ActionButton>
                    <ActionButton color="error">
                      <Delete color="error" />
                    </ActionButton>
                  </TableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    );
};

export default ClienteList;
