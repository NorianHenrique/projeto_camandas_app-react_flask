import React from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, Chip, 
  useMediaQuery, useTheme, Card, CardContent, CardActions, Grid, Divider
} from '@mui/material';
import { 
  Edit, Delete, Visibility, Add, MoreVert, ShoppingCart
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// Estilizando o cabeçalho da tabela
const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: 'linear-gradient(to right, #f9f9f9, #f0f0f0)',
  '& .MuiTableCell-head': {
    fontWeight: 700,
    color: '#333',
    fontSize: '0.95rem',
    padding: '16px 20px',
    borderBottom: '2px solid #FF416C',
  },
}));

// Estilizando as linhas da tabela
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(255, 65, 108, 0.03)',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 65, 108, 0.07)',
    transition: 'background-color 0.3s ease',
  },
  '& .MuiTableCell-root': {
    padding: '14px 20px',
  }
}));

// Botão "Novo" estilizado
const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FF416C',
  color: 'white',
  borderRadius: '10px',
  padding: '8px 20px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(255, 65, 108, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#FF4B2B',
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 15px rgba(255, 65, 108, 0.4)',
  },
}));

// Botões de ação estilizados
const ActionIconButton = styled(IconButton)(({ color }) => ({
  backgroundColor: color === 'primary' 
    ? 'rgba(33, 150, 243, 0.1)' 
    : color === 'secondary' 
      ? 'rgba(156, 39, 176, 0.1)' 
      : 'rgba(244, 67, 54, 0.1)',
  margin: '0 5px',
  padding: 8,
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: color === 'primary' 
      ? 'rgba(33, 150, 243, 0.2)' 
      : color === 'secondary' 
        ? 'rgba(156, 39, 176, 0.2)' 
        : 'rgba(244, 67, 54, 0.2)',
    transform: 'translateY(-2px)',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.1)',
  }
}));

// Componente para formatar o valor monetário
const PriceDisplay = ({ value }) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
  
  return (
    <Typography 
      variant="body2" 
      sx={{ 
        fontWeight: 600, 
        color: '#444',
        background: 'rgba(255, 65, 108, 0.05)',
        padding: '6px 10px',
        borderRadius: '6px',
        display: 'inline-block'
      }}
    >
      {formattedValue}
    </Typography>
  );
};

// Card para visualização mobile
const ProductCard = ({ id, name, description, price }) => {
  return (
    <Card 
      elevation={2} 
      sx={{ 
        mb: 2, 
        borderRadius: '12px',
        overflow: 'hidden',
        transition: 'transform 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        alignItems: 'center',
        backgroundColor: 'rgba(255, 65, 108, 0.03)'
      }}>
        <Box 
          sx={{ 
            bgcolor: 'rgba(255, 65, 108, 0.1)', 
            p: 1.5, 
            borderRadius: '50%', 
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ShoppingCart sx={{ color: '#FF416C' }} />
        </Box>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
            {name}
          </Typography>
          <Chip 
            label={`ID: ${id}`} 
            size="small"
            sx={{ bgcolor: 'rgba(255, 65, 108, 0.1)', color: '#FF416C', fontWeight: 600 }}
          />
        </Box>
      </Box>
      
      <CardContent sx={{ p: 2 }}>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
            Valor:
          </Typography>
          <PriceDisplay value={price} />
        </Box>
      </CardContent>
      
      <Divider />
      
      <CardActions sx={{ p: 1.5, justifyContent: 'space-around' }}>
        <ActionIconButton color="primary" size="small">
          <Visibility color="primary" />
        </ActionIconButton>
        <ActionIconButton color="secondary" size="small">
          <Edit color="secondary" />
        </ActionIconButton>
        <ActionIconButton color="error" size="small">
          <Delete color="error" />
        </ActionIconButton>
      </CardActions>
    </Card>
  );
};

function ProdutoList() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    // Dados de exemplo
    const produtos = [
      { id: 1, name: 'Produto A', description: 'Descrição do Produto A', price: 99.99 }
    ];

    return (
        <Box sx={{
          padding: { xs: 2, sm: 3 },
          backgroundColor: '#f8f9fa', 
          minHeight: '100vh'
        }}>
          <Paper 
            elevation={3} 
            sx={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Toolbar sx={{ 
              background: 'linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)',
              padding: { xs: '12px 16px', md: '16px 24px' }, 
              display: 'flex', 
              flexDirection: isSmall ? 'column' : 'row',
              alignItems: 'center',
              gap: isSmall ? 2 : 0,
              justifyContent: 'space-between',
            }}>
              <Typography 
                variant={isSmall ? "h6" : "h5"} 
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Produtos
              </Typography>
              
              <AddButton 
                onClick={() => navigate('/produto')} 
                startIcon={<Add />}
                fullWidth={isSmall}
              >
                Novo Produto
              </AddButton>
            </Toolbar>

            {isMobile ? (
              <Box sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  {produtos.map(produto => (
                    <Grid item xs={12} key={produto.id}>
                      <ProductCard 
                        id={produto.id}
                        name={produto.name}
                        description={produto.description}
                        price={produto.price}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <StyledTableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Descrição</TableCell>
                      <TableCell>Valor Unitário</TableCell>
                      <TableCell align="center">Ações</TableCell>
                    </TableRow>
                  </StyledTableHead>

                  <TableBody>
                    {produtos.map(produto => (
                      <StyledTableRow key={produto.id}>
                        <TableCell>
                          <Chip 
                            label={produto.id} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(255, 65, 108, 0.1)',
                              fontWeight: 600, 
                              color: '#FF416C'
                            }} 
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {produto.name}
                          </Typography>
                        </TableCell>
                        <TableCell>{produto.description}</TableCell>
                        <TableCell>
                          <PriceDisplay value={produto.price} />
                        </TableCell>
                        <TableCell align="center">
                          <ActionIconButton color="primary">
                            <Visibility color="primary" />
                          </ActionIconButton>
                          <ActionIconButton color="secondary">
                            <Edit color="secondary" />
                          </ActionIconButton>
                          <ActionIconButton color="error">
                            <Delete color="error" />
                          </ActionIconButton>
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

export default ProdutoList;
