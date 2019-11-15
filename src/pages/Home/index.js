import React, { Component } from 'react'
import { Menu } from '../../components'
import { Pie, Bar } from 'react-chartjs-2';
import Grid from '@material-ui/core/Grid';
import './styles.css'

export class Home extends Component {
    render() {
        const data = {
            labels: [
                'Red',
                'Blue',
                'Yellow'
            ],
            datasets: [{
                data: [300, 50, 100],
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

        const dataBar = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: [65, 59, 80, 81, 56, 55, 40]
                }
            ]
        };

        const dataBarMultiAxis = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'Dataset 1',
                backgroundColor: [
                    "#fff",
                    "#000",
                    "#fff",
                    "#000",
                    "#fff",
                    "#000",
                    "#fff",
                ],
                yAxisID: 'y-axis-1',
                data: [
                    10,
                    20,
                    10,
                    20,
                    10,
                    20,
                    10
                ]
            }, {
                label: 'Dataset 2',
                backgroundColor: "#098",
                yAxisID: 'y-axis-2',
                data: [
                    10,
                    20,
                    10,
                    20,
                    10,
                    20,
                    10
                ]
            }]
        };

        const body = (
            <div>
                <div id="content">
                    <Grid container justify="center" spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <h2 className="chartTitle">Quantidade de produto por status</h2>
                            <Pie
                                data={data}
                                options={{
                                    legend: {
                                        position: "bottom"
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h2 className="chartTitle">Outro</h2>
                            <Bar
                                data={dataBar}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h2 className="chartTitle">Outro</h2>
                            <Bar
                                data={dataBarMultiAxis}
                                options={{
                                    responsive: true,
                                    title: {
                                        display: true,
                                        text: 'Chart.js Bar Chart - Multi Axis'
                                    },
                                    tooltips: {
                                        mode: 'index',
                                        intersect: true
                                    },
                                    scales: {
                                        yAxes: [{
                                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                            display: true,
                                            position: 'left',
                                            id: 'y-axis-1',
                                        }, {
                                            type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
                                            display: true,
                                            position: 'right',
                                            id: 'y-axis-2',
                                            gridLines: {
                                                drawOnChartArea: false
                                            }
                                        }],
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <h2 className="chartTitle">Outro</h2>
                            <Pie
                                data={data}
                                options={{
                                    legend: {
                                        position: "bottom"
                                    }
                                }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </div>
        )

        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}