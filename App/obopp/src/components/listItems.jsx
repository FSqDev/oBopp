import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LinkedCameraIcon from '@material-ui/icons/LinkedCamera';
import { Link } from 'react-router-dom'

export const mainListItems = (
  <div>
    <Link to="/">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link to="/cameracapture">
      <ListItem button>
        <ListItemIcon>
          <LinkedCameraIcon />
        </ListItemIcon>
        <ListItemText primary="Camera" />
      </ListItem>
    </Link>
  </div>
);
