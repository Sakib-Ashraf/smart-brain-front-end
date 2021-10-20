import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: this.props.user.name,
			age: this.props.user.age,
			pet: this.props.user.pet,
		};
	}

	onChange = (event) => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onSubmitProfileUpdate = () => {
        fetch(
			`https://immense-tor-84997.herokuapp.com/profile-update/${this.props.user.id}`,
			{
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					authorization: window.sessionStorage.getItem('token'),
				},
				body: JSON.stringify({
					name: this.state.name,
					age: this.state.age,
					pet: this.state.pet,
				}),
			}
		)
			.then((resp) => {
				if (resp.status === 200 || resp.status === 304) {
					this.props.toggleModel();
					this.props.loadUser({ ...this.props.user, ...this.state });
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { user } = this.props;
		return (
			<div className='profile-model'>
				<article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
					<main className='pa4 black-80 w-80'>
						<img
							src='http://tachyons.io/img/logo.jpg'
							className='h3 w3 dib'
							alt='avatar'
						/>
						<h1>{this.state.name}</h1>
						<h4>{`Image Submitted : ${user.entries} `}</h4>
						<p>{`Member Since : ${new Date(
							user.joined
						).toLocaleDateString()}`}</p>
						<hr />
						<label className='mt2 fw6' htmlFor='user-name'>
							Username :
						</label>
						<input
                        onChange={this.onChange}
							className='pa2 ba w-100'
							placeholder={this.state.name}
							type='text'
							name='name'
							id='username'
						/>
						<label className='mt2 fw6' htmlFor='user-age'>
							Age :
						</label>
						<input
                        onChange={this.onChange}
							className='pa2 ba w-100'
							placeholder={this.state.age}
							type='text'
							name='age'
							id='userAge'
						/>
						<label className='mt2 fw6' htmlFor='user-pet'>
							Pet :
						</label>
						<input
                        onChange={this.onChange}
							className='pa2 ba w-100'
							placeholder={this.state.pet}
							type='text'
							name='pet'
							id='userPet'
						/>
						<div
							className='mt4'
							style={{
								display: 'flex',
								justifyContent: 'space-evenly',
							}}
						>
                            <button
                                onClick={this.onSubmitProfileUpdate}
                                className='b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20'>
								Save
							</button>
							<button
								className='b pa2 grow pointer hover-white w-40 bg-light-red b--black-20'
								onClick={this.props.toggleModel}
							>
								Cancel
							</button>
						</div>
					</main>
					<div className='toggle-close' onClick={this.props.toggleModel}>
						&times;
					</div>
				</article>
			</div>
		);
	}
};

export default Profile;
