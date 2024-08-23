import React, { useState } from 'react';

function Login() {
	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loginEmail, setLoginEmail] = useState('');
	const [loginPassword, setLoginPassword] = useState('');
	const [deviceName, setDeviceName] = useState('');
	const [macAddress, setMacAddress] = useState('');

	const handleRegisterSubmit = async (event) => {
		event.preventDefault();

		const formData = {
			firstname: document.getElementById('firstname').value,
			lastname: document.getElementById('lastname').value,
			email: document.getElementById('email').value,
			password: document.getElementById('password').value,
		};

		try {
			const response = await fetch('http://localhost:5000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				alert('Registration successful!');
				localStorage.setItem('token', data.token);
				localStorage.setItem('userId', data.userId);
			} else {
				alert('Registration failed: ' + data.msg);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while registering.');
		}

		console.log('Register:', { firstname, lastname, email, password });
	};

	const handleLoginSubmit = async (event) => {
		event.preventDefault();

		const formData = {
			email: document.getElementById('loginEmail').value,
			password: document.getElementById('loginPassword').value,
		};

		try {
			const response = await fetch('http://localhost:5000/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				alert('Login successful!');
				localStorage.setItem('token', data.token);
				localStorage.setItem('user', data.userId);
				console.log(data);
			} else {
				alert('Login failed: ' + data.msg);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while logging in.');
		}

		console.log('Login:', { email: loginEmail, password: loginPassword });
	};

	const handleDeleteAccount = async (event) => {
		const token = localStorage.getItem('token');

		if (!token) {
			alert('You need to log in first!');
			return;
		}

		try {
			const response = await fetch('http://localhost:5000/api/auth/delete', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': token,
				},
			});

			const data = await response.json();

			if (response.ok) {
				alert('Account deleted successfully!');
				localStorage.removeItem('token');
			} else {
				alert('Account deletion failed: ' + data.msg);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while deleting the account.');
		}

		console.log('Delete Account');
	};

	const handleRegisterDevice = async (event) => {
		event.preventDefault();

		const formData = {
			user: localStorage.getItem('userId'),
			name: document.getElementById('deviceName').value,
			macAddress: document.getElementById('macAddress').value,
		};

		try {
			const response = await fetch('http://localhost:5000/api/devices/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': localStorage.getItem('token'),
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (response.ok) {
				alert('Device registration successful!');
			} else {
				alert('Device registration failed: ' + data.msg);
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while registering the device.');
		}
		console.log('Register Device:', { deviceName, macAddress });
	};

	const handleGetDevices = async (event) => {
		const token = localStorage.getItem('token');

		try {
			const response = await fetch('http://localhost:5000/api/devices', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'x-auth-token': token,
				}
			});

			const data = await response.json();
			console.log(response.json);

			if (response.ok) {
				alert('Devices retrieved successfully!');
				console.log(data);
				console.log('success');
			} else {
				alert('Device retrieval failed: ' + data.msg);
				console.log('failed');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while retrieving devices.');
		}
		console.log('Get Devices');
	};

	const deleteDevice = async (event) => {
		// Handle deleting device logic here
		console.log('Delete Device');
	};

	return (
		<div>
			<h1>Register</h1>
			<form id="registerForm" onSubmit={handleRegisterSubmit}>
				<label htmlFor="firstname">First Name:</label>
				<input
					type="text"
					id="firstname"
					name="firstname"
					value={firstname}
					onChange={(e) => setFirstname(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="lastname">Last Name:</label>
				<input
					type="text"
					id="lastname"
					name="lastname"
					value={lastname}
					onChange={(e) => setLastname(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="email">Email:</label>
				<input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
				<br />
				<br />

				<label htmlFor="password">Password:</label>
				<input
					type="password"
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<br />
				<br />

				<button type="submit">Register</button>
			</form>

			<h1>Login</h1>
			<form id="loginForm" onSubmit={handleLoginSubmit}>
				<label htmlFor="loginEmail">Email:</label>
				<input
					type="email"
					id="loginEmail"
					name="email"
					value={loginEmail}
					onChange={(e) => setLoginEmail(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="loginPassword">Password:</label>
				<input
					type="password"
					id="loginPassword"
					name="password"
					value={loginPassword}
					onChange={(e) => setLoginPassword(e.target.value)}
					required
				/>
				<br />
				<br />

				<button type="submit">Login</button>
			</form>

			<button id="deleteAccount" onClick={handleDeleteAccount}>
				Delete Account
			</button>

			<h1>Register Device</h1>
			<form id="registerDevice" onSubmit={handleRegisterDevice}>
				<label htmlFor="deviceName">Device Name:</label>
				<input
					type="text"
					id="deviceName"
					name="deviceName"
					value={deviceName}
					onChange={(e) => setDeviceName(e.target.value)}
					required
				/>
				<br />
				<br />

				<label htmlFor="macAddress">MAC Address:</label>
				<input
					type="text"
					id="macAddress"
					name="macAddress"
					value={macAddress}
					onChange={(e) => setMacAddress(e.target.value)}
					required
				/>
				<br />
				<br />

				<button type="submit">Register Device</button>
			</form>

			<h1>Get Devices</h1>
			<button id="getDevices" onClick={handleGetDevices}>
				Get Devices
			</button>

			<h1>Delete Device</h1>
			<button id="deleteDevice" onClick={deleteDevice}>
				Delete Device
			</button>
		</div>
	);
}

export default Login;
