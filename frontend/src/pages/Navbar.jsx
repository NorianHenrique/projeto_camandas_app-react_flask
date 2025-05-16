import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  useMediaQuery, 
  useTheme, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Avatar
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useAuth } from "../context/AuthContext";


// Botão estilizado para a navbar
const NavButton = styled(Button)(({ theme }) => ({
  color: 'white',
  margin: '0 6px',
  borderRadius: '12px',
  padding: '10px 20px',
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 16px rgba(0, 0, 0, 0.15)',
  },

}));

const MobileNavItem = styled(ListItem)(({ theme }) => ({
  padding: '15px 24px',
  transition: 'all 0.2s ease',
  borderRadius: '8px',
  margin: '6px 12px',
  '&:hover': {
    backgroundColor: 'rgba(90, 64, 153, 0.08)',
    transform: 'translateX(5px)'
  }
}));

const Navbar = () => {
    const navigate = useNavigate();
     
    // useAuth é um hook personalizado que fornece acesso ao contexto de autenticação
    // logouut é uma função que realiza o logout do usuário
    // isAuthenticated é um booleano que indica se o usuário está autenticado ou não
    const {isAuthenticated,loggout} = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleLogout = () => {
        loggout();
    };

    const navigateTo = (path) => {
      navigate(path);
      if (isMobile) {
        setDrawerOpen(false);
      }
    };

    // Lista de itens do menu com ícones e destinações
    const menuItems = [
      { text: 'Home', icon: <HomeIcon />, path: '/home' },
      { text: 'Funcionários', icon: <PeopleIcon />, path: '/funcionarios' },
      { text: 'Clientes', icon: <PersonIcon />, path: '/clientes' },
      { text: 'Produtos', icon: <ShoppingBasketIcon />, path: '/produtos' },
    ];

    // Conteúdo do drawer (menu mobile)
    const drawer = (
      <>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(0, 0, 0, 0.06)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar 
              sx={{ 
                mr: 2, 
                background: 'linear-gradient(45deg, #5A4099 0%, #8367C7 100%)', 
                boxShadow: '0 3px 8px rgba(0, 0, 0, 0.12)' 
              }}
            >
              C
            </Avatar>
            <Typography variant="h6" fontWeight={700}>
              Comandas
            </Typography>
          </Box>
          <IconButton 
            onClick={() => setDrawerOpen(false)} 
            sx={{ 
              bgcolor: 'rgba(0, 0, 0, 0.05)', 
              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' } 
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ mt: 2, px: 1 }}>
          {menuItems.map((item, index) => (
            <MobileNavItem 
              button 
              key={index} 
              onClick={() => navigateTo(item.path)}
            >
              <ListItemIcon sx={{ color: '#5A4099', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </MobileNavItem>
          ))}
          
          {/* Item de logout separado */}
          <MobileNavItem 
            button 
            onClick={handleLogout}
            sx={{ 
              mt: 1, 
              bgcolor: 'rgba(90, 64, 153, 0.06)',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              '&:hover': { 
                bgcolor: 'rgba(90, 64, 153, 0.12)',
              }
            }}
          >
            <ListItemIcon sx={{ color: '#5A4099', minWidth: 40 }}>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Sair" 
              primaryTypographyProps={{ fontWeight: 600 }}
            />
          </MobileNavItem>
        </List>
      </>
    );

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
              padding: isMobile ? '12px 16px' : '12px 24px',  
            }}>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {isMobile && isAuthenticated && (
                    <IconButton 
                      color="inherit" 
                      edge="start" 
                      onClick={() => setDrawerOpen(true)}
                      sx={{ mr: 2 }}
                    >
                      <MenuIcon />
                    </IconButton>
                  )}
                <Typography 
                  variant={isMobile ? 'h6' : 'h5'} 
                  component='div' 
                  sx={{ 
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: 'white',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                    alignItems: 'center',
                  }}
                >
                   {!isMobile && (
                      <Avatar 
                        sx={{ 
                          mr: 1.5, 
                          bgcolor: 'rgba(255,255,255,0.2)', 
                          width: 38, 
                          height: 38,
                          boxShadow: '0 3px 10px rgba(0, 0, 0, 0.15)' 
                        }}
                      >
                        C
                      </Avatar>
                    )}

                    Comandas
                </Typography>
                </Box>
                
                {isAuthenticated && !isMobile && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {menuItems.map((item, index) => (
                          <NavButton 
                            key={index}
                            startIcon={item.icon}
                            onClick={() => navigate(item.path)}
                          >
                            {item.text}
                          </NavButton>
                        ))}
                        
                        <NavButton 
                          startIcon={<ExitToAppIcon />}
                          onClick={handleLogout}
                          sx={{ 
                            ml: 1,
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
            <Drawer
              anchor="left"
              open={drawerOpen && isMobile}
              onClose={() => setDrawerOpen(false)}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: '280px', 
                  borderRadius: '0 16px 16px 0',
                  boxShadow: '3px 0 15px rgba(0, 0, 0, 0.1)'
                },
              }}
            >
              {drawer}
            </Drawer>
      
        </AppBar>
    );
};

export default Navbar;
