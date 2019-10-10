import React from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { profileService } from '../../../services';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    width: 400,
  },
}));

export default function Create(action) {
  const classes = useStyles();
  const [profile, setProfile] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [maxWidth] = React.useState('sm');
  const fullWidth = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = event => {
    setProfile(event.target.value);
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
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
            margin="normal"
            variant="outlined"
            id="name"
            label="Nome"
            type="text"
            fullWidth
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="description"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            margin="normal"
            variant="outlined"
            id="description"
            label="Password"
            type="password"
            fullWidth
          />

          <form autoComplete="off">
            <Button className={classes.button} onClick={handleSelectOpen}>
              Perfil do Usuário
              </Button>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="controlled-open-select">Perfil</InputLabel>
              <Select
                selectOpen={selectOpen}
                onClose={handleSelectClose}
                onOpen={handleSelectOpen}
                value={profile}
                onChange={handleChange}
                inputProps={{
                  name: 'profile',
                  id: 'controlled-open-select',
                }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Admin</MenuItem>
              </Select>
            </FormControl>
          </form>
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