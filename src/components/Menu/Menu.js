import React from 'react';
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import TimelineIcon from '@material-ui/icons/Timeline';
import CloseIcon from '@material-ui/icons/Close';
import StoreIcon from '@material-ui/icons/Store';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export default function ClippedDrawer() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            ITIBAN
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {
            ['Tela Inicial', 'Estoque', 'Usuários', 'Relatórios', 'Sair'].map((text, index) => {
              const routes = {
                "Tela Inicial": "home",
                "Estoque": "stock",
                "Usuários": "users",
                "Relatórios": "reports",
                "Sair": "logoff"
              };
              
              return (
                <Link to={routes[text]} className={classes.link}>
                  <ListItem
                    button
                    key={text}
                  >
                    {text === "Tela Inicial" && (
                      <ListItemIcon><HomeIcon /></ListItemIcon>
                    )}
                    {text === "Estoque" && (
                      <ListItemIcon><StoreIcon /></ListItemIcon>
                    )}
                    {text === "Usuários" && (
                      <ListItemIcon><SupervisorAccountIcon /></ListItemIcon>
                    )}
                    {text === "Relatórios" && (
                      <ListItemIcon><TimelineIcon /></ListItemIcon>
                    )}
                    {text === "Sair" && (
                      <ListItemIcon><CloseIcon /></ListItemIcon>
                    )}
                    <ListItemText primary={text} />
                  </ListItem>
                </Link>
              );
            })}
        </List>
      </Drawer>
      <main className={classes.content}>
      </main>
    </div>
  );
}