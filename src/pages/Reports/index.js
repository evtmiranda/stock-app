import React, { Component } from 'react'
import { Menu } from '../../components'
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Table from "../../components/Table";
import { isNullOrUndefined } from 'util';
import { formatDate } from '../../utils'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import './styles.css'
import { statusService, reportService } from '../../services'

export class Reports extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fromDate: new Date(),
            toDate: new Date(),
            open: false,
            selectOpen: false,
            stockStatus: 0,
            stockStatuses: [],
            stocks: [],
            searched: false,
            store: ''
        }
    }

    handleFromDateChange = date => {
        this.setState({ fromDate: date });
    };

    handleToDateChange = date => {
        this.setState({ toDate: date });
    };

    handleClickOpen = () => {
        this.setState({ open: true })
    };

    handleClose = () => {
        this.setState({ open: false })
    };

    handleSelectOpen = () => {
        this.setState({ selectOpen: true })
    };

    handleSelectClose = () => {
        this.setState({ selectOpen: false })
    };

    handleChange = event => {
        this.setState({ stockStatus: event.target.value })
    };

    handleStoreFieldChange = event => {
        this.setState({ store: event.target.value })
    }

    getReport = async () => {
        this.setState({ searched: false })

        const status = this.state.stockStatuses.filter(p => p.id === this.state.stockStatus);

        let filters = `from=${this.state.fromDate}&to=${this.state.toDate}`

        const hasStore = this.state.store !== ''
        const hasStatus = status && status[0] && status[0].description !== "todos"

        if(hasStore){
            filters = filters.concat(`&store=${this.state.store}`)
        }

        if(hasStatus){
            filters = filters.concat(`&status=${status[0].description}`)
        }

        const stocks = await reportService.get(filters);

        const itemsStock = stocks.data.map(i => ({
            ...i,
            "entry.date": formatDate(i.entry.date),
            "output.date": isNullOrUndefined(i.output.date) ? "" : formatDate(i.output.date),
            createdAt: formatDate(i.createdAt),
        }));

        this.setState({ stocks: itemsStock, searched: true })
    }

    loadStatus = async () => {
        const filters = 'deleted_at=null';

        let stockStatuses = await statusService.get(filters);

        stockStatuses = stockStatuses.map(s => {
            return { id: s.id, description: s.description }
        })

        const genericStatus = [{ id: 0, description: 'todos' }]

        this.setState({ stockStatuses: genericStatus.concat(stockStatuses) })
    }

    getStockStatusId = () => {
        return this.state.stockStatus
    }

    async componentDidMount() {
        await this.loadStatus()
    }

    render() {
        const body = (
            <div>
                <div id="content">
                    <Typography variant="h6" id="title">
                        Gerar Relatório
                    </Typography>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12} sm={2}>
                                <KeyboardDatePicker
                                    disableToolbar
                                    variant="inline"
                                    format="dd/MM/yyyy"
                                    margin="normal"
                                    id="date-picker-inline"
                                    label="Data início"
                                    value={this.state.fromDate}
                                    onChange={this.handleFromDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'trocar data',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <KeyboardDatePicker
                                    margin="normal"
                                    id="date-picker-dialog"
                                    label="Data fim"
                                    format="dd/MM/yyyy"
                                    value={this.state.toDate}
                                    onChange={this.handleToDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'trocar data',
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <FormControl id="formControl">
                                    <InputLabel htmlFor="controlled-open-select">Status</InputLabel>
                                    <Select
                                        selectOpen={this.state.selectOpen}
                                        onClose={this.handleSelectClose}
                                        onOpen={this.handleSelectOpen}
                                        value={this.getStockStatusId()}
                                        onChange={this.handleChange}
                                        inputProps={{
                                            name: 'profile',
                                            id: 'controlled-open-select',
                                        }}
                                    >
                                        {this.state.stockStatuses.map(p => (
                                            <MenuItem key={p.id} value={p.id}>{p.description}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <TextField
                                    id="filled-name"
                                    label="Loja"
                                    onChange={this.handleStoreFieldChange}
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>
                        <div id="buttonExport">
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={this.getReport}>
                                    Gerar relatório
                                </Button>
                            </Grid>
                        </div>

                        {this.state.stocks.length === 0 && this.state.searched && (
                            <div id="zeroItemFoundMessage">
                                <p>Nenhum item encontrado</p>
                            </div>
                        )}
                    </MuiPickersUtilsProvider>
                </div>

                {this.state.stocks.length > 0 && (
                    <Table
                        title="Relatório"
                        columns={[
                            { title: "Lote", field: "lot" },
                            { title: "Descricao", field: "description" },
                            { title: "Referencia", field: "reference" },
                            { title: "Quantidade", field: "quantity" },
                            { title: "Data de entrada", field: "entry.date" },
                            { title: "Etiqueta", field: "tag" },
                            { title: "Status", field: "stockStatus.status.description" },
                            { title: "Loja", field: "store" },
                            { title: "Unitario", field: "unitValue" },
                            { title: "Quantidade de Saida", field: "output.quantity" },
                            { title: "Data de Saida", field: "output.date" },
                            { title: "Criado Em", field: "createdAt" }
                        ]}
                        data={this.state.stocks}
                        options={{
                            actionsColumnIndex: -1,
                            exportButton: true,
                            paging: false
                        }}
                    />
                )}
            </div>
        )

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}