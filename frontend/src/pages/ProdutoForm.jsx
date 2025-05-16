import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Divider,
    InputAdornment,
    Grid,
    IconButton,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { 
  Save, Cancel, ImageOutlined, Description, ShoppingCart, AttachMoney
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

// Botão de ação estilizado
const StyledButton = styled(Button)(({ theme, variant }) => ({
  borderRadius: '10px',
  padding: '10px 24px',
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: variant === 'contained' ? '0 4px 10px rgba(255, 65, 108, 0.3)' : 'none',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: variant === 'contained' 
      ? '0 6px 15px rgba(255, 65, 108, 0.4)' 
      : '0 4px 10px rgba(0, 0, 0, 0.07)',
  }
}));

// Input de arquivo estilizado
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// Contêiner para a prévia da imagem
const ImagePreviewContainer = styled(Box)(({ theme }) => ({
  marginTop: 16,
  marginBottom: 16,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 8,
  padding: 16,
  backgroundColor: '#f5f5f5',
  borderRadius: 8,
  border: '1px dashed #ccc',
  [theme.breakpoints.down('sm')]: {
    padding: 12,
  }
}));

const ProdutoForm = () => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [foto, setFoto] = useState(null); // Para armazenar a foto
    const [previewUrl, setPreviewUrl] = useState(''); // Para a prévia da imagem
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

    const onSubmit = (data) => {
        // Formatar o valor unitário para número antes de enviar
        const formattedData = {
            ...data,
            valor_unitario: parseFloat(data.valor_unitario.replace(/[^\d.,]/g, '').replace(',', '.')),
            foto
        };
        console.log("Dados do produto:", formattedData);
    };

    const handleFotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFoto(file);
            // Criar URL para prévia da imagem
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    // Formatar valor monetário enquanto digita
    const formatCurrency = (value) => {
        if (!value) return 'R$ ';
        
        value = value.replace(/\D/g, '');
        value = (parseInt(value) / 100).toFixed(2);
        value = value.replace('.', ',');
        value = value.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
        return `R$ ${value}`;
    };

    // Parser para converter de volta para string com apenas números
    const parseCurrency = (value) => {
        return value ? value.replace(/[^\d]/g, '') : '';
    };

    return (
        <Box sx={{
          padding: { xs: 1.5, sm: 2, md: 3 },
          backgroundColor: '#f8f9fa',
          minHeight: '100vh'
        }}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 5px 20px rgba(0, 0, 0, 0.08)',
            }}
          >
            <Box sx={{ 
              background: 'linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)',
              padding: { xs: '12px 16px', md: '16px 24px' },
              display: 'flex',
              alignItems: 'center',
              gap: { xs: 1, md: 2 },
              flexDirection: isMobile ? 'column' : 'row',
              justifyContent: isMobile ? 'center' : 'flex-start'
            }}>
              {!isMobile && (
                <ShoppingCart sx={{ color: 'white', fontSize: { xs: 28, md: 32 } }} />
              )}
              <Typography 
                variant={isMobile ? "h6" : "h5"} 
                sx={{ 
                  color: 'white', 
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
                  textAlign: isMobile ? 'center' : 'left'
                }}
              >
                Cadastro de Produto
              </Typography>
            </Box>
            
            <Box 
              component="form" 
              onSubmit={handleSubmit(onSubmit)} 
              sx={{ 
                padding: { xs: 2, sm: 3, md: 4 },
              }}
            >
              <Typography 
                variant={isMobile ? "subtitle1" : "h6"}
                sx={{ 
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  color: '#333',
                  fontWeight: 600,
                  mb: 2 
                }}
              >
                <Description sx={{ color: '#FF416C' }} />
                Informações do Produto
              </Typography>
              <Divider sx={{ mb: 3 }} />
              
              <Grid container spacing={isMobile ? 2 : 3}>
                <Grid item xs={12}>
                  <TextField
                    label="Nome do Produto"
                    fullWidth
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ShoppingCart color="action" />
                        </InputAdornment>
                      ),
                    }}
                    {...register('nome', { required: 'Nome é obrigatório' })}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    label="Descrição"
                    fullWidth
                    multiline
                    rows={isMobile ? 2 : 3}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: isMobile ? 1 : 1.5 }}>
                          <Description color="action" />
                        </InputAdornment>
                      ),
                    }}
                    {...register('descricao')}
                    error={!!errors.descricao}
                    helperText={errors.descricao?.message}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="valor_unitario"
                    control={control}
                    defaultValue="R$ 0,00"
                    rules={{ required: 'Valor unitário é obrigatório' }}
                    render={({ field, fieldState }) => (
                      <TextField
                        label="Valor Unitário"
                        fullWidth
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AttachMoney color="action" />
                            </InputAdornment>
                          ),
                        }}
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(formatCurrency(value));
                        }}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Button
                    component="label"
                    variant="outlined"
                    fullWidth
                    startIcon={<ImageOutlined />}
                    sx={{ 
                      height: '56px',
                      borderColor: '#ccc',
                      color: '#555',
                      '&:hover': {
                        borderColor: '#FF416C',
                        backgroundColor: 'rgba(255, 65, 108, 0.05)'
                      }
                    }}
                  >
                    Selecionar Imagem
                    <VisuallyHiddenInput 
                      type="file"
                      accept="image/*"
                      onChange={handleFotoChange}
                    />
                  </Button>
                </Grid>
                
                {previewUrl && (
                  <Grid item xs={12}>
                    <ImagePreviewContainer>
                      <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
                        Prévia da Imagem:
                      </Typography>
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: isMobile ? '150px' : '200px',
                          borderRadius: '8px',
                          objectFit: 'contain'
                        }} 
                      />
                    </ImagePreviewContainer>
                  </Grid>
                )}
              </Grid>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column-reverse' : 'row',
                justifyContent: isMobile ? 'stretch' : 'flex-end', 
                gap: 2,
                mt: 4 
              }}>
                <StyledButton 
                  variant="outlined" 
                  startIcon={<Cancel />}
                  fullWidth={isMobile}
                  sx={{ 
                    borderColor: '#ccc',
                    color: '#777' 
                  }}
                >
                  Cancelar
                </StyledButton>

                <StyledButton 
                  type="submit" 
                  variant="contained" 
                  startIcon={<Save />}
                  fullWidth={isMobile}
                  sx={{ 
                    background: 'linear-gradient(45deg, #FF4B2B 0%, #FF416C 100%)',
                    color: 'white',
                    mb: isMobile ? 1 : 0
                  }}
                >
                  Cadastrar Produto
                </StyledButton>
              </Box>
            </Box>
          </Paper>
        </Box>
    );
};

export default ProdutoForm;
