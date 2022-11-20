import { useEffect, useState } from 'react';

import Message from './message.js'

import Popup from './popup'

import './register.scss';

function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		checkForm('username');
	}, [username]);
	useEffect(() => {
		checkForm('password');
		checkForm('repeatPassword');
	}, [password]);
	useEffect(() => {
		checkForm('repeatPassword');
	}, [repeatPassword]);
	useEffect(() => {
		checkForm('email');
	}, [email]);

	const validation = (itemValidation, type) => {
		const patternUsername =
			/^([a-zA-Z0-9_.AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+){3}$/;
		const patternPassword =
			/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
		const repeatPatternPassword =
			password === repeatPassword && password !== '';
		const patternEmail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (type === 'email') {
			return patternEmail.test(itemValidation);
		} else if (type === 'password') {
			return patternPassword.test(itemValidation);
		} else if (type === 'repeatPassword') {
			return repeatPatternPassword;
		} else if (type === 'username') {
			return patternUsername.test(itemValidation);
		} else if (type === 'all') {
			return (
				patternEmail.test(email) &&
				patternPassword.test(password) &&
				patternUsername.test(username) &&
				repeatPatternPassword
			);
		}
	};

	const checkForm = (type) => {
		const usernameText = document.querySelector('input:nth-child(2)');
		const passwordText = document.querySelector('input:nth-child(4)');
		const repeatPasswordText = document.querySelector('input:nth-child(6)');
		const emailText = document.querySelector('input:nth-child(8)');

		if (type === 'username') {
			usernameText.style.outline = `${
				validation(username, 'username') ? '1px solid green' : 'none'
			}`;
		} else if (type === 'password') {
			passwordText.style.outline = `${
				validation(password, 'password') ? '1px solid green' : 'none'
			}`;
		} else if (type === 'repeatPassword') {
			repeatPasswordText.style.outline = `${
				validation(null, 'repeatPassword') ? '1px solid green' : 'none'
			}`;
		} else if (type === 'email') {
			emailText.style.outline = `${
				validation(email, 'email') ? '1px solid green' : 'none'
			}`;
		}
	};

	const addUser = (e) => {
		e.preventDefault();

		const registrationTime = new Date();

		const user = {
			email,
			password,
			userinfo: {
				username,
				registrationTime,
			}
		};
		
		fetch('/checkEmail', {
			method: 'POST',
			body: email,
		})
			.then((res) => res.json())
			.then((data) => data ? document.querySelector('.modal').style.display = 'block' : pushUser(user));

	};

	const pushUser = (props) => {
		if (validation(null, 'all')) {
			fetch('/add', {
				method: 'POST',
				headers: {},
				body: JSON.stringify(props),
			});

			document.querySelector('.test').classList.add('active')
			setUsername('')
			setPassword('')
			setRepeatPassword('')
			setEmail('')
			// navigate('/login');
		}
	}

	return (
		<div className='register'>
			<div className='register_box'>
				<form onSubmit={addUser}>
					<h2>Zarejestruj się!</h2>
					<div className='inputs'>
						<span>Imię</span>
						<input
							onChange={(e) => {
								setUsername(e.target.value);
							}}
							value={username}></input>
						<span>Hasło</span>
						<input
							type='password'
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							value={password}></input>
						<span>Powtórz hasło</span>
						<input
							type='password'
							onChange={(e) => {
								setRepeatPassword(e.target.value);
							}}
							value={repeatPassword}></input>
						<span>E-mail</span>
						<input
							type='email'
							onChange={(e) => {
								setEmail(e.target.value);
							}}
							value={email}></input>
					</div>
					<input type='submit'></input>
				</form>
				<div className='modal'><Message content='Email już istnieje'/></div>
			</div>
			<Popup text='Rejestracja udana, zaloguj się.'/>
		</div>
	);
}

export default Register;
