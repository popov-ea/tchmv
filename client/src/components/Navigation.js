import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { NotificationsActive, AccessTime, Home, PlusOne } from '@material-ui/icons';
import routes from '../services/routes';
import { Link, useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(5) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function Navigation(props) {
    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
            })}
            classes={{
                paper: clsx({
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                }),
            }}
        >
            <div className={classes.toolbar}>
                {
                    open
                        ? <IconButton onClick={handleDrawerClose}>
                            <ChevronLeftIcon></ChevronLeftIcon>
                        </IconButton>
                        : <IconButton onClick={handleDrawerOpen}>
                            <ChevronRightIcon></ChevronRightIcon>
                        </IconButton>
                }

            </div>
            <Divider />
            <List>
                <Link to={routes.home}>
                    <ListItem>
                        <IconButton key="home">
                            <Home></Home>
                        </IconButton>
                        <ListItemText style={{ marginLeft: 10 }}>{"Inbox"}</ListItemText>
                    </ListItem>
                </Link>

                <ListItem>
                    <IconButton key="inbox">
                        <MailIcon></MailIcon>
                    </IconButton>
                    <ListItemText style={{ marginLeft: 10 }}>{"Inbox"}</ListItemText>
                </ListItem>
                <ListItem>
                    <IconButton key="notification">
                        <NotificationsActive></NotificationsActive>
                    </IconButton>
                    <ListItemText style={{ marginLeft: 10 }}>{"Notifications"}</ListItemText>
                </ListItem>

                <ListItem>
                    <IconButton key="subs">
                        <AccessTime></AccessTime>
                    </IconButton>
                    <ListItemText style={{ marginLeft: 10 }}>{"Subscriptions"}</ListItemText>
                </ListItem>
                <ListItem>
                    <IconButton key="add" onClick={() => history.push(routes.initPost)}>
                        <PlusOne></PlusOne>
                    </IconButton>
                    <ListItemText style={{ marginLeft: 10 }}>{"Add post"}</ListItemText>
                </ListItem>
            </List>
        </Drawer>
    );
}
