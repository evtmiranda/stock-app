/* eslint-disable no-undef */
import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from "../../components/Table";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Icon from '@material-ui/core/Icon';
import { Menu } from '../../components'
import { stockService } from '../../services'
import { formatDate, makeActions } from '../../utils'
import Create from './Create'
import Edit from './Edit'
import './styles.css'
import { isNullOrUndefined } from 'util';

export class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsStock: [],
            loaded: false,
            stockStatus: []
        }
    }

    async loadStock() {
        const filters = 'deleted_at=null';

        let itemsStock = await stockService.get(filters);

        itemsStock = itemsStock.map(i => ({
            ...i,
            "entry.date": formatDate(i.entry.date),
            "output.date": isNullOrUndefined(i.output.date) ? "" : formatDate(i.output.date),
            createdAt: formatDate(i.createdAt),
        }));

        this.setState({ itemsStock });
    }

    async delete(rowData) {
        const { id } = rowData;

        await stockService.remove(id);

        window.location.reload();
    }

    async componentDidMount() {
        await this.loadStock();

        const stockStatus = [
            { "id": 2, "name": "aviamento" },
            { "id": 3, "name": "preparação" },
            { "id": 4, "name": "mesa" }
        ]

        this.setState({ loaded: true, stockStatus })
    }

    getStock(stockId) {
        const stock = this.state.itemsStock.filter(p => p.id === stockId);

        return stock.length > 0 ? stock[0] : stock;
    }

    render() {
        let body = (
            <div style={{ textAlign: "center" }}>
                <CircularProgress />
            </div>
        )

        if (this.state.loaded) {
            body = (
                <Table
                    title="Estoque"
                    columns={[
                        { title: "Lote", field: "lot" },
                        { title: "Descrição", field: "description" },
                        { title: "Referência", field: "reference" },
                        { title: "Quantidade", field: "quantity" },
                        { title: "Data de entrada", field: "entry.date" },
                        { title: "Etiqueta", field: "tag" },
                        { title: "Status", field: "stockStatus.status.description" },
                        { title: "Loja", field: "store" },
                        { title: "Unitário", field: "unitValue" },
                        { title: "Quantidade de Saída", field: "output.quantity" },
                        { title: "Data de Saída", field: "output.date" },
                        { title: "Criado Em", field: "createdAt" }
                    ]}
                    data={this.state.itemsStock}
                    actions={makeActions('stock', {
                        create: {
                            icon: 'add',
                            tooltip: "Adicionar item",
                            isFreeAction: true
                        },
                        edit: {
                            icon: 'edit',
                            tooltip: 'Editar item'
                        },
                        delete: {
                            icon: 'delete',
                            tooltip: "Excluir item",
                            onClick: (_event, rowData) => this.delete(rowData)
                        }
                    })}
                    components={{
                        Action: props => {
                            if (props.action.icon === 'add') {
                                return (
                                    <Create
                                        action={props.action}
                                        stockStatus={this.state.stockStatus}
                                    />
                                )
                            }
                            else if (props.action.icon === 'edit' && !isNullOrUndefined(props.data.id)) {
                                const stock = this.getStock(props.data.id)

                                return (
                                    <Edit
                                        action={props.action}
                                        stock={stock}
                                        stockStatus={this.state.stockStatus}
                                    />
                                )
                            }
                            else {
                                return (
                                    <Tooltip title={props.action.tooltip}>
                                        <IconButton aria-label={props.action.icon} size="small"
                                            onClick={(event) => props.action.onClick(event, props.data)}
                                        >
                                            <Icon>{props.action.icon}</Icon>
                                        </IconButton>
                                    </Tooltip>
                                )
                            }
                        }
                    }}
                    options={{
                        actionsColumnIndex: -1
                    }}
                />
            )
        }

        return (
            <React.Fragment>
                <Menu
                    body={body}
                />
            </React.Fragment>
        )
    }
}