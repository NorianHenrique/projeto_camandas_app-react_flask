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
import CpfExistsDialog from '../components/CpfExistsDialog';

import {
  createFuncionario,
  updateFuncionario,
  getFuncionarioById,
  checkCpfExists,
} from '../services/funcionarioService';

const FuncionarioForm = () => {
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
  const [funcionarioExistente, setFuncionarioExistente] = useState(null);
  const [alterarSenha, setAlterarSenha] = useState(!id); // true para cadastro novo

  let title = id
    ? isReadOnly
      ? `Visualizar Funcionário: ${id}`
      : `Editar Funcionário: ${id}`
    : 'Novo Funcionário';

  // Carregar funcionário para edição/visualização
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getFuncionarioById(id);
          if (!data) throw new Error('Funcionário não encontrado');

          const { senha, ...dataWithoutSenha } = data;
          reset(dataWithoutSenha);
        } catch (error) {
          toast.error(`Erro ao buscar funcionário: ${error.message}`, { position: 'top-center' });
          navigate('/funcionarios');
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

    const funcionarioEncontrado = Array.isArray(resultado) && resultado.length > 0
      ? resultado[0]
      : undefined;

    console.log('id do funcionario encontrado:', funcionarioEncontrado?.id_funcionario);

    if (funcionarioEncontrado) {
      if (!id || funcionarioEncontrado.id_funcionario?.toString() !== id.toString()) {
        setFuncionarioExistente(funcionarioEncontrado);
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

  const handleViewFuncionario = () => {
    if (funcionarioExistente?.id_funcionario) navigate(`/funcionario/view/${funcionarioExistente.id_funcionario}`);
    setCpfExistsDialogOpen(false);
  };
  const handleEditFuncionario = () => {
    if (funcionarioExistente?.id_funcionario) navigate(`/funcionario/edit/${funcionarioExistente.id_funcionario}`);
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
      // Insira ou não o campo senha e deixar o serviço cuidar da lógica
      retorno = await updateFuncionario(id, data);
    } else {
      retorno = await createFuncionario(data);
    }

    if (!retorno?.id) throw new Error(retorno?.erro || 'Nenhuma resposta válida da API.');

    toast.success(`Funcionário ${id ? 'atualizado' : 'cadastrado'} com sucesso (ID: ${retorno.id})`, { position: 'top-center' });
    navigate('/funcionarios');
  } catch (error) {
    toast.error(`Erro ao salvar funcionário: ${error.message}`, { position: 'top-center' });
  }
};

  return (
    <Box sx={{ padding: { xs: 2, sm: 3, md: 4 }, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <ToastContainer />

      <CpfExistsDialog
        open={cpfExistsDialogOpen}
        onClose={handleCloseDialog}
        onView={handleViewFuncionario}
        onEdit={handleEditFuncionario}
        funcionario={funcionarioExistente}
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
            name="matricula"
            control={control}
            defaultValue=""
            rules={{ required: 'Matrícula é obrigatória' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Matrícula"
                fullWidth
                disabled={isReadOnly}
                error={!!errors.matricula}
                helperText={errors.matricula?.message}
                margin="normal"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <BadgeIcon sx={{ color: '#FF6B95' }} />
                    </InputAdornment>
                  ),
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

          <Box mt={4} mb={2}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: '#FF6B95', display: 'flex', alignItems: 'center' }}
            >
              <VpnKeyIcon sx={{ mr: 1 }} />
              Credenciais de Acesso
            </Typography>
            <Divider sx={{ mb: 3, borderColor: 'rgba(255, 107, 149, 0.2)' }} />
          </Box>

          {id && !isReadOnly && (
            <FormControlLabel
              control={<Switch checked={alterarSenha} onChange={(e) => setAlterarSenha(e.target.checked)} />}
              label="Alterar senha"
            />
          )}

          {(!id || alterarSenha || isReadOnly) && (
            <Controller
              name="senha"
              control={control}
              defaultValue=""
              rules={{
                required: (!id || alterarSenha) && !isReadOnly ? 'Senha é obrigatória' : false,
                minLength: { value: 6, message: 'Senha deve ter ao menos 6 caracteres' },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label={isReadOnly ? 'Senha (oculta por segurança)' : 'Senha'}
                  type="password"
                  fullWidth
                  disabled={isReadOnly || (id && !alterarSenha)}
                  error={!!errors.senha}
                  helperText={errors.senha?.message || (isReadOnly ? 'A senha está armazenada de forma segura' : '')}
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon sx={{ color: '#FF6B95' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
          )}

          <Controller
            name="grupo"
            control={control}
            defaultValue=""
            rules={{ required: 'Grupo é obrigatório' }}
            render={({ field }) => (
              <FormControl fullWidth margin="normal" disabled={isReadOnly} error={!!errors.grupo}>
                <InputLabel id="grupo-label">Grupo</InputLabel>
                <Select {...field} labelId="grupo-label" label="Grupo">
                  <MenuItem value="1">Admin</MenuItem>
                  <MenuItem value="2">Atendimento Balcão</MenuItem>
                  <MenuItem value="3">Atendimento Caixa</MenuItem>
                </Select>
                {errors.grupo && <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 2 }}>{errors.grupo.message}</Typography>}
              </FormControl>
            )}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button onClick={() => navigate('/funcionarios')} sx={{ mr: 1 }} startIcon={<CancelIcon />}>Cancelar</Button>
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

export default FuncionarioForm;
