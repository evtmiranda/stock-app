/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button';
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

export default function Create(props) {
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
      <Tooltip title={props.action.tooltip}>
        <Button
          size="small"
          tooltip="teste"
          color="primary"
          variant="contained"
          onClick={handleClickOpen}
        >
          Adicionar
          </Button>
      </Tooltip>
      <Dialog
        open={open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={handleClose}
        aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{props.action.tooltip}</DialogTitle>
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
                <Box fontWeight="fontWeightMedium" m={0}>
                  Permissões
                  </Box>
              </Typography>
            </FormGroup>
            {props.permissions.map((p, i, a) => {
              return (
                <React.Fragment key={p.moduleName}>
                  <FormGroup row style={{ marginTop: 10 }}>
                    <Typography component="div">
                      <Box fontWeight="fontWeightRegular" m={0}>
                        {p.moduleName}
                      </Box>
                    </Typography>
                  </FormGroup>
                  {p.permissions.map(x => {
                    return (
                      <React.Fragment key={x}>
                        <FormGroup style={{ marginLeft: 5 }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                color="primary"
                              />
                            }
                            label={x}
                          />
                        </FormGroup>
                      </React.Fragment>
                    )
                  })}
                  {!(a.length - 1 === i) && (
                    <Divider variant="fullWidth" />
                  )}
                </React.Fragment>
              )
            })}
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