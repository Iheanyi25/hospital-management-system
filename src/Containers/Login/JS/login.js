import React, { Component } from "react";
import styles from "../CSS/login.module.css";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			submitting: false
		};
	}

	handleChange(name, e) {
		const value = e.target.value;

		this.setState({
			[name]: value
		});
	}

	async login(e) {
		e.preventDefault()
		this.setState({ submitting: true });
		const { email, password } = this.state;
		const url = process.env.URL
		try {
			const request = await fetch(`${url}/Auth/Login/`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					Email: email,
					Password: password
				})
			});

			if (!request.ok) {
				this.setState({ submitting: false });
				const error = await request.json();
				throw Error(error.Message);
			}

			const data = await request.json();
			localStorage.setItem("accessToken", data.Token);
			localStorage.setItem("account", JSON.stringify(data.Message));
			this.props.history.push("/");
		} catch (err) {
			this.props.errorHandler(err);
		}
	}

	render() {
		const { email, password, submitting } = this.state;
		return (
			<div className={styles.div}>
				<h1>Login</h1>
				<form className={styles.form}>
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
						className={["primary_btn", styles.submit_btn].join(" ")}
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
		);
	}
}

export default Login;
