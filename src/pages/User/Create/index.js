/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { TextField } from 'final-form-material-ui';
import { Form, Field } from 'react-final-form'
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { userService } from '../../../services';

const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    marginLeft: 16,
    marginTop: 10,
    width: 550,
  },
  error: {
    marginTop: 50,
    marginLeft: 4
  },
  actions: {
    marginTop: 10
  }
}));

export default function Create(props) {
  const classes = useStyles();
  const [profile, setProfile] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectOpen, setSelectOpen] = React.useState(false);
  const [maxWidth] = React.useState('sm');
  const [errorMessageProps, setErrorMessageProps] = React.useState('');
  const [selectMessageProps, setSelectMessageProps] = React.useState('');
  const [loading, setLoading] = React.useState(false)
  const fullWidth = true;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    clearErrorMessage();
  };

  const handleChange = event => {
    setProfile(event.target.value);
    setSelectMessageProps('')
  };

  const handleSelectOpen = () => {
    setSelectOpen(true);
    clearErrorMessage();
  };

  const handleSelectClose = () => {
    setSelectOpen(false);
  };

  const clearErrorMessage = () => setErrorMessageProps('')

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

  const onSubmit = async values => {
    await sleep(300)
    setLoading(true)
    clearErrorMessage()

    if (profile === "") {
      setSelectMessageProps({
        children: "Este campo é obrigatório",
        paragraph: true,
        color: "error"
      })

      setLoading(false)
      return
    }

    const { name, username, password } = values;

    const user = {
      name,
      username,
      password,
      profileId: profile
    }

    const result = await userService.create(user);

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
          <Form
            onSubmit={onSubmit}
            validate={values => {
              const errors = {}
              if (!values.name) {
                errors.name = "Este campo é obrigatório"
              }
              if (!values.username) {
                errors.username = "Este campo é obrigatório"
              }
              if (!values.password) {
                errors.password = "Este campo é obrigatório"
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
                        name="username"
                        label="Nome de usuário"
                        component={TextField}
                        type="text"
                        autoComplete="off"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        fullWidth
                        name="password"
                        label="Senha"
                        component={TextField}
                        type="password"
                        autoComplete="off"
                        variant="outlined"
                      />
                    </Grid>
                    <Button className={classes.button} onClick={handleSelectOpen}
                      style={{ display: "none" }}>
                      Perfil de Usuário
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
                        {props.profiles.map(p => (
                          <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                        ))}
                      </Select>
                      <Typography
                        {...selectMessageProps}
                      >
                        {selectMessageProps.children}
                      </Typography>
                    </FormControl>
                  </Grid>
                  <Grid className={classes.error}>
                    <Typography
                      {...errorMessageProps}
                    >
                      {errorMessageProps.titleMessage}
                      {errorMessageProps.children}
                    </Typography>
                  </Grid>
                </div>
                <DialogActions className={classes.actions}>
                  <Button onClick={handleClose} color="primary">
                    Sair
                  </Button>
                  {loading ? (<CircularProgress></CircularProgress>) : (
                    <Button variant="contained" color="primary" type="submit">
                      Adicionar
                  </Button>
                  )}

                </DialogActions>
              </form>
            )} />
        </DialogContent>

      </Dialog>
    </React.Fragment >
  );
}