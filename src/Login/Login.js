import React, { Component } from "react";
import styles from "./css/Login.module.css";

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
				<div className={styles.background}>
					<div className={styles.div}>
						<h1>
							<img src="./assets/img/logo.svg" width={147} height={33} className="logo-img" />Hospital Management Solution
						</h1>
						<h2>Login</h2>
						<form
							className={styles.form}
							onSubmit={(e) => this.login(e)}
						>
							<div class="form-group">
								<label>Email Address</label>
								 <input class="form-control" type="email" name="email" value={this.state.email} onChange={(e) => this.handleChange("email", e)} placeholder="Your Email Address" required />
								 
							</div>

							<div class="form-group">
								<label>Password</label>
								 <input class="form-control" type="password" name="password" value={password} onChange={(e) => this.handleChange("password", e)} placeholder="Your Email Address" required />
								 
							</div>
							
							
							<button
								className="btn btn-primary"
								type="submit"
								disabled={
									email === "" || password === "" || submitting
										? true
										: false
								}
							>
								Login
							</button>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
