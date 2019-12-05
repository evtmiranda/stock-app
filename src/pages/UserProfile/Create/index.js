/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField } from 'final-form-material-ui';
import Grid from '@material-ui/core/Grid';
import { Form, Field } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { profileService } from '../../../services'

export default function Create(props) {
  const [open, setOpen] = React.useState(false);
  const [permissionsSelected, setPermissionSelected] = React.useState([])
  const [errorMessageProps, setErrorMessageProps] = React.useState('');
  const [selectMessageProps, setSelectMessageProps] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const [maxWidth] = React.useState('sm');
  const fullWidth = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrorMessage();
    setLoading(false)
  };

  const clearErrorMessage = () => setErrorMessageProps('')

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async values => {
    await sleep(300)
    setLoading(true)
    clearErrorMessage()

    const { name, description } = values;

    if (permissionsSelected.length === 0) {
      setSelectMessageProps({
        children: "É necessário selecionar no mínimo uma permissão.",
        paragraph: true,
        color: "error"
      })

      setLoading(false)
      return
    }

    const profile = {
      name,
      description,
      permissions: permissionsSelected
    }

    const result = await profileService.create(profile);

    if (result.errors) {
      const errors = result.errors
      const message = errors.map(p => (
        <li key={p.field}>{p.message}</li>
      ))

      setErrorMessageProps({
        titleMessage: (<div><p>Atenção</p><br></br></div>),
        children: message,
        paragraph: true,
        color: "error"
      })

      setLoading(false)
      return
    }

    window.location.reload();
  }

  const handleChange = event => {
    setSelectMessageProps('')
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

  const styles = {
    moduleStyle: {
      marginTop: 15,
      display: 'block'
    },
    permissionStyle: {
      display: 'block',
      marginLeft: 10
    },
    formControlStyle: {
      marginTop: 30
    },
    formGroupStyle: {
      marginBottom: 15
    },
    titleFormStyle: {
      marginBottom: 15
    },
    checkbox: {
      fontSize: 5
    },
    error: {
      marginTop: 50,
      marginLeft: 4
    },
    actions: {
      marginTop: 10
    }
  }

  return (
    <div id="main-login">
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
            <Form
              onSubmit={onSubmit}
              validate={values => {
                const errors = {}
                if (!values.name) {
                  errors.name = "Este campo é obrigatório"
                }
                if (!values.description) {
                  errors.description = "Este campo é obrigatório"
                }
                return errors
              }}
              initialValues={{}}
              render={({ handleSubmit }) => (
                <form
                  onSubmit={handleSubmit}>
                  <div style={{ minWidth: 100 }}>
                    <Grid container spacing={3} style={{ minWidth: 100 }}>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          name="name"
                          label="Nome"
                          component={TextField}
                          type="text"
                          autoComplete="off"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Field
                          fullWidth
                          name="description"
                          label="Descrição"
                          component={TextField}
                          type="text"
                          autoComplete="off"
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl component="fieldset" style={styles.formControlStyle}>
                          <FormGroup onChange={handleChange}>
                            <Typography variant="h6" gutterBottom style={styles.titleFormStyle}>
                              Permissões
                            </Typography>
                            {props.permissions.map((p, i, a) => {
                              return (
                                <React.Fragment key={p.moduleName}>
                                  <div style={styles.moduleStyle}>
                                    <Typography variant="subtitle1" gutterBottom>
                                      {p.moduleName}
                                    </Typography>
                                    {p.permissions.map(x => {
                                      return (
                                        <React.Fragment key={x}>
                                          <div style={styles.permissionStyle}>
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
                            <Typography
                              {...selectMessageProps}
                            >
                              {selectMessageProps.children}
                            </Typography>
                          </FormGroup>
                        </FormControl>
                        <Grid style={styles.error}>
                          <Typography
                            {...errorMessageProps}
                          >
                            {errorMessageProps.titleMessage}
                            {errorMessageProps.children}
                          </Typography>
                        </Grid>
                        <DialogActions style={styles.actions}>
                          <Button onClick={handleClose} color="primary">
                            Sair
                        </Button>
                          {loading ? (<CircularProgress></CircularProgress>) : (
                            <Button variant="contained" color="primary" type="submit">
                              Adicionar
                            </Button>
                          )}
                        </DialogActions>
                      </Grid>
                    </Grid>
                  </div>
                </form>
              )} />
          </DialogContent>
        </Dialog>
      </React.Fragment>
    </div>
  );
}