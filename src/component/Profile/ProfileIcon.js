import React, { Component } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
} from 'reactstrap';

class ProfileIcon extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.signOut = this.signOut.bind(this);
        this.state = {
            dropdownOpen: false,
        };
    }

    toggle() {
        this.setState(prevState => ({ dropdownOpen: !prevState.dropdownOpen }));
	}
	
	signOut() {
		fetch(`https://immense-tor-84997.herokuapp.com/signout`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
				authorization: window.sessionStorage.getItem('token'),
			},
		})
			.then((response) => response.json())
			.then((resp) => {
				if (resp.data) {
					window.sessionStorage.removeItem('token');
					this.props.onRouteChange('signout');
				}
			})
			.catch(console.log);

	}

    render() {
        return (
			<div className='pa4 tc'>
				<Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle
						tag='span'
						data-toggle='dropdown'
						aria-expanded={this.state.dropdownOpen}
					>
						<img
							src='http://tachyons.io/img/logo.jpg'
							className='br-100 ba h3 w3 dib'
							alt='avatar'
						/>
					</DropdownToggle>
                    <DropdownMenu
                        right
						className='b--transparent shadow-5'
						style={{
							marginTop: '20px',
							backgroundColor: 'rgba(255, 255, 255, 0.5)',
						}}
					>
						<DropdownItem onClick={() => this.props.toggleModel()}>View Profile</DropdownItem>
						<DropdownItem onClick={() => this.signOut()}>
							Sign Out
						</DropdownItem>
					</DropdownMenu>
				</Dropdown>
			</div>
		);
    }
}
export default ProfileIcon;