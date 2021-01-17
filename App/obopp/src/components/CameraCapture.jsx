import React from 'react';
import lion_cat from '../image/lion_cat.jpg'
import Title from './Title';

export default function CameraCapture() {
    return (
        <React.Fragment>
            <img src={lion_cat} alt="placeholder_image" height="300" width="480"/>
        </React.Fragment>
    );
}