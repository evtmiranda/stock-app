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
import { profileService } from '../../../services'

export default function Edit(props) {
    const [open, setOpen] = React.useState(false);
    const [permissionsSelected, setPermissionSelected] = React.useState(props.profile.permissions)

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

        const { name, description } = values;

        const profile = {
            id: props.profile.id,
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
        }
    }

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
                                                    name="name"
                                                    initialValue={props.profile.name}
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
                                                    initialValue={props.profile.description}
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
                                                                                                    checked={permissionsSelected.includes(p.moduleName + "|" + x)}
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