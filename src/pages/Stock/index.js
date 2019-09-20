import React, { Component } from 'react'
import { Menu } from '../../components'
import './styles.css'

export class Stock extends Component {
    render() {
        const body = (
            <h1>Estoque</h1>
        )
        
        return (
            <React.Fragment>
                <Menu body={body} />
            </React.Fragment>
        )
    }
}

// import React, { Component } from 'react'
// import { Menu } from '../../components'
// import './styles.css'

// export class Stock extends Component {
//     render() {
//         const body = (
//             <h1>Estoque</h1>
//         )

//         return (
//             <React.Fragment>
//                 <Menu body={body} />
//             </React.Fragment>
//         )
//     }
// }

// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';

// const useStyles = makeStyles(theme => ({
//   root: {
//     width: '100%',
//     marginTop: theme.spacing(3),
//     overflowX: 'auto',
//   },
//   table: {
//     minWidth: 650,
//   },
// }));

// function createData(name, calories, fat, carbs, protein) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function SimpleTable() {
//   const classes = useStyles();

//   return (
//     <Paper className={classes.root}>
//       <Table className={classes.table}>
//         <TableHead>
//           <TableRow>
//             <TableCell>Cliente </TableCell>
//             <TableCell align="right">Lote</TableCell>
//             <TableCell align="right">Quantidade</TableCell>
//             <TableCell align="right">Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map(row => (
//             <TableRow key={row.name}>
//               <TableCell component="th" scope="row">
//                 {row.name}
//               </TableCell>
//               <TableCell align="right">{row.calories}</TableCell>
//               <TableCell align="right">{row.fat}</TableCell>
//               <TableCell align="right">{row.carbs}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </Paper>
//   );
// }