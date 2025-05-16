import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, Avatar, Chip,
  useMediaQuery, useTheme, Card, CardContent, Grid, Divider
} from '@mui/material';
import { 
  Edit, Delete, Visibility, Add, Person, Phone, Badge
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

// Card para visualização mobile
const ClienteCard = ({ id, nome, cpf, telefone }) => {
  const navigate = useNavigate();
  
  return (
    <Card 
      elevation={2}
      sx={{ 
        mb: 2, 
        borderRadius: 2,
        overflow: 'hidden',
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center', 
        background: 'rgba(67, 206, 162, 0.08)',
        borderBottom: '1px solid rgba(67, 206, 162, 0.2)'
      }}>
        <Avatar sx={{ 
          bgcolor: 'rgba(67, 206, 162, 0.8)', 
          width: 40, 
          height: 40,
          mr: 2
        }}>
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
              backgroundColor: 'rgba(67, 206, 162, 0.15)',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        </Box>
      </Box>
      
      <CardContent>
        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Badge sx={{ color: '#185a9d', mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                CPF: <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {cpf}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Phone sx={{ color: '#185a9d', mr: 1 }} />
              <Typography variant="body2" color="textSecondary">
                Tel: <Typography component="span" variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {telefone}
                </Typography>
              </Typography>
            </Box>
          </Grid>
          
          <Divider sx={{ width: '100%', mb: 2 }} />
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <ActionButton color="primary" size="small">
                <Visibility color="primary" fontSize="small" />
              </ActionButton>
              <ActionButton color="secondary" size="small">
                <Edit color="secondary" fontSize="small" />
              </ActionButton>
              <ActionButton color="error" size="small">
                <Delete color="error" fontSize="small" />
              </ActionButton>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

function ClienteList() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    // Dados de exemplo
    const clientes = [
      { id: 1, nome: 'João Silva', cpf: '123.456.789-01', telefone: '(11) 91234-5678' }
    ];

    return (
      <Box sx={{
        padding: { xs: 2, md: 3 },
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
            padding: { xs: '12px 16px', md: '16px 24px' }, 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'stretch' : 'center',
            gap: isMobile ? 2 : 0,
            justifyContent: 'space-between',
          }}>
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              sx={{
                color: 'white',
                fontWeight: 700,
                letterSpacing: '0.5px',
                textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                textAlign: isMobile ? 'center' : 'left',
              }}
            >
              Clientes
            </Typography>
            
            <Button 
              color="inherit" 
              variant="contained" 
              onClick={() => navigate('/cliente')} 
              startIcon={<Add />}
              fullWidth={isMobile}
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

          {isMobile ? (
            <Box sx={{ p: 2 }}>
              {clientes.map((cliente) => (
                <ClienteCard 
                  key={cliente.id}
                  id={cliente.id}
                  nome={cliente.nome}
                  cpf={cliente.cpf}
                  telefone={cliente.telefone}
                />
              ))}
            </Box>
          ) : (
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
                  {clientes.map((cliente) => (
                    <StyledTableRow key={cliente.id}>
                      <TableCell>
                        <Chip 
                          label={cliente.id}
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
                        {cliente.nome}
                      </TableCell>
                      <TableCell>{cliente.cpf}</TableCell>
                      <TableCell>{cliente.telefone}</TableCell>
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
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </Box>
    );
};

export default ClienteList;
