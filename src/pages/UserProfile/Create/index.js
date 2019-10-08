import React from 'react';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Create(action) {
  const [open, setOpen] = React.useState(false);
  const [maxWidth] = React.useState('sm');
  const fullWidth = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <Tooltip title={action.action.tooltip}>
        <IconButton
          aria-label={action.action.icon}
          size="small"
          tooltip="teste"
          onClick={handleClickOpen}
        >
          <Icon color="primary">{action.action.icon}</Icon>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{action.action.tooltip}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            fullWidth
          />
          {/* module
          permission */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
          </Button>
          <Button onClick={handleClose} color="primary">
            Adicionar
          </Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}