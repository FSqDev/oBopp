import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkedCameraIcon from '@material-ui/icons/LinkedCameraOutlined';
import { Link } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ListItems() {
  const classes = useStyles();

return (

  <List>
  <Link to="/">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </Link>
  <Divider />
  <Link to="/cameracapture" >
    <ListItem button>
      <ListItemIcon>
        <LinkedCameraIcon />
      </ListItemIcon>
      <ListItemText primary="Camera Capture" />
    </ListItem>
  </Link>
</List>
)}
