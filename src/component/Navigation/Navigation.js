import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const Navigation = ({onRouteChange, isSignedIn, toggleModel}) => {
    if (isSignedIn) {
        return (
			<nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
				<ProfileIcon onRouteChange={onRouteChange} toggleModel={toggleModel}/>
			</nav>
		);
    } else {
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p onClick={() => onRouteChange('signin')} className="f4 link dim black underline pa2 ma2 pointer">Sign In</p>
                <p onClick={() => onRouteChange('register')} className="f4 link dim black underline pa2 ma2 pointer">Register</p>
            </nav>
        );
    }
 
}

export default Navigation;