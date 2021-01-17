import React from 'react';
import lion_cat from '../image/lion_cat.jpg'
import Title from './Title';

export default function CameraCapture3() {
    return (
        <React.Fragment>
            <Title>Camera 3</Title>
            <img src={lion_cat} alt="placeholder_image" height="205.2" width="364.4"/>
        </React.Fragment>
    );
}