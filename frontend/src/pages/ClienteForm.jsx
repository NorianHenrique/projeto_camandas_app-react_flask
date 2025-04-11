import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Divider,
    Grid,
    InputAdornment,
    Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PhoneIcon from '@mui/icons-material/Phone';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '8px',
  padding: '10px 22px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: variant === 'contained' ? '0 4px 12px rgba(24, 90, 157, 0.2)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: variant === 'contained' ? '0 6px 15px rgba(24, 90, 157, 0.3)' : '0 4px 10px rgba(0, 0, 0, 0.08)',
  }
}));

const ClienteForm = () => {
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Dados do cliente:", data);
    };

    const formatCPF = (value) => {
        // Remove qualquer caractere não numérico
        const digits = value.replace(/\D/g, '');

        // Formata o CPF para "000.000.000-00"
        if (digits.length <= 3) return digits;
        if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, '$1.$2');
        if (digits.length <= 9) return digits.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
        return digits.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4').substring(0, 14);
    };

    const formatTelefone = (value) => {
        // Remove qualquer caractere não numérico
        const digits = value.replace(/\D/g, '');

        // Formata o telefone para "(99) 99999-9999"
        if (digits.length <= 2) return `(${digits}`;
        if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
        if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
        return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
    };

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
            <Box sx={{ 
              background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: 2
            }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'white', 
                  color: '#185a9d',
                  width: 48,
                  height: 48
                }}
              >
                <PersonIcon />
              </Avatar>
              
              <Typography 
                variant="h5" 
                component="h1" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                }}
              >
                Cadastro de Cliente
              </Typography>
            </Box>
            
            <Box 
              component="form" 
              onSubmit={handleSubmit(onSubmit)} 
              sx={{ 
                padding: 4,
              }}
            >
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    color: '#374151',
                    fontWeight: 600,
                    mb: 1
                  }}
                >
                  <AssignmentIndIcon sx={{ mr: 1, color: '#43cea2' }} />
                  Informações Pessoais
                </Typography>
                <Divider />
              </Box>
              
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Nome Completo"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonIcon color="action" />
                        </InputAdornment>
                      ),
                    }}
                    {...register('nome', { required: 'Nome é obrigatório' })}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="cpf"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'CPF é obrigatório',
                      pattern: {
                        value: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        message: 'CPF inválido'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="CPF"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AssignmentIndIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          const formattedValue = formatCPF(e.target.value);
                          field.onChange(formattedValue);
                        }}
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Controller
                    name="telefone"
                    control={control}
                    defaultValue=""
                    rules={{
                      required: 'Telefone é obrigatório',
                      pattern: {
                        value: /^$\d{2}$ \d{5}-\d{4}$/,
                        message: 'Telefone inválido'
                      }
                    }}
                    render={({ field, fieldState }) => (
                      <TextField
                        {...field}
                        label="Telefone"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon color="action" />
                            </InputAdornment>
                          ),
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        onChange={(e) => {
                          const formattedValue = formatTelefone(e.target.value);
                          field.onChange(formattedValue);
                        }}
                      />
                    )}
                  />
                </Grid>
              </Grid>
              
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'flex-end', 
                gap: 2,
                mt: 4 
              }}>
                <StyledButton 
                  variant="outlined"
                  startIcon={<CancelIcon />}
                  color="inherit"
                  sx={{ color: '#6B7280' }}
                >
                  Cancelar
                </StyledButton>
                
                <StyledButton 
                  type="submit" 
                  variant="contained" 
                  startIcon={<SaveIcon />}
                  sx={{ 
                    background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
                    color: 'white',
                  }}
                >
                  Cadastrar
                </StyledButton>
              </Box>
            </Box>
          </Paper>
        </Box>
    );
};

export default ClienteForm;
