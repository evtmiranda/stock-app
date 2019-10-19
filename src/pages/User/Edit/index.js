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
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { profileService } from '../../../services';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles'

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

export default function Edit(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [selectOpen, setSelectOpen] = React.useState(false);
    const [profile, setProfile] = React.useState('');

    const [maxWidth] = React.useState('sm');
    const fullWidth = true;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
        await sleep(300)

        const { id, name, description } = values;

        const profile = {
            id,
            name,
            description,
            permissions: permissionsSelected
        }

        await profileService.update(profile);

        window.location.reload();
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
                })
            );
        }
    };
    
      const handleSelectOpen = () => {
        setSelectOpen(true);
      };
    
      const handleSelectClose = () => {
        setSelectOpen(false);
      };

    return (
        <div id="main-login">
            <React.Fragment>
                <Tooltip title={props.action.tooltip}>
                    <IconButton
                        aria-label={props.action.icon}
                        size="small"
                        onClick={handleClickOpen}
                    >
                        <Icon>{props.action.icon}</Icon>
                    </IconButton>
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
                                                    name="id"
                                                    label="Id"
                                                    initialValue={props.user.id}
                                                    disabled
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="name"
                                                    initialValue={props.user.name}
                                                    label="Nome"
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
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
                                            <Grid item xs={12}>
                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        Sair
                                                    </Button>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Salvar
                                                    </Button>
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