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
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import { isNumber } from 'util';
import DialogTitle from '@material-ui/core/DialogTitle';
import { stockService } from '../../../services'

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
}));

export default function Edit(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [selectOpen, setSelectOpen] = React.useState(false);
    const [stockStatus, setStockStatus] = React.useState('');

    const [maxWidth] = React.useState('sm');
    const fullWidth = true;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelectOpen = () => {
        setSelectOpen(true);
    };

    const handleSelectClose = () => {
        setSelectOpen(false);
    };

    const handleChange = event => {
        setStockStatus(event.target.value);
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    const onSubmit = async values => {
        await sleep(300)

        const { lot, description, reference, quantity, tag, store, unitValue } = values;

        const itemStock = {
            lot,
            description,
            reference,
            quantity,
            tag,
            store,
            unitValue,
            entry: {
                date: new Date()
            },
            stockStatus: {
                status:{
                    id: stockStatus
                }
            }
        }

        await stockService.update(itemStock);

        window.location.reload();
    }


    const getStockStatusId = () => {
        return isNumber(stockStatus) ? stockStatus : props.stock.stockStatus.status.id;
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
                                if (!values.lot) {
                                    errors.lot = "Este campo é obrigatório"
                                }
                                if (!values.description) {
                                    errors.description = "Este campo é obrigatório"
                                }
                                if (!values.reference) {
                                    errors.reference = "Este campo é obrigatório"
                                }
                                if (!values.quantity) {
                                    errors.quantity = "Este campo é obrigatório"
                                }
                                if (!values.tag) {
                                    errors.tag = "Este campo é obrigatório"
                                }
                                if (!values.store) {
                                    errors.store = "Este campo é obrigatório"
                                }
                                if (!values.unitValue) {
                                    errors.unitValue = "Este campo é obrigatório"
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
                                                    name="lot"
                                                    label="Lote"
                                                    defaultValue={props.stock.lot}
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
                                                    defaultValue={props.stock.description}
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="reference"
                                                    label="Referência"
                                                    defaultValue={props.stock.reference}
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="quantity"
                                                    label="Quantidade"
                                                    defaultValue={props.stock.quantity}
                                                    component={TextField}
                                                    type="number"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="tag"
                                                    label="Etiqueta"
                                                    defaultValue={props.stock.tag}
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="store"
                                                    label="Loja"
                                                    defaultValue={props.stock.store}
                                                    component={TextField}
                                                    type="text"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Field
                                                    fullWidth
                                                    name="unitValue"
                                                    label="Unitário"
                                                    defaultValue={props.stock.unitValue}
                                                    component={TextField}
                                                    type="number"
                                                    autoComplete="off"
                                                    variant="outlined"
                                                />
                                            </Grid>
                                            <Button className={classes.button} onClick={handleSelectOpen}
                                                style={{ display: "none" }}>
                                                Status
                                            </Button>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel htmlFor="controlled-open-select">Status</InputLabel>
                                                <Select
                                                    selectOpen={selectOpen}
                                                    onClose={handleSelectClose}
                                                    onOpen={handleSelectOpen}
                                                    value={getStockStatusId()}
                                                    onChange={handleChange}
                                                    inputProps={{
                                                        name: 'profile',
                                                        id: 'controlled-open-select',
                                                    }}
                                                >
                                                    {props.stockStatus.map(p => (
                                                        <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Grid item xs={12}>
                                                <DialogActions>
                                                    <Button onClick={handleClose} color="primary">
                                                        Sair
                                                    </Button>
                                                    <Button variant="contained" color="primary" type="submit">
                                                        Adicionar
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