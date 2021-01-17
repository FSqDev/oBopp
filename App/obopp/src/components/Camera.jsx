import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import Cookies from 'js-cookie';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Title from './Title';


export default function Camera() {

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "environment"
  };
   
  const WebcamCapture = () => {
    const webcamRef = React.useRef(null);
   
    const capture = React.useCallback(
      () => {
        return webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );

    const io = require("socket.io-client");
    useEffect(() => {
      console.log('useffect called')
      const socket = io("https://obopp.herokuapp.com/", { transports: ['websocket', 'polling', 'flashsocket'] })
      socket.emit('connectUser', Cookies.get('user-id'))
      const interval = setInterval(() => {
        socket.emit('webcam', capture())
      }, 100);
      return () => clearInterval(interval);
    })
   
    return (
        <Container maxWidth="lg">
          <Grid container spacing={0}>
            <Grid item xs={12}  md={4} lg={6}>
              <Title>Camera Capture</Title>
              <Paper>
              <Webcam
                  audio={false}
                  height={1080/2}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={1920/2}
                  videoConstraints={videoConstraints}
                />
              </Paper>
            </Grid>
          </Grid>
        </Container>
    );
  };

  return (WebcamCapture());
}