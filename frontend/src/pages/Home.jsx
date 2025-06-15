import React from "react";
import { Box, Typography, Container, Paper } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";
import {useAuth} from '../context/AuthContext';

const Home = () => {

    const navigate = useNavigate(); // Inicializando useNavigate
    const { usuarioLogado, grupoUsuario } = useAuth();

    const handleNavigation = (page) => {
        navigate(`/${page.toLowerCase()}`); // Função para navegar para a página correspondente
    };
    
    return (
        <Container maxWidth="xl" sx={{ 
            paddingY: 4,
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4efe9 100%)',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Paper elevation={0} sx={{ 
                padding: 4,
                paddingTop: 3,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
                textAlign: 'center',
                width: '100%',
                maxWidth: '800px',
                mb: 4,
                boxShadow: '0 10px 25px rgba(138, 45, 226, 0.25)',
            }}>

                <Typography 
                    variant="h4" 
                    sx={{ 
                        color: 'white',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        mb: 1,
                        textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                    }}
                >
                    Painel de Controle
                </Typography>
                
                <Typography 
                    variant="body1" 
                    sx={{ 
                        color: 'rgba(255, 255, 255, 0.85)',
                        mb: 1,
                        fontWeight: 500,
                    }}
                >
                    Sistema de gerenciamento de comandas e produtos
                </Typography>

               <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color:'white', fontSize:14}}>
                        Usuário: {usuarioLogado || 'Não autenticado'}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: 'white', fontSize:14 }}>
                        Grupo: {grupoUsuario || 'Sem grupo'}
                    </Typography>
                </Box>

            </Paper>

            <Box sx={{ 
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                width: '100%',
                maxWidth: '1000px',
            }}>
                {/* Card de boas-vindas */}
                <Paper elevation={4} sx={{ 
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: '20px',
                    textAlign: 'center',
                    flex: 2,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    }
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                        <StarIcon sx={{ fontSize: 40, color: '#8E2DE2', mb: 1 }} />
                    </Box>
                    
                    <Typography variant="h5" sx={{ 
                        color: '#333',
                        fontWeight: 700,
                        mb: 2,
                    }}>
                        Bem-vindo ao aplicativo Comandas!
                    </Typography>

                    <Typography variant="body1" sx={{ 
                        color: '#666',
                        mb: 3,
                        fontSize: '1.1rem',
                        lineHeight: 1.6,
                    }}>
                        Explore as funcionalidades do sistema e otimize seu trabalho.
                        Gerencie clientes, produtos e vendas de forma simples e eficiente.
                    </Typography>
                    
                    <Box sx={{ 
                        padding: 2, 
                        backgroundColor: 'rgba(142, 45, 226, 0.08)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <CalendarTodayIcon sx={{ fontSize: 20, color: '#8E2DE2', mr: 1 }} />
                        <Typography variant="body2" sx={{ color: '#555', fontWeight: 500 }}>
                            {`Data atual: ${new Date().toLocaleDateString('pt-BR', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}`}
                        </Typography>
                    </Box>
                </Paper>
                
                {/* Card de estatísticas */}
                <Paper elevation={4} sx={{ 
                    backgroundColor: 'white',
                    padding: 4,
                    borderRadius: '20px',
                    flex: 1,
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
                    }
                }}>
                    <Typography variant="h6" sx={{ 
                        color: '#333',
                        fontWeight: 700,
                        mb: 3,
                        textAlign: 'center'
                    }}>
                        Acesso Rápido
                    </Typography>
                    
                    {['Clientes', 'Produtos', 'Funcionarios'].map((item, index) => (
                        <Box key={index} sx={{ 
                            padding: 2,
                            borderRadius: '12px',
                            backgroundColor: index % 2 === 0 ? 'rgba(142, 45, 226, 0.08)' : 'rgba(74, 0, 224, 0.05)',
                            mb: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                backgroundColor: index % 2 === 0 ? 'rgba(142, 45, 226, 0.15)' : 'rgba(74, 0, 224, 0.12)',
                            }        
                        }}
                        onClick={() => handleNavigation(item)} 
                        >
                            <Typography variant="body1" sx={{ color: '#555', fontWeight: 500 }}>
                                {item}
                            </Typography>
                        </Box>
                    ))}
                </Paper>
            </Box>
        </Container>
    );
};

export default Home;
