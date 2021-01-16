import { Button } from '@material-ui/core';
import React from 'react';
import Webcam from "react-webcam";

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
        const imageSrc = webcamRef.current.getScreenshot();
      },
      [webcamRef]
    );
   
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
        <Button onClick={capture}>Capture photo</Button>
      </>
    );
  };

  return (WebcamCapture());

}