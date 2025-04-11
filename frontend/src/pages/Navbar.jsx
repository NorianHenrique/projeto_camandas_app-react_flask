import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Botão estilizado para a navbar
const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 4px',
  borderRadius: '10px',
  padding: '8px 16px',
  textTransform: 'none',
  fontWeight: 500,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
  },
}));

const Navbar = () => {
    const navigate = useNavigate();
    const loginRealizado = localStorage.getItem('loginRealizado');

    const handleLogout = () => {
        localStorage.removeItem('loginRealizado');
        navigate('/login');
    };

    return (
        <AppBar 
          position='static' 
          sx={{ 
            width: '100%', 
            background: 'linear-gradient(135deg, #43cea2 0%, #185a9d 100%)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            borderRadius: '0 0 12px 12px',
          }}
        >
            <Toolbar sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              padding: '10px 24px', 
            }}>
                <Typography 
                  variant='h5' 
                  component='div' 
                  sx={{ 
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  }}
                >
                    Comandas
                </Typography>
                
                {loginRealizado && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <NavButton 
                          startIcon={<HomeIcon />}
                          onClick={() => navigate('/home')}
                        >
                            Home
                        </NavButton>
                        
                        <NavButton 
                          startIcon={<PeopleIcon />}
                          onClick={() => navigate('/funcionarios')}
                        >
                            Funcionários
                        </NavButton>
                        
                        <NavButton 
                          startIcon={<PersonIcon />}
                          onClick={() => navigate('/clientes')}
                        >
                            Clientes
                        </NavButton>
                        
                        <NavButton 
                          startIcon={<ShoppingBasketIcon />}
                          onClick={() => navigate('/produtos')}
                        >
                            Produtos
                        </NavButton>
                        
                        <NavButton 
                          startIcon={<ExitToAppIcon />}
                          onClick={handleLogout}
                          sx={{ 
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            }
                          }}
                        >
                            Sair
                        </NavButton>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
