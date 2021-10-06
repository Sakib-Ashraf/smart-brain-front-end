import React from 'react';
import './Profile.css';

class Profile = ({ isProfileOpen, toggleModel, user }) => {
    render() {
        return (
            <div className='profile-model'>
                <article className='br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white'>
                    <main className='pa4 black-80 w-80'>
                        <img
                            src='http://tachyons.io/img/logo.jpg'
                            className='h3 w3 dib'
                            alt='avatar'
                        />
                        <h1>{user.name}</h1>
                        <h4>{`Image Submitted : ${user.entries} `}</h4>
                        <p>{`Member Since : ${new Date(user.joined).toLocaleDateString()}`}</p>
                        <hr />
                        <label className='mt2 fw6' htmlFor='user-name'>
                            Username :
                        </label>
                        <input
                            className='pa2 ba w-100'
                            placeholder={user.name}
                            type='text'
                            name='username'
                            id='username'
                        />
                        <label className='mt2 fw6' htmlFor='user-age'>
                            Age :
                        </label>
                        <input
                            className='pa2 ba w-100'
                            placeholder={user.age}
                            type='text'
                            name='userAge'
                            id='userAge'
                        />
                        <label className='mt2 fw6' htmlFor='user-pet'>
                            Pet :
                        </label>
                        <input
                            className='pa2 ba w-100'
                            placeholder={user.pet}
                            type='text'
                            name='userPet'
                            i