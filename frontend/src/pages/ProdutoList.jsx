import React, { useState,useEffect } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, IconButton, Typography, Button, Toolbar, Box, 
  Card, CardContent, CardActions, Divider, Chip, Avatar,
  Grid, useMediaQuery, useTheme, Badge
} from '@mui/material';
import { Edit, Delete, Visibility, Add, Person, Phone, GetApp} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {getProdutos,deleteProduto } from '../services/produtoService';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: 'rgba(58, 123, 213, 0.03)',
  },
  '&:hover': {
    backgroundColor: 'rgba(58, 123, 213, 0.08)',
    transition: 'background-color 0.2s ease',
  },
}));

const AddButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#3a7bd5',
  borderRadius: '10px',
  paddingLeft: 20,
  paddingRight: 20,
  boxShadow: '0 4px 12px rgba(58, 123, 213, 0.3)',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#1e5daa',
    boxShadow: '0 6px 16px rgba(58, 123, 213, 0.4)',
    transform: 'translateY(-2px)',
  },
}));

// --- Função para formatar preço ---
const formatarPreco = (valor) => {
  if (valor == null || isNaN(valor)) return '';

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);

  return (
    <Typography
      variant="body2"
      sx={{
        fontWeight: 600,
        color: '#444',
        background: 'rgba(255, 65, 108, 0.05)',
        padding: '6px 10px',
        borderRadius: '6px',
        display: 'inline-block',
      }}
    >
      {formattedValue}
    </Typography>
  );
};

// Card para visualização mobile
const ProdutoCard = ({ id, nome, descricao, valor_unitario, foto, onView, onEdit, onDelete }) => {
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
                  Descrição:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {descricao}
                </Typography>
              </Grid>
               <Grid item xs={6}>
                <Typography variant="body2" color="textSecondary">
                  Preço:
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatarPreco(valor_unitario)}
                </Typography>
              </Grid>
              <Grid item xs={12} mt={2}>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Foto:
              </Typography>
                {foto ? (
                  <Box
                  component="img"
                  src={foto}
                  alt={nome}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: 150,
                    borderRadius: 1,
                    display: 'block',
                    objectFit: 'contain',
              }}
            />
            ) :  (
              <Typography variant="body2" color="textSecondary">
                Sem foto
              </Typography>
                )}
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
  

function ProdutoList() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

    const [produtos,setProdutos] = useState([])

    useEffect(() =>{
          fetchProdutos();
      },[])
    
    const fetchProdutos = async () => {
        try{
           const data = await getProdutos();
           setProdutos(data);
          }catch(error){
            console.error('Erro ao buscar produtos:', error);
            toast.error('Não foi possível carregar os produtos.');
           }
        }
// Função para lidar com o clique no botão de deletar produto
    const handleDeleteClick = (produto) => {
        toast(
          <div>
              <Typography>
                Tem certeza que deseja excluir o produto <strong>{produto.nome}</strong>?
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
                  onClick={() => handleDeleteConfirm(produto.id_produto)} 
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
          await deleteProduto(id); 
          fetchProdutos();
          toast.dismiss(); // Fecha o toast após a exclusão
          toast.success('Produto excluído com sucesso!', { position: "top-center" });
        } catch (error) {
          console.error('Erro ao deletar produto:', error);
          toast.error('Erro ao excluir produto.', { position: "top-center" });
        }
    };

   const fetchImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

 const generatePDF = async () => {
  const doc = new jsPDF();
  doc.setFontSize(20);
  doc.text('Relatório de Produtos', 14, 22);

  const tableColumn = ["ID", "Nome", "Descrição", "Preço", "Imagem"];
  const tableRows = [];
  const imagens = [];

  for (const produto of produtos) {
    const imagemBase64 = produto.foto ? await fetchImageAsBase64(produto.foto) : null;
    imagens.push(imagemBase64);
    tableRows.push([
      produto.id_produto,
      produto.nome,
      produto.descricao,
      produto.valor_unitario,
      '' 
    ]);
  }

  const getImageFormat = (base64) => {
    if (!base64) return 'JPEG';
    if (base64.includes('image/png')) return 'PNG';
    if (base64.includes('image/jpeg') || base64.includes('image/jpg')) return 'JPEG';
    return 'JPEG';
  };

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    styles: {
      cellPadding: 3,
      minCellHeight: 25,
    },
    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 4 && imagens[data.row.index]) {
        const imgWidth = 20;
        const imgHeight = 20;
        const x = data.cell.x + (data.cell.width - imgWidth) / 2;
        const y = data.cell.y + (data.cell.height - imgHeight) / 2;
        const format = getImageFormat(imagens[data.row.index]);
        doc.addImage(imagens[data.row.index], format, x, y, imgWidth, imgHeight);
      }
    }
  });

  doc.save('produtos.pdf');
};

   return (
    <Box
      sx={{
        padding: { xs: 1.5, sm: 2, md: 3 },
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
      }}
    >
      <ToastContainer />

      <Paper
        elevation={3}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
          boxShadow: '0 6px 18px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
            padding: { xs: '12px 16px', md: '16px 24px' },
            display: 'flex',
            flexDirection: isSmall ? 'column' : 'row',
            alignItems: isSmall ? 'stretch' : 'center',
            gap: isSmall ? 2 : 0,
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant={isSmall ? 'h6' : 'h5'}
            sx={{
              color: 'white',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
            }}
          >
            Produtos
          </Typography>
          <AddButton
            color="primary"
            variant="contained"
            onClick={() => navigate('/produto')}
            startIcon={<Add />}
            fullWidth={isSmall}
          >
            Novo Produto
          </AddButton>
         <Button onClick={generatePDF} startIcon={<GetApp />}
              variant="outlined"
                      sx={{
                          ml: isSmall ? 0 : 2,
                          mt: isSmall ? 1 : 0,
                          borderColor: 'white',
                          color: 'white',
                          fontWeight: 600,
                          textTransform: 'none',
                             '&:hover': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            borderColor: 'white',
                          },
                      }}
                    >
                Exportar PDF
          </Button>
        </Toolbar>

        {isMobile ? (
          // Mobile cards
          <Box sx={{ p: 2 }}>
            {produtos.length > 0 ? (
              produtos.map((produto) => (
                <ProdutoCard
                  key={produto.id_produto}
                  id={produto.id_produto}
                  nome={produto.nome}
                  descricao={produto.descricao}
                  valor_unitario={produto.valor_unitario}
                  foto={produto.foto}
                  onView={() => navigate(`/produto/view/${produto.id_produto}`)}
                  onEdit={() => navigate(`/produto/edit/${produto.id_produto}`)}
                  onDelete={() => handleDeleteClick(produto)}
                />
              ))
            ) : (
              <Typography align="center" sx={{ py: 4, color: 'text.secondary' }}>
                Nenhum produto encontrado
              </Typography>
            )}
          </Box>
        ) : (
          // Desktop table
          <TableContainer>
            <Table>
              <StyledTableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Descrição</TableCell>
                  <TableCell>Preço</TableCell>
                  <TableCell>Foto</TableCell>
                  <TableCell align="center">Ações</TableCell>
                </TableRow>
              </StyledTableHead>

              <TableBody>
                {produtos.length > 0 ? (
                  produtos.map((produto) => (
                    <StyledTableRow key={produto.id_produto}>
                      <TableCell>{produto.id_produto}</TableCell>
                      <TableCell>{produto.nome}</TableCell>
                      <TableCell>{produto.descricao}</TableCell>
                      <TableCell>{formatarPreco(produto.valor_unitario)}</TableCell>
                      <TableCell>
                        {produto.foto ? (
                          <Box
                            component="img"
                            src={produto.foto}
                            alt={produto.nome}
                            sx={{
                              maxWidth: 100,
                              maxHeight: 100,
                              borderRadius: 1,
                              objectFit: 'contain',
                            }}
                          />
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Sem foto
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <IconButton
                          onClick={() => navigate(`/produto/view/${produto.id_produto}`)}
                          sx={{
                            color: '#3a7bd5',
                            backgroundColor: 'rgba(58, 123, 213, 0.08)',
                            margin: '0 5px',
                            transition: 'all 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(58, 123, 213, 0.15)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Visibility />
                        </IconButton>
                        <IconButton
                          onClick={() => navigate(`/produto/edit/${produto.id_produto}`)}
                          sx={{
                            color: '#ffc107',
                            backgroundColor: 'rgba(255, 193, 7, 0.08)',
                            margin: '0 5px',
                            transition: 'all 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 193, 7, 0.15)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteClick(produto)}
                          sx={{
                            color: '#f44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.08)',
                            margin: '0 5px',
                            transition: 'all 0.2s',
                            '&:hover': {
                              backgroundColor: 'rgba(244, 67, 54, 0.15)',
                              transform: 'translateY(-2px)',
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      Nenhum produto encontrado
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
}

export default ProdutoList;
