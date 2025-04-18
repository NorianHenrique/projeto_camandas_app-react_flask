import React from "react";
import { Box, Typography, Button, Container, Paper } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';

// Botão estilizado
const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '10px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)',
  }
}));

const NotFound = () => {
    const navigate = useNavigate();
    
    return (
        <Container maxWidth="md" sx={{ 
            py: { xs: 6, md: 10 },
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Paper 
                elevation={3} 
                sx={{ 
                    borderRadius: '16px',
                    overflow: 'hidden',
                    width: '100%',
                    textAlign: 'center',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Box sx={{
                    background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                    padding: { xs: '20px', md: '30px' },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <ErrorOutlineIcon 
                        sx={{ 
                            fontSize: { xs: 60, md: 80 }, 
                            color: 'white',
                            mb: 2
                        }}
                    />
                    <Typography 
                        variant="h3"
                        component="h1"
                        sx={{ 
                            color: 'white',
                            fontWeight: 700,
                            fontSize: { xs: '1.8rem', md: '2.5rem' },
                            textShadow: '1px 1px 2px rgba(0,0,0,0.2)'
                        }}
                    >
                        Página não encontrada
                    </Typography>
                </Box>

                <Box sx={{ 
                    padding: { xs: '30px 20px', md: '50px 40px' },
                    backgroundColor: 'white',
                }}>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            color: '#555',
                            fontSize: { xs: '1rem', md: '1.1rem' },
                            lineHeight: 1.6,
                            mb: 4,
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        A página que você está procurando não existe ou foi movida.
                        Por favor, verifique o endereço ou retorne para a página inicial.
                    </Typography>
                    
                    <StyledButton
                        variant="contained" 
                        color="primary"
                        startIcon={<HomeIcon />}
                        onClick={() => navigate('/home')}
                        sx={{
                            background: 'linear-gradient(90deg, #4568dc 0%, #b06ab3 100%)',
                            color: 'white',
                        }}
                    >
                        Voltar para a Home
                    </StyledButton>
                </Box>
            </Paper>
        </Container>
    );
};

export default NotFound;
