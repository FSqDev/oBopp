import React from 'react';
import lion_cat from '../image/lion_cat.jpg'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(0,3),
        '& > *': {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function CameraCapture() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                />  
            </div>
            <img src={lion_cat} alt="placeholder_image" height="300" width="480"/>
        </React.Fragment>
    );
}