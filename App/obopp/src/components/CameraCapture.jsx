import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflow: 'hidden',
        padding: theme.spacing(3,3),
        '& > *': {
        margin: theme.spacing(3),
      },
    },
    input: {
      display: 'none',
    },
  }));

export default function CameraCapture({id}) {
    const classes = useStyles();

    const [img, setImg] = useState("")

    const io = require("socket.io-client");
    useEffect(() => {
      const socket = io("https://obopp.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] })
      socket.emit('requestFootage', id)
      socket.on('footage', (data) => {
          setImg(data)
      })
    }, [])

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
            <img src={img} alt="placeholder_image" height="350" width="580"/>
        </React.Fragment>
    );
}