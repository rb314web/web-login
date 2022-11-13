import React, { useState } from 'react';
import LoginForm from './component/loginform';
import Content from './component/content';
import Register from './component/register';
import Navigation from './component/nav';
import './App.css';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
	const [userLogin, setUserLogin] = useState(0);
	const [activeUser, setActiveUser] = useState();

	let navigate = useNavigate();

	const login = (props) => {
		setActiveUser(props);
		setUserLogin(true);
		navigate('/');
	};

	const logout = () => {
		setUserLogin(false);
	};

	const AfterLoginContent = () => {
		return (
			<div>
				<p
					style={{
						color: 'white',
						fontSize: '30px',
					}}>
					To jest treść widoczna bez logowania 🤷‍♂️
				</p>
			</div>
		);
	};

	return (
		<>
		<Navigation userLogin={userLogin} logout={logout}/>
			<Routes>
				<Route path='/login' element={<LoginForm login={login} />} />
				<Route path='/register' element={<Register />} />
			</Routes>
			{userLogin ? (
				<Content user={activeUser} logout={logout} />
			) : (
				<AfterLoginContent />
			)}
		</>
	);
}

export default App;
