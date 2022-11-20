import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import Popup from './popup'

import './loginform.scss';

const LoginForm = (props) => {
	const [inputEmail, setInputEmail] = useState('');
	const [inputPassword, setInputPassword] = useState('');

	const checkLogin = (e) => {
		e.preventDefault();

		if (inputEmail !== '' && inputPassword !== '') {
			fetch('/checkLogin', {
				method: 'POST',
				body: JSON.stringify({
					inputEmail,
					inputPassword,
				})
			}).then(res => res.json()).then(data => data ? props.login(data) : incorrectLogin())
		}

		const incorrectLogin = () => {
			setInputEmail('')
			setInputPassword('') 
			document.querySelector('.test').classList.add('active')
			setTimeout(() => {document.querySelector('.test').classList.remove('active')}, 5000)
		}

		
	};

	return (
		<div className='login'>
			<div className='login_loginbox'>
				<form onSubmit={checkLogin}>
					<h2>Zaloguj się!</h2>
					<div className='input'>
					<span>E-mail</span>
						<input
							onChange={(e) => setInputEmail(e.target.value)}
							value={inputEmail}></input>
						<span>Hasło</span>
						<input
							type='password'
							value={inputPassword}
							onChange={(e) => setInputPassword(e.target.value)}></input>
					</div>
					<p className='login_loginbox_error'>Zły login lub hasło!</p>
					<input type='submit' value='Zaloguj' />
					<div style={{ textAlign: 'center' }}>
						<p>Nie masz jeszcze konta?</p>
						<p>
							<Link to='/register'>Zarejestruj się</Link>
						</p>
					</div>
				</form>
				<Popup text='Zły login lub hasło!'/>
			</div>
		</div>
	);
};

export default LoginForm;
