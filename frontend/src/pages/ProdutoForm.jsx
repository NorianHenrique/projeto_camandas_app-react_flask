import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Box, Paper, Typography, TextField, InputAdornment, Button,
  useTheme, useMediaQuery
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { useNavigate, useParams } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { toast, ToastContainer } from 'react-toastify';

import ProdutoExists from '../components/ProdutoExists';

import {
  createProduto,
  updateProduto,
  getProdutoById,
  checkNomeExists,
} from '../services/produtoService';


// Função para formatar valor monetário (exibição)
const formatCurrency = (value) => {
 if (!value) return '';

  const number = typeof value === 'string' ? parseFloat(value.replace(',', '.')) : value;

  if (isNaN(number)) return '';

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(number);
};

// Parser para converter valor formatado para número
const parseCurrency = (value) => {
  if (!value) return '';
  let numericString = value.replace(/[R$\s.]/g, '').replace(',', '.');
  return numericString;
};

const ProdutoForm = () => {
  const { id, opr } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isReadOnly = opr === 'view';

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const [loadingProduto, setLoadingProduto] = useState(false);
  const [produtoExistsDialogOpen, setProdutoExistsDialogOpen] = useState(false);
  const [produtoExistente, setProdutoExistente] = useState(null);
  const [foto, setFoto] = useState(null);
  const [fotoPreview, setFotoPreview] = useState(null);

  let title = id
    ? isReadOnly
      ? `Visualizar Produto: ${id}`
      : `Editar Produto: ${id}`
    : 'Novo Produto';

  // Carregar produto para edição/visualização
  useEffect(() => {
    if (id) {
    (async () => {
      try {
        const dataFromApi = await getProdutoById(id);
        const data = Array.isArray(dataFromApi) ? dataFromApi[0] : dataFromApi;

        if (!data) {
          throw new Error("Produto não encontrado");
        }

        console.log("Dados do produto carregado:", data);

        reset({
          ...data,
          valor_unitario: formatCurrency(data.valor_unitario),
        });

        if (data.foto) {
          setFoto(data.foto);
          setFotoPreview(data.foto);
        }
      } catch (error) {
        toast.error(`Erro ao buscar produto: ${error.message}`, { position: 'top-center' });
        navigate('/produtos');
      }
    })();
  }
  }, [id, reset, navigate]);

  // Verifica se produto com mesmo nome já existe (evita duplicação)
  const verificarProdutoExistente = async (nome) => {
    if (!nome || nome.trim().length === 0) return false; // Validação básica

    try {
      setLoadingProduto(true);
      const resultado = await checkNomeExists(nome);
      const produtoEncontrado = Array.isArray(resultado) && resultado.length > 0 ? resultado[0] : undefined;

      if (produtoEncontrado) {
        if (!id || produtoEncontrado.id_produto?.toString() !== id.toString()) {
          setProdutoExistente(produtoEncontrado);
          setProdutoExistsDialogOpen(true);
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Erro na verificação de Nome:', error);
      toast.error('Erro ao verificar Produto no sistema');
      return true; // Bloqueia envio preventivamente
    } finally {
      setLoadingProduto(false);
    }
  };

  const handleCloseDialog = () => setProdutoExistsDialogOpen(false);

  const handleViewProduto = () => {
    if (produtoExistente?.id_produto) navigate(`/produto/view/${produtoExistente.id_produto}`);
    setProdutoExistsDialogOpen(false);
  };

  const handleEditProduto = () => {
    if (produtoExistente?.id_produto) navigate(`/produto/edit/${produtoExistente.id_produto}`);
    setProdutoExistsDialogOpen(false);
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 100,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setFoto(compressedFile);
        setFotoPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error('Erro ao redimensionar a imagem:', error);
        toast.error('Erro ao redimensionar a imagem.');
      }
    } else {
      setFoto(null);
      setFotoPreview(null);
    }
  };

  // Manipula a mudança do campo valor_unitario com formatação
  const handleValorUnitarioChange = (event) => {
    const formattedValue = formatCurrency(event.target.value);
    setValue('valor_unitario', formattedValue, { shouldValidate: true });
  };

  // Envio do formulário
  const onSubmit = async (data) => {
    const produtoExiste = await verificarProdutoExistente(data.nome);
    if (produtoExiste) return;

    try {
      // Converte valor formatado para número real antes da API
      data.valor_unitario = parseFloat(parseCurrency(data.valor_unitario));

      // Mantém a foto antiga se não selecionou nova
      if (!foto && id) {
        const produtoExistente = await getProdutoById(id);
        data.foto = produtoExistente.foto;
      } else {
        data.foto = foto;
      }

      let retorno;
      if (id) {
        retorno = await updateProduto(id, data);
      } else {
        retorno = await createProduto(data);
      }

      if (!retorno?.id) throw new Error(retorno.erro || 'Erro ao salvar produto.');

      toast.success(`Produto ${id ? 'atualizado' : 'cadastrado'} com sucesso (ID: ${retorno.id})`, { position: 'top-center' });
      navigate('/produtos');
    } catch (error) {
      toast.error(`Erro ao salvar produto: ${error.message}`, { position: 'top-center' });
    }
  };

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <ToastContainer />

      {/* Dialogo produto existente */}
      <ProdutoExists
        open={produtoExistsDialogOpen}
        onClose={handleCloseDialog}
        onView={handleViewProduto}
        onEdit={handleEditProduto}
        produto={produtoExistente}
      />

      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={3}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          maxWidth: 1200,
          margin: '0 auto',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
          padding: isMobile ? 2 : 4,
        }}
      >
        <Box
          sx={{
            padding: 2,
            background: 'linear-gradient(45deg, #FF9A8B 0%, #FF6B95 55%, #FF3CAC 100%)',
            color: 'white',
            fontWeight: 700,
            fontSize: isMobile ? '1.25rem' : '1.5rem',
            borderRadius: '16px 16px 0 0',
            textAlign: isMobile ? 'center' : 'left',
            mb: 3,
          }}
        >
          {title}
        </Box>

        <Box>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome do Produto"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />

          <Controller
            name="descricao"
            control={control}
            defaultValue=""
            rules={{ required: 'Descrição é obrigatória' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Descrição"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.descricao}
                helperText={errors.descricao?.message}
                margin="normal"
                multiline
                minRows={3}
              />
            )}
          />

          <Controller
           name="valor_unitario"
            control={control}
            defaultValue=""
            rules={{ required: 'Preço é obrigatório' }}
            render={({ field }) => (
              <TextField
              {...field}
              label="Preço Unitário"
              fullWidth
              disabled={isReadOnly}
              error={!!errors.valor_unitario}
              helperText={errors.valor_unitario?.message}
              margin="normal"
              onChange={field.onChange}
              onBlur={() => {
                const formatted = formatCurrency(field.value);
                setValue('valor_unitario', formatted);
              }}
              value={field.value || ''}
              InputProps={{
                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
              }}
            />
          )}
          />

          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" gutterBottom color="primary">
              Foto do Produto:
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isReadOnly}
              style={{ marginTop: 8 }}
            />
          </Box>

          {fotoPreview && (
            <Box sx={{ mt: 2 }}>
              <img
                src={fotoPreview}
                alt="Pré-visualização"
                style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => navigate('/produtos')} sx={{ mr: 1 }} startIcon={<CancelIcon />}>
              Cancelar
            </Button>
            {opr !== 'view' && (
              <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                {id ? 'Atualizar' : 'Cadastrar'}
              </Button>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default ProdutoForm;
