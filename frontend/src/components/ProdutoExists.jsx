import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogContentText, 
  DialogActions, Button, Box 
} from '@mui/material';
import { Visibility, Edit, Cancel } from '@mui/icons-material';

const ProdutoExists= ({ open, onClose, onView, onEdit, produto}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        elevation: 8,
        sx: {
          borderRadius: 2,
          padding: 1,
          minWidth: 300
        }
      }}
    >
      <DialogTitle sx={{ color: '#FF6B95', fontWeight: 600 }}>
        Produto já cadastrado
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          O Produto informado já está cadastrado: 
          <Box component="span" sx={{ fontWeight: 600, display: 'block', mt: 1 }}>
            {produto?.nome || ""}
          </Box>
          O que você deseja fazer?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ padding: 2, display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          startIcon={<Cancel />} 
          onClick={onClose}
          color="inherit"
          sx={{ color: '#666' }}
        >
          Cancelar
        </Button>
        <Box>
          <Button 
            startIcon={<Visibility />} 
            onClick={onView}
            sx={{ mr: 1 }}
            color="primary"
          >
            Visualizar
          </Button>
          <Button 
            startIcon={<Edit />} 
            onClick={onEdit}
            variant="contained" 
            sx={{ 
              background: 'linear-gradient(45deg, #FF9A8B 0%, #FF6B95 55%, #FF3CAC 100%)',
              '&:hover': { 
                background: 'linear-gradient(45deg, #FF8A7B 0%, #FF5B85 55%, #FF2C9C 100%)',
              } 
            }}
          >
            Editar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default ProdutoExists;