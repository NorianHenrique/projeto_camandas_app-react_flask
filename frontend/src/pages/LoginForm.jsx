import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Card, CardContent, InputAdornment } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    // Evento de submit do formulário
    const onSubmit = (data) => {
        console.log("Login", data);
        if (data.usuario === 'norian' && data.senha === 'senha123') {
            localStorage.setItem("loginRealizado", data.usuario);
            navigate('/home');
        } else {
            alert("Usuário ou senha inválidos!");
        }
    };

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                minHeight: '80vh',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: 3
            }}
        >
            <Card 
                elevation={8} 
                sx={{ 
                    maxWidth: 450, 
                    width: '100%',
                    borderRadius: 4,
                    overflow: 'hidden',
                    alignItems:'center'
                }}
            >
                <Box 
                    sx={{ 
                        background: 'linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)',
                        padding: 3,
                        textAlign: 'center'
                    }}
                >
                    <Typography 
                        variant="h4" 
                        color="white" 
                        fontWeight="bold"
                        sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}
                    >
                        Bem-vindo
                    </Typography>
                    <Typography 
                        variant="body1" 
                        color="white" 
                        sx={{ opacity: 0.9, mt: 1 }}
                    >
                        Digite suas credenciais para acessar o sistema
                    </Typography>
                </Box>

                <CardContent sx={{ padding: 4 }}>
                    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                        <TextField
                            label="Usuário"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ 
                                mb: 3, 
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            {...register('usuario', { required: 'Usuário é obrigatório' })}
                            error={!!errors.usuario} 
                            helperText={errors.usuario?.message}
                        />

                        <TextField
                            label="Senha"
                            type="password"
                            fullWidth
                            variant="outlined"
                            margin="normal"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="primary" />
                                    </InputAdornment>
                                ),
                            }}
                            sx={{ 
                                mb: 4, 
                                '& .MuiOutlinedInput-root': {
                                    borderRadius: 2
                                }
                            }}
                            {...register('senha', { 
                                required: 'Senha é obrigatória', 
                                minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' } 
                            })}
                            error={!!errors.senha} 
                            helperText={errors.senha?.message}
                        />

                        <Button 
                            type="submit" 
                            variant="contained" 
                            fullWidth 
                            size="large"
                            startIcon={<LoginIcon />}
                            sx={{ 
                                background: 'linear-gradient(90deg, #6A11CB 0%, #2575FC 100%)',
                                borderRadius: 2,
                                padding: '12px 0',
                                fontSize: '1rem',
                                textTransform: 'none',
                                '&:hover': {
                                    boxShadow: '0 6px 12px rgba(37, 117, 252, 0.3)'
                                }
                            }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default LoginForm;
