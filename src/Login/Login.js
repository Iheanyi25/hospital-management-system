import React, { Component } from "react";
import styles from "./CSS/Login.module.css";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			submitting: false
		};

		this.login = this.login.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(name, e) {
		const value = e.target.value;

		this.setState({
			[name]: value
		});
	}

	async login(e) {
		e.preventDefault();
		this.setState({ submitting: true });
		const { email, password } = this.state;
		const url = process.env.REACT_APP_URL;
		try {
			const request = await fetch(`${url}/Auth/Login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			});

			if (!request.ok) {
				this.setState({ submitting: false });
				const error = await request.json();
				throw Error(error.message);
			}

			const data = await request.json();
			localStorage.setItem("token", data.token);
			localStorage.setItem(
				"account",
				JSON.stringify(data.authenticatedUser)
			);
			this.props.history.push("/");
		} catch (err) {
			console.log(err);
		}
	}

	render() {
		const { email, password, submitting } = this.state;
		return (
			<>
				<div className={styles.background}></div>
				<div className={styles.div}>
					<h1>
						<img src="./assets/img/logo.svg" alt width={147} height={33} className="logo-img" />Hospital Management Solution
					</h1>
					<h2>Login</h2>
					<form
						className={styles.form}
						onSubmit={(e) => this.login(e)}
					>
						<label htmlFor="email">Email</label>
						<input
							id="email"
							className={["input", styles.input].join(" ")}
							value={this.state.email}
							onChange={(e) => this.handleChange("email", e)}
							type="email"
							name="email"
							placeholder="Enter email"
							required
						/>
						<label htmlFor="password">Password</label>
						<input
							id="password"
							className={["input", styles.input].join(" ")}
							value={password}
							onChange={(e) => this.handleChange("password", e)}
							type="password"
							name="password"
							placeholder="Enter password"
							required
						/>
						<button
							className={["primary_btn", styles.submit_btn].join(
								" "
							)}
							type="submit"
							disabled={
								email === "" || password === "" || submitting
									? true
									: false
							}
						>
							Sign In
						</button>
					</form>
				</div>
			</>
		);
	}
}

export default Login;
