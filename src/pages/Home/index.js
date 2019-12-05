import React, { Component } from 'react'
import { Menu } from '../../components'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Pie, Bar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import { stockService } from '../../services'
import './styles.css'

export class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loaded: false,
            dataQuantityByStatus: [],
            dataQuantityStock: 0,
            dataQuantityByClient: [],
            dataQuantityEntryAndOut: []
        }
    }

    async getQuantityByStatus() {
        const quantityByStatus = await stockService.getQuantityByStatus()

        const labels = quantityByStatus.map(p => p.description);
        const values = quantityByStatus.map(p => p.quantity);

        const data = {
            labels: labels,
            datasets: [{
                data: values,
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56'
                ]
            }]
        };

        this.setState({ dataQuantityByStatus: data })
    }

    async getQuantityStock() {
        const status = 'estoque'

        let quantityStock = await stockService.getQuantity(status)

        quantityStock = quantityStock ? quantityStock.quantity : 0

        this.setState({ dataQuantityStock: quantityStock })
    }

    async getQuantityByClient() {
        const quantityByClient = await stockService.getQuantityByClient()

        const labels = quantityByClient.map(p => p.store);
        const values = quantityByClient.map(p => p.quantity);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Quantidade de lotes',
                    backgroundColor: '#FF6384',
                    borderWidth: 1,
                    data: values
                }
            ]
        };

        this.setState({ dataQuantityByClient: data })
    }

    async getQuantityEntryAndOut() {
        const quantityEntryAndOut = await stockService.getEntryAndOutQuantityByDay()

        const labels = quantityEntryAndOut.map(p => p.day);
        const entryQuantitys = quantityEntryAndOut.map(p => p.entryQuantity);
        const outputQuantitys = quantityEntryAndOut.map(p => p.outputQuantity);

        const data = {
            labels: labels,
            datasets: [{
                label: 'Entrada',
                backgroundColor: "#36A2EB",
                yAxisID: 'y-axis-1',
                data: entryQuantitys,
                borderWidth: 1,
            }, {
                label: 'Saída',
                backgroundColor: "#FFCE56",
                yAxisID: 'y-axis-2',
                data: outputQuantitys,
                borderWidth: 1,
            }]
        }

        this.setState({ dataQuantityEntryAndOut: data })
    }

    async componentWillMount() {
        await this.getQuantityByStatus()
        await this.getQuantityStock()
        await this.getQuantityByClient()
        await this.getQuantityEntryAndOut()

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
                <div>
                    <div id="content">
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <h2 className="chartTitle">Quantidade de lotes no status estoque</h2>
                                <p className="chartNumber">{this.state.dataQuantityStock}</p>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h2 className="chartTitle">Quantidade de lotes por status</h2>
                                <Pie
                                    data={this.state.dataQuantityByStatus}
                                    options={{
                                        legend: {
                                            position: "bottom"
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h2 className="chartTitle">Quantidade de lotes por cliente</h2>
                                <Bar
                                    data={this.state.dataQuantityByClient}
                                    width={100}
                                    height={50}
                                    options={{
                                        scales: {
                                            yAxes: [{
                                                display: false,
                                                ticks: {
                                                    beginAtZero: true,
                                                    stepSize: 1
                                                }
                                            }]
                                        }
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <h2 className="chartTitle">Quantidade de entrada e saída por dia no mês atual</h2>
                                <Bar
                                    data={this.state.dataQuantityEntryAndOut}
                                    width={100}
                                    height={50}
                                    options={{
                                        title: {
                                            display: false,
                                        },
                                        tooltips: {
                                            mode: 'index',
                                            intersect: true
                                        },
                                        scales: {
                                            yAxes: [{
                                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                                display: false,
                                                position: 'left',
                                                id: 'y-axis-1',
                                                ticks: {
                                                    beginAtZero: true,
                                                }
                                            }, {
                                                type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                                display: false,
                                                position: 'right',
                                                id: 'y-axis-2',
                                                ticks: {
                                                    beginAtZero: true,
                                                }
                                            }],
                                        }
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            )
        }

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}