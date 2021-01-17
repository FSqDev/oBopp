import { Button } from '@material-ui/core';
import React, { useEffect } from 'react';
import Webcam from "react-webcam";
import Cookies from 'js-cookie';

export default function Camera() {

  const videoConstraints = {
    width: 1920,
    height: 1080,
    facingMode: "user"
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
      <>
        <Webcam
          audio={false}
          height={1080}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={1920}
          videoConstraints={videoConstraints}
        />
      </>
    );
  };

  return (WebcamCapture());
}