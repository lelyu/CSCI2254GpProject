import React, { useState } from "react";
import { auth } from "../firebase";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			await auth.signInWithEmailAndPassword(email, password);
			// Sign in with Google
			// use the Firebase auth provider for Google sign-in
			const provider = new firebase.auth.GoogleAuthProvider();
			await auth.signInWithPopup(provider);
			// Login successful, do something here (e.g., redirect to dashboard)
		} catch (error) {
			console.log(error);
			// Handle login error here
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleLogin}>
				<label>Email:</label>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label>Password:</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>
			</form>
		</div>
	);
};

export default Login;
