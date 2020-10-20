import React, { Component } from "react";
import styles from "./css/Login.module.css";

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apiUrl: process.env.REACT_APP_API_URL,
			email: "",
			password: "",
			errorMessage: "",
			showErrorMessage: false,
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
		const url = this.state.apiUrl;

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
				console.log('kfgkgkgfk: ', request.json())
				const error = await request.json();
				this.setState({ submitting: false });
				throw Error(error.message);
			}

			const data = await request.json();
			
			localStorage.setItem("token", data.token);
			localStorage.setItem("authenticatedUser", JSON.stringify(data.authenticatedUser));

			if (data.authenticatedUser.userType === "Admin" || data.authenticatedUser.userType === "admin") {
				this.props.history.push("/AdminDashboard");

			} else if (data.authenticatedUser.userType === "Patient" || data.authenticatedUser.userType === "patient") {
				this.props.history.push("/PatientDashboard");

			} else if (data.authenticatedUser.userType === "Doctor" || data.authenticatedUser.userType === "doctor") {
				this.props.history.push("/DoctorDashboard");

			} else if (data.authenticatedUser.userType === "Accountant" || data.authenticatedUser.userType === "accountant") {
				this.props.history.push("/AccountantDashboard");

			} else if (data.authenticatedUser.userType === "Pharmacy" || data.authenticatedUser.userType === "pharmacy") {
				this.props.history.push("/PharmacyDashboard");

			} else if (data.authenticatedUser.userType === "Lab" || data.authenticatedUser.userType === "lab") {
				this.props.history.push("/LabDashboard");
			}

		} catch (err) {
			console.log(err.message)
			this.setState({ showErrorMessage: true, errorMessage: err.message });
		}
	}

	render() {
		const { email, password, submitting } = this.state;
		var displayError

		if (this.state.showErrorMessage) {
			displayError =
				<div className="alert alert-warning with-after-icon" role="alert">
					<div className="alert-content">{this.state.errorMessage}</div>
					<div className="alert-icon"><i className="icofont-alarm" /></div>
				</div>;
		}

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
								<input class="form-control" type="password" name="password" value={password} onChange={(e) => this.handleChange("password", e)} placeholder="Your Password" required />

							</div>

							{displayError}

							<button
								className="btn btn-primary"
								type="submit"
								disabled={
									email === "" || password === "" || submitting
										? true
										: false
								}
							>
								<span class="btn-icon icofont-location-arrow mr-2"></span> Login
							</button>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default Login;
