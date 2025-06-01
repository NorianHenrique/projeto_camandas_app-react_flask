import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Paper,
  Divider,
  CircularProgress,
  InputAdornment,
  FormControlLabel,
  Switch,
  useTheme,
  useMediaQuery,
  Dialog, 
  DialogTitle,
  DialogActions
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GroupIcon from '@mui/icons-material/Group';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

import IMaskInputWrapper from '../components/IMaskInputWrapper';
import CpfExistsCliente from '../components/CpfExistsCliente';

import {
  createCliente,
  updateCliente,
  getClienteById,
  checkCpfExists,
} from '../services/clienteService';

const ClienteForm = () => {
  const { id, opr } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isReadOnly = opr === 'view';

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loadingCpf, setLoadingCpf] = useState(false);
  const [cpfExistsDialogOpen, setCpfExistsDialogOpen] = useState(false);
  const [clienteExistente, setClienteExistente] = useState(null);
 
  let title = id
    ? isReadOnly
      ? `Visualizar Cliente: ${id}`
      : `Editar Cliente: ${id}`
    : 'Novo Cliente';

  // Carregar cliente para edição/visualização
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getClienteById(id);
          if (!data) throw new Error('Cliente não encontrado');
          reset(data)
        } catch (error) {
          toast.error(`Erro ao buscar cliente: ${error.message}`, { position: 'top-center' });
          navigate('/clientes');
        }
      })();
    }
  }, [id, navigate, reset]);

  // Verifica se CPF existe no sistema (evita duplicação)
const verificarCpfExistente = async (cpf) => {
 console.log('Verificando CPF:', cpf);
  const cpfLimpo = cpf.replace(/\D/g, '');
  if (!cpfLimpo || cpfLimpo.length !== 11) return false;

  try {
    setLoadingCpf(true);
    const resultado = await checkCpfExists(cpfLimpo);
    console.log('Resultado da verificação CPF:', resultado);
    console.log('id atual:', id);

    const clienteEncontrado = Array.isArray(resultado) && resultado.length > 0
      ? resultado[0]
      : undefined;

    console.log('id do cliente encontrado:', clienteEncontrado?.id_cliente);

    if (clienteEncontrado) {
      if (!id || clienteEncontrado.id_cliente?.toString() !== id.toString()) {
        setClienteExistente(clienteEncontrado);
        setCpfExistsDialogOpen(true);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('Erro na verificação de CPF:', error);
    toast.error("Erro ao verificar CPF no sistema");
    return true; // Bloqueia envio preventivamente
  } finally {
    setLoadingCpf(false);
  }
};

  const handleCloseDialog = () => setCpfExistsDialogOpen(false);

  const handleViewCliente = () => {
    if (clienteExistente?.id_cliente) navigate(`/cliente/view/${clienteExistente.id_cliente}`);
    setCpfExistsDialogOpen(false);
  };
  const handleEditCliente = () => {
    if (clienteExistente?.id_cliente) navigate(`/cliente/edit/${clienteExistente.id_cliente}`);
    setCpfExistsDialogOpen(false);
  };

  // Responsável por enviar o formulário
  const onSubmit = async (data) => {
 try {
    if (data.cpf) data.cpf = data.cpf.replace(/\D/g, '');
    if (data.telefone) data.telefone = data.telefone.replace(/\D/g, '');

    const cpfExiste = await verificarCpfExistente(data.cpf);
    if (cpfExiste) return;

    let retorno;

    if (id) {
      
      retorno = await updateCliente(id, data);
    } else {
      retorno = await createCliente(data);
    }

    if (!retorno?.id) throw new Error(retorno?.erro || 'Nenhuma resposta válida da API.');

    toast.success(`Cliente ${id ? 'atualizado' : 'cadastrado'} com sucesso (ID: ${retorno.id})`, { position: 'top-center' });
    navigate('/clientes');
  } catch (error) {
    toast.error(`Erro ao salvar cliente: ${error.message}`, { position: 'top-center' });
  }
};

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <ToastContainer />

      <CpfExistsCliente
        open={cpfExistsDialogOpen}
        onClose={handleCloseDialog}
        onView={handleViewCliente}
        onEdit={handleEditCliente}
        cliente={clienteExistente}
      />

      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={3}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          maxWidth: '1200px',
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

        {/* Campos do formulário */}
        <Box>
          <Controller
            name="nome"
            control={control}
            defaultValue=""
            rules={{ required: 'Nome é obrigatório' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nome Completo"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.nome}
                helperText={errors.nome?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon sx={{ color: '#FF6B95' }} />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
          <Controller
            name="cpf"
            control={control}
            defaultValue=""
            rules={{
              required: 'CPF é obrigatório',
              validate: (value) => {
                const cpfLimpo = (value || '').replace(/\D/g, '');
                if (!/^\d{11}$/.test(cpfLimpo)) {
                  return 'CPF inválido';
                }
              return true;
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="CPF"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ color: '#FF6B95' }} />
                    </InputAdornment>
                  ),
                  inputComponent: IMaskInputWrapper,
                  inputProps: {
                    mask: '000.000.000-00',
                    definitions: { '0': /\d/ },
                    unmask: true,
                    lazy: false,
                  },
                  endAdornment: loadingCpf && (
                    <InputAdornment position="end">
                      <CircularProgress size={20} />
                    </InputAdornment>
                  ),
                }}
                onBlur={async ()=>{
                   const valorLimpo = (field.value || '').replace(/\D/g, '');
                   await verificarCpfExistente(valorLimpo);
                   field.onBlur();
                }}
              />
            )}
          />
          <Controller
            name="telefone"
            control={control}
            defaultValue=""
            rules={{
              pattern: { value: /^\d{10,11}$/, message: 'Telefone inválido' },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Telefone"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.telefone}
                helperText={errors.telefone?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon sx={{ color: '#FF6B95' }} />
                    </InputAdornment>
                  ),
                  inputComponent: IMaskInputWrapper,
                  inputProps: {
                    mask: '(00) 00000-0000',
                    definitions: { '0': /\d/ },
                    unmask: true,
                    lazy: false,
                  },
                }}
              />
            )}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => navigate('/clientes')} sx={{ mr: 1 }} startIcon={<CancelIcon />}>Cancelar</Button>
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

export default ClienteForm;
