import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
    <React.Fragment>
      <Tooltip title={action.action.tooltip}>
        <IconButton
          aria-label={action.action.icon}
          size="small"
          tooltip="teste"
          onClick={handleClickOpen}
        >
          <Button variant="contained" color="primary" >
            Adicionar
          </Button>
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
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            fullWidth
          />
          <FormControl component="fieldset">
            <FormGroup row style={{ marginTop: 20, marginBottom: 30 }}>
              <Typography component="div">
                <Box fontWeight="1500" m={0}>
                  Permissões
                </Box>
              </Typography>
            </FormGroup>
            <FormGroup row style={{ marginTop: 10 }}>
              <Typography component="div">
                <Box fontWeight="fontWeightMedium" m={0}>
                  Tela Inicial
                </Box>
              </Typography>
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                  />
                }
                label="Visualizar"
              />
            </FormGroup>
            <Divider variant="fullWidth" />
            <FormGroup row style={{ marginTop: 10 }}>
              <Typography component="div">
                <Box fontWeight="fontWeightMedium" m={0}>
                  Estoque
                </Box>
              </Typography>
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                  />
                }
                label="Visualizar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                  />
                }
                label="Editar"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                  />
                }
                label="Excluir"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                  />
                }
                label="Adicionar"
              />
            </FormGroup>
          </FormControl>
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
    </React.Fragment>
  );
}