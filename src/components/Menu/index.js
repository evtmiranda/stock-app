import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
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
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import TimelineIcon from '@material-ui/icons/Timeline';
import CloseIcon from '@material-ui/icons/Close';
import StoreIcon from '@material-ui/icons/Store';
import { Divider } from '@material-ui/core';

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    overflowX: 'auto'
  },
  link: {
    textDecoration: 'none',
    color: 'inherit'
  }
}));

export const Menu = (props) => {
  const classes = useStyles();
  const { container } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {
          ['Tela Inicial', 'Estoque', 'Usuários', 'Perfis de Usuário', 'Relatórios', 'Sair'].map((text) => {
            const routes = {
              "Tela Inicial": "home",
              "Estoque": "stock",
              "Usuários": "users",
              "Perfis de Usuário": "userProfiles",
              "Relatórios": "reports",
              "Sair": "logoff"
            };

            return (
              <React.Fragment key={routes[text]}>
                <Link to={routes[text]} className={classes.link}>
                  <ListItem
                    button
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
                    {text === "Perfis de Usuário" && (
                      <ListItemIcon><PermIdentityIcon /></ListItemIcon>
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
              </React.Fragment>
            );
          })}
      </List>

    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            ITIBAN
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.body}
      </main>
    </div>
  );
}