import React from 'react';
import './Navigation.css';

const Navigation = ({onRouteChange, isSignedin}) => {
	if(isSignedin){
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 dim pointer underline yellow link pa3'  >Sign Out</p>
			</nav>
		);		
	}
	else{
		return (
			<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
				<p onClick={() => onRouteChange('signin')} className='f3 dim pointer underline yellow link pa3'  >Sign In</p>
				<p onClick={() => onRouteChange('register')} className='f3 dim pointer underline yellow link pa3'  >Register</p>
			</nav>
		);			
	}

}
export default Navigation;