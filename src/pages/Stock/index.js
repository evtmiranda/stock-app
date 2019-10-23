import React, { Component } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from "../../components/Table";
import { Menu } from '../../components'
import { stockService } from '../../services'
import formatDate from '../../utils/formatDate'
import './styles.css'

export class Stock extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemsStock: [],
            loaded: false
        }
    }

    async loadStock() {
        const filters = 'deleted_at=null';

        let itemsStock = await stockService.get(filters);

        itemsStock = itemsStock.map(i => ({
            ...i,
            "entry.date": formatDate(i.entry.date),
            "output.date": formatDate(i.output.date),
            createdAt: formatDate(i.createdAt),
        }));

        this.setState({ itemsStock: itemsStock });
    }

    async componentDidMount() {
        await this.loadStock();

        this.setState({ loaded: true })
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
                        { title: "Loja", field: "store" },
                        { title: "Unitário", field: "unitValue" },
                        { title: "Quantidade de Saída", field: "output.quantity" },
                        { title: "Data de Saída", field: "output.date" },
                        { title: "Criado Em", field: "createdAt" }
                    ]}
                    data={this.state.itemsStock}
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