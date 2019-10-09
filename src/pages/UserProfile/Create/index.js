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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function Create(props) {
  const [open, setOpen] = React.useState(false);
  const [permissionsSelected, setPermissionSelected] = React.useState([])

  const [textFieldName, setTextFieldName] = React.useState('')
  const [textFieldNameError, setTextFieldNameError] = React.useState('')

  const [textFieldDescription, setTextFieldDescription] = React.useState('')
  const [textFieldDescriptionError, setTextFieldDescriptionError] = React.useState('')

  const [maxWidth] = React.useState('sm');
  const fullWidth = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const createProfile = () => {
    validateForm()
  }

  const validateForm = () => {
    const requiredMessage = "este campo é obrigatório";

    textFieldName ? setTextFieldNameError('') : setTextFieldNameError(requiredMessage)
    textFieldDescription ? setTextFieldDescriptionError('') : setTextFieldDescriptionError(requiredMessage)
  }

  const handleChange = event => {
    if (event.target.checked) {
      if (!permissionsSelected.includes(event.target.value)) {
        setPermissionSelected([...permissionsSelected, event.target.value]);
      }
    }
    else {
      setPermissionSelected(
        permissionsSelected.filter(value => {
          return value !== event.target.value;
        }));
    }
  };

  const moduleStyle = {
    marginTop: 15,
    display: 'block'
  };

  const permissionStyle = {
    display: 'block',
    marginLeft: 10
  };

  const formControlStyle = {
    marginTop: 30
  };

  const formGroupStyle = {
    marginBottom: 15
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
            value={textFieldName}
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            error={textFieldNameError ? true : false}
            fullWidth
            required
            onChange={event => setTextFieldName(event.target.value)}
          />
          {textFieldNameError && (<FormHelperText error>{textFieldNameError}</FormHelperText>)}
          <TextField
            value={textFieldDescription}
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            error={textFieldDescriptionError ? true : false}
            fullWidth
            required
            onChange={event => setTextFieldDescription(event.target.value)}
          />
          {textFieldDescriptionError && (<FormHelperText error>{textFieldDescriptionError}</FormHelperText>)}
          <FormControl component="fieldset" style={formControlStyle}>
            <FormGroup onChange={handleChange}>
              <Typography component="div" style={formGroupStyle}>
                <Box fontWeight="fontWeightMedium" m={0}>
                  Permissões
                  </Box>
              </Typography>
              {props.permissions.map((p, i, a) => {
                return (
                  <React.Fragment key={p.moduleName}>
                    <div style={moduleStyle}>
                      <Typography component="div">
                        <Box fontWeight="fontWeightRegular" m={0}>
                          {p.moduleName}
                        </Box>
                      </Typography>
                      {p.permissions.map(x => {
                        return (
                          <React.Fragment key={x}>
                            <div style={permissionStyle}>
                              <FormControlLabel
                                value={p.moduleName + "|" + x}
                                control={
                                  <Checkbox
                                    color="primary"
                                  />
                                }
                                label={x}
                              />
                            </div>
                          </React.Fragment>
                        )
                      })}
                      {!(a.length - 1 === i) && (
                        <Divider variant="fullWidth" />
                      )}
                    </div>
                  </React.Fragment>
                )
              })}
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Sair
            </Button>
          <Button onClick={createProfile} color="primary">
            Adicionar
            </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}