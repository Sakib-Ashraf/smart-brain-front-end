import React from 'react';
import Tilt from 'react-parallax-tilt';
import Brain from './Logo.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className='Tilt br3 bw3 shadow-3'
                tiltMaxAngleX={45}
                tiltMaxAngleY={45}
                style = {{height: 130,width: 130,}}>
                <div className="Tilt-inner pa3">
                    <img src={Brain} alt='logo' />
                </div>
            </Tilt>
        </div>
    );
}

export default Logo;