import { useEffect, useState } from 'react';

import userData from './userData';

import './register.scss';

function Register() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	useEffect(() => {
		checkForm('username');
	}, [username]);
	useEffect(() => {
		checkForm('password');
	}, [password]);
	useEffect(() => {
		checkForm('email');
	}, [email]);

	const validation = (itemValidation, type) => {
		const patternUsername =
			/^([a-zA-Z0-9_.AaĄąBbCcĆćDdEeĘęFfGgHhIiJjKkLlŁłMmNnŃńOoÓóPpRrSsŚśTtUuWwYyZzŹźŻż]+){3}$/;
		const patternPassword =
			/^(?=.*?[0-9])(?=.*?[A-Z])(?=.*?[#?!@$%^&*\-_]).{8,}$/;
		const patternEmail =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

		if (type === 'email') {
			return patternEmail.test(itemValidation);
		} else if (type === 'password') {
			return patternPassword.test(itemValidation);
		} else if (type === 'username') {
			return patternUsername.test(itemValidation);
		} else if (type === 'all') {
			return patternEmail.test(email) && patternPassword.test(password) && patternUsername.test(username)
		}
	};

	const checkForm = (type) => {
		const usernameText = document.querySelector('.username');
		const passwordText = document.querySelector('.password');
		const emailText = document.querySelector('.email');

		if (type === 'username') {
			usernameText.style.color = `${
				validation(username, 'username') ? 'green' : 'red'
			}`;
		} else if (type === 'password') {
			passwordText.style.color = `${
				validation(password, 'password') ? 'green' : 'red'
			}`;
		} else if (type === 'email') {
			emailText.style.color = `${validation(email, 'email') ? 'green' : 'red'}`;
		}
	};

	const addUser = (e) => {
		e.preventDefault();

		const registrationTime = new Date();

		const user = {
			username,
			email,
			password,
			registrationTime: registrationTime,
		};

		if (validation(null,'all')) {
			userData.push(user);
			setUsername('')
			setEmail('')
			setPassword('')
		}
		console.log(userData);
	};

	return (
		<div className='register'>
		<div className='register_box'>
			<form onSubmit={addUser}>
				<h2>Zarejestruj się!</h2>
				<input
				placeholder='Imię'
					onChange={(e) => {
						setUsername(e.target.value);
					}}
					value={username}></input>
				<p className='username'>Wiecej niż 4 znaki, bez znaków specjalnych</p>
				<input
				placeholder='Hasło'
					type='password'
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					value={password}></input>
				<p className='password'>
					Znak specjalny, duża i mała litera, cyfra, minimum 8 znaków{' '}
				</p>
				<input
				placeholder='E-mail'
					type='email'
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					value={email}></input>
				<p className='email'>No wpisz prawidłowy email</p>
				<input type='submit' ></input>
			</form>
		</div>
		</div>
	);
}

export default Register;
