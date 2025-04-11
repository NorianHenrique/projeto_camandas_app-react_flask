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
    Divider
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
const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  textTransform: 'none',
  padding: '10px 24px',
  fontWeight: 600,
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
}));

const FuncionarioForm = () => {
    const { register, handleSubmit, reset, control, setValue, formState: { errors } } = useForm();

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
          padding: 3,
          backgroundColor: '#f8f9fa',
          minHeight: '100vh'
        }}>
            <Paper
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                elevation={3}
                sx={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                }}
            >
                <Box sx={{ 
                    padding: '16px 24px',
                    background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
                    display: 'flex',
                    alignItems: 'center',
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
                        Cadastro de Funcionário
                    </Typography>
                </Box>

                <Box sx={{ padding: 4 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#3a7bd5', 
                                    fontWeight: 600, 
                                    mb: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <PersonIcon sx={{ mr: 1 }} /> Dados Pessoais
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
                        </Grid>
                        
                        <Grid item xs={12} md={6}>
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
                                sx={{ mb: 2 }}
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
                                                    <BadgeIcon color="action" />
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
                                            <BadgeIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('matricula', { required: 'Matrícula é obrigatória' })} 
                                error={!!errors.matricula} 
                                helperText={errors.matricula?.message}
                                sx={{ mb: 2 }}
                            />

                            <Controller
                                name="telefone"
                                control={control}
                                defaultValue=""
                                rules={{
                                    required: 'Telefone é obrigatório',
                                    pattern: {
                                        value: /^$\d{2}$ \d{4,5}-\d{4}$/,
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
                                                    <PhoneIcon color="action" />
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
                            <Typography 
                                variant="h6" 
                                sx={{ 
                                    color: '#3a7bd5', 
                                    fontWeight: 600, 
                                    mb: 1, 
                                    mt: 2,
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <VpnKeyIcon sx={{ mr: 1 }} /> Credenciais de Acesso
                            </Typography>
                            <Divider sx={{ mb: 3 }} />
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
                                            <VpnKeyIcon color="action" />
                                        </InputAdornment>
                                    ),
                                }}
                                {...register('senha', { 
                                    required: 'Senha é obrigatória', 
                                    minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } 
                                })}
                                error={!!errors.senha} 
                                helperText={errors.senha?.message}
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
                                            <GroupIcon color="action" />
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
                        justifyContent: 'flex-end', 
                        mt: 4,
                        gap: 2
                    }}>
                        <ActionButton 
                            variant="outlined"
                            color="inherit"
                            startIcon={<CancelIcon />}
                            onClick={() => reset()}
                            sx={{ 
                                '&:hover': { 
                                    backgroundColor: '#f5f5f5',
                                    borderColor: '#ccc',
                                } 
                            }}
                        >
                            Cancelar
                        </ActionButton>

                        <ActionButton 
                            type="submit" 
                            variant="contained" 
                            color="primary"
                            startIcon={<SaveIcon />}
                            sx={{ 
                                background: 'linear-gradient(90deg, #3a7bd5 0%, #00d2ff 100%)',
                                '&:hover': { 
                                    background: 'linear-gradient(90deg, #2461b3 0%, #00afd8 100%)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 6px 16px rgba(58, 123, 213, 0.4)',
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
