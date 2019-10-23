import React, { Component } from 'react';
import MaterialTable from "material-table";
import PropTypes from 'prop-types'

export default class Table extends Component {
    static propTypes = {
        title: PropTypes.string,
        columns: PropTypes.array,
        data: PropTypes.object,
        actions: PropTypes.array,
        options: PropTypes.object
    }

    render() {
        const { title, columns, data, actions, options } = this.props;
        return (
            <MaterialTable
                title={title}
                columns={columns}
                data={data}
                actions={actions}
                options={options}
                localization={{
                    pagination: {
                        labelDisplayedRows: '{from}-{to} de {count}',
                        labelRowsSelect: 'linhas',
                        firstAriaLabel: 'Primeira página',
                        firstTooltip: 'Primeira página',
                        previousAriaLabel: 'Página anterior',
                        previousTooltip: 'Página anterior',
                        nextAriaLabel: 'Próxima página',
                        nextTooltip: 'Próxima página',
                        lastAriaLabel: 'Última página',
                        lastTooltip: 'Última página',
                    },
                    toolbar: {
                        nRowsSelected: '{0} linha(s) selecionadas',
                        searchPlaceholder: 'Pesquisar',
                        searchTooltip: 'Pesquisar'
                    },
                    header: {
                        actions: 'Ações'
                    },
                    body: {
                        emptyDataSourceMessage: 'Sem informações',
                        filterRow: {
                            filterTooltip: 'Filter'
                        }
                    }
                }}
            />
        )
    }
}