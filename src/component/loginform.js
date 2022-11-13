import React, { useState, useEffect } from 'react';

import {Link} from 'react-router-dom';

import userData from './userData'

import './loginform.scss';

const LoginForm = (props) => {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	const checkLogin = (e) => {
		e.preventDefault();

		const index = userData.findIndex( x => x.email === inputEmail)

		if (index != -1 && userData[index].password === inputPassword) {
			console.log('ok');
			props.login(userData[index]);
		} else {
			setInputEmail('');
			setInputPassword('');
			document.querySelector('.login_loginbox_error').style.visibility = 'visible';
			setTimeout(() => {(document.querySelector('.login_loginbox_error').style.visibility = 'hidden')},3000)
		}


	};

	return (
		<div className='login'>
		<div className='login_loginbox'>
			<form onSubmit={checkLogin}>
				<h2>Zaloguj się!</h2>
				<input
				placeholder='E-mail'
					onChange={(e) => setInputEmail(e.target.value)}
					value={inputEmail}></input>
				<input
				placeholder='Hasło'
					type='password'
					value={inputPassword}
					onChange={(e) => setInputPassword(e.target.value)}></input>
				<p className='login_loginbox_error'>Zły login lub hasło!</p>
				<input type='submit' value='Zaloguj' />
				<div style={{textAlign:'center'}}>
                <p>Nie masz jeszcze konta?</p>
				<p><Link to='/register'>Zarejestruj się</Link></p>
                </div>
			</form>
		</div>
		</div>
	);
};

export default LoginForm;
