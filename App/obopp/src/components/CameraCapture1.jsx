import React from 'react';
import lion_cat from '../image/lion_cat.jpg'
import Title from './Title';

export default function CameraCapture1() {
    return (
        <React.Fragment>
            <Title>Camera 1</Title>
            <img src={lion_cat} alt="placeholder_image" height="300" width="480"/>
        </React.Fragment>
    );
}