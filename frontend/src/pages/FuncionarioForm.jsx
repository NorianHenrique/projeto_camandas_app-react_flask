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
    Grid,
    Paper,
    InputAdornment,
    Divider,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PhoneIcon from '@mui/icons-material/Phone';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import GroupIcon from '@mui/icons-material/Group';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

// Botão de ação estilizado
const ActionButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '12px',
  textTransform: 'none',
  padding: '10px 24px',
  fontWeight: 600,
  boxShadow: variant === 'contained' ? '0 5px 15px rgba(255, 107, 149, 0.3)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: variant === 'contained' 
      ? '0 8px 20px rgba(255, 107, 149, 0.4)' 
      : '0 4px 10px rgba(0, 0, 0, 0.1)',
  }
}));

// Componente para título de seção
const SectionTitle = styled(Typography)(({ theme }) => ({
  color: '#FF6B95',
  fontWeight: 600,
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1)
  }
}));

const FuncionarioForm = () => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const onSubmit = (data) => {
        console.log("Dados do funcionário:", data);
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
          padding: { xs: 2, sm: 3, md: 4 },
          backgroundColor: '#f8f9fa',
          minHeight: '100vh'
        }}>
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
                }}
            >
                <Box sx={{ 
                    padding: { xs: '16px', md: '20px 30px' },
                    background: 'linear-gradient(45deg, #FF9A8B 0%, #FF6B95 55%, #FF3CAC 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                }}>
                    <Typography 
                        variant={isMobile ? "h6" : "h5"} 
                        sx={{ 
                            color: 'white', 
                            fontWeight: 700,
                            letterSpacing: '0.5px',
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                            marginBottom: isMobile ? 1 : 0,
                            textAlign: isMobile ? 'center' : 'left',
                        }}
                    >
                        Cadastro de Funcionário
                    </Typography>
                    
                    {!isMobile && (
                        <Typography 
                            variant="body2" 
                            sx={{ 
                                color: 'rgba(255, 255, 255, 0.9)',
                                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                                padding: '6px 12px',
                                borderRadius: '20px',
                                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            Preencha todos os campos obrigatórios *
                        </Typography>
                    )}
                </Box>

                <Box sx={{ 
                  padding: { xs: 2, sm: 3, md: 4 }
                }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <SectionTitle variant="h6">
                                <PersonIcon /> Dados Pessoais
                            </SectionTitle>
                            <Divider sx={{ 
                              mb: 3,
                              '&::before, &::after': {
                                borderColor: 'rgba(255, 107, 149, 0.2)',
                              }
                            }} />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Nome Completo"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon sx={{ color: '#FF6B95' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('nome', { required: 'Nome é obrigatório' })} 
                                error={!!errors.nome} 
                                helperText={errors.nome?.message}
                                sx={{ mb: { xs: 2, md: 3 } }}
                            />

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
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <BadgeIcon sx={{ color: '#FF6B95' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            const formattedValue = formatCPF(e.target.value);
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                )}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Matrícula"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <BadgeIcon sx={{ color: '#FF6B95' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('matricula', { required: 'Matrícula é obrigatória' })} 
                                error={!!errors.matricula} 
                                helperText={errors.matricula?.message}
                                sx={{ mb: { xs: 2, md: 3 } }}
                            />

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
                                        error={!!fieldState.error}
                                        helperText={fieldState.error?.message}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <PhoneIcon sx={{ color: '#FF6B95' }} />
                                                </InputAdornment>
                                            ),
                                        }}
                                        onChange={(e) => {
                                            const formattedValue = formatTelefone(e.target.value);
                                            field.onChange(formattedValue);
                                        }}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <SectionTitle 
                                variant="h6" 
                                sx={{ mt: { xs: 2, md: 3 } }}
                            >
                                <VpnKeyIcon /> Credenciais de Acesso
                            </SectionTitle>
                            <Divider sx={{ 
                              mb: 3,
                              '&::before, &::after': {
                                borderColor: 'rgba(255, 107, 149, 0.2)',
                              }
                            }} />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Senha"
                                type="password"
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <VpnKeyIcon sx={{ color: '#FF6B95' }} />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('senha', { 
                                    required: 'Senha é obrigatória', 
                                    minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } 
                                })}
                                error={!!errors.senha} 
                                helperText={errors.senha?.message}
                                sx={{ mb: { xs: 2, md: 0 } }}
                            />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel id="grupo-label">Grupo de Acesso</InputLabel>
                                <Select
                                    labelId="grupo-label"
                                    label="Grupo de Acesso"
                                    defaultValue=""
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <GroupIcon sx={{ color: '#FF6B95' }} />
                                        </InputAdornment>
                                    }
                                    {...register('grupo')}
                                >
                                    <MenuItem value="admin">Administrador</MenuItem>
                                    <MenuItem value="gerente">Gerente</MenuItem>
                                    <MenuItem value="funcionario">Funcionário</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box sx={{ 
                        display: 'flex', 
                        justifyContent: isMobile ? 'center' : 'flex-end',
                        flexDirection: isMobile ? 'column' : 'row',
                        mt: 4,
                        gap: 2
                    }}>
                        <ActionButton 
                            variant="outlined"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={() => reset()}
                            fullWidth={isMobile}
                            sx={{ 
                                borderColor: '#ddd',
                                color: '#666',
                                order: isMobile ? 2 : 1,
                                '&:hover': { 
                                    borderColor: '#FF6B95',
                                    color: '#FF6B95',
                                } 
                            }}
                        >
                            Cancelar
                        </ActionButton>

                        <ActionButton 
                            type="submit" 
                            variant="contained"
                            startIcon={<SaveIcon />}
                            fullWidth={isMobile}
                            sx={{ 
                                order: isMobile ? 1 : 2,
                                background: 'linear-gradient(45deg, #FF9A8B 0%, #FF6B95 55%, #FF3CAC 100%)',
                                color: 'white',
                                '&:hover': { 
                                    background: 'linear-gradient(45deg, #FF8A7B 0%, #FF5B85 55%, #FF2C9C 100%)',
                                } 
                            }}
                        >
                            Salvar
                        </ActionButton>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default FuncionarioForm;
