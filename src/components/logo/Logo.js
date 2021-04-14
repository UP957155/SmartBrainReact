import Tilt from 'react-tilt';
import React from 'react';
import brain from './icons8-artificial-intelligence-64.png';

const Logo = () => {
    return (
        <Tilt className="Tilt br2 shadow-2" options={{ max : 25 }} style={{ height: 50, width: 50 }} >
        <img src={brain} alt="Logo" style={{width: 50, height: 50}} />
       </Tilt>
    );
    
    }

    export default Logo;