import React, { Component } from 'react';
import { PageLoader } from '../../Components';

const $ = window.$;

export default class AddPatient extends Component {
	state = {
		healthPlans: [],

		firstName: '',
		lastName: '',
		email: '',
		healthPlanId: '',
		accountId: '',
		// showErrorMessage: false,
		// showSuccessMessage: false,
	};

	componentDidMount() {
		this.fetchHealthPlans();
	}

	fetchHealthPlans = async () => {
		try {
			let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/GetAllHealthPlans', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'GET',
				redirect: 'follow',
			});
			const data = await res.text();
			console.log(JSON.parse(data).plans);
			this.setState({ healthPlans: JSON.parse(data).plans });
		} catch (error) {
			console.log(error);
		}
	};

	handleChange(name, e) {
		const value = e.target.value;

		if (name === 'healthPlan') {
			let healthPlanDetails = e.target.value.split('#');
			console.log(healthPlanDetails);
			if (healthPlanDetails[0] === 'family') {
				this.selectHealthPlan(healthPlanDetails[0]);
			} else {
				this.setState({ healthPlanId: healthPlanDetails[1] });
			}
		}

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			firstName: this.state.firstName,
			lastName: this.state.lastName,
			email: this.state.email,
			healthPlanId: this.state.healthPlanId,
		};
		if (
			this.state.firstName !== '' &&
			this.state.lastName !== '' &&
			this.state.email !== '' &&
			this.state.healthPlanId !== ''
		) {
			try {
				let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/RegisterPatient', {
					headers: { 'Content-Type': 'application/json-patch+json' },
					method: 'POST',
					body: JSON.stringify(data),
					redirect: 'follow',
				});
				console.log(res);
			} catch (error) {
				console.log(error);
			}
		}
	};

	selectHealthPlan(val) {
		console.log(val);
		this.props.history.push({ 
			pathname: '/AdminSelectHealthPlan',
			state: this.state
		   });
		// this.props.history.push('/AdminSelectHealthPlan/' + val);
	}
	// async registerPatient(e) {
	// 	e.preventDefault();

	// 	const { email, firstName, lastName, password } = this.state;
	// 	try {
	// 		const request = await fetch(`${this.state.apiUrl}/Admin/Register`, {
	// 			method: 'POST',
	// 			headers: {
	// 				'Content-Type': 'application/json',
	// 			},
	// 			body: JSON.stringify({
	// 				email,
	// 				firstName,
	// 				lastName,
	// 				password,
	// 			}),
	// 		});

	// 		if (!request.ok) {
	// 			const error = await request.json();
	// 			throw Error(error.message);
	// 		}

	// 		const data = await request.json();

	// 		this.setState({
	// 			showSuccessMessage: true,
	// 			successMessage: data.message,
	// 			patientId: data.newApplicationUser.id,
	// 		});
	// 		localStorage.setItem('registeredPatient', JSON.stringify(data.authenticatedUser));
	// 	} catch (err) {
	// 		console.log(err.message);
	// 		this.setState({ showErrorMessage: true, errorMessage: err.message });
	// 	}
	// }

	// displayError() {
	// 	if (this.state.showErrorMessage) {
	// 		return (
	// 			<div className="alert alert-danger with-after-icon" role="alert">
	// 				<div className="alert-content">{this.state.errorMessage}</div>
	// 				<div className="alert-icon">
	// 					<i className="icofont-alarm" />
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// }

	// displaySuccess() {
	// 	if (this.state.showSuccessMessage) {
	// 		return (
	// 			<div className="alert alert-info with-after-icon" role="alert">
	// 				<div className="alert-content text-center">
	// 					{this.state.successMessage}.
	// 					<p className="mb-0 ">
	// 						Would you like to update his profile?
	// 						<Link
	// 							to={`/adminupdatepatientprofile/${this.state.patientId}`}
	// 							className="btn btn-outline-light"
	// 						>
	// 							<span className="btn-icon icon icofont-ui-edit mr-2"></span>Update Profile
	// 						</Link>
	// 					</p>
	// 				</div>
	// 				<div className="alert-icon">
	// 					<i className="icon icofont-ui-check" />
	// 				</div>
	// 			</div>
	// 		);
	// 	}
	// }

	render() {
		const { email, firstName, lastName, healthPlan } = this.state;

		return (
			<>
				<PageLoader />
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					<div className="main-content-wrap w-50">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									{/* <Success /> */}
									<div className="card border-light">
										<div className="card-body">
											<form
												className="mb-4 p-5 needs-validation"
												onSubmit={this.handleSubmit}
												noValidate
											>
												<h4 className="text-center">Register new patient</h4>
												<div className="form-group">
													<label>First Name</label>
													<input
														className="form-control"
														value={firstName}
														onChange={(e) => this.handleChange('firstName', e)}
														type="text"
														placeholder="First Name"
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
												</div>
												<div className="form-group">
													<label>Last Name</label>
													<input
														className="form-control"
														value={lastName}
														onChange={(e) => this.handleChange('lastName', e)}
														type="text"
														required
														placeholder="Last Name"
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
												</div>
												<div className="form-group">
													<label>Email Address</label>
													<input
														className="form-control"
														value={email}
														onChange={(e) => this.handleChange('email', e)}
														type="email"
														required
														placeholder="Email"
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Please provide a valid email.
													</div>
												</div>
												<div className="form-group">
													<label>Health Plan</label>
													<select
														className="form-control"
														value={healthPlan}
														required
														onChange={(e) => this.handleChange('healthPlan', e)}
													>
														<option value="" selected="true" disabled>
															Health Plan
														</option>
														{this.state.healthPlans.length > 0 &&
															this.state.healthPlans.map((healthPlan, index) => (
																<option
																	key={index}
																	// data-remove={healthPlan.id}
																	value={`${healthPlan.name.toLowerCase()}#${
																		healthPlan.id
																	}`}
																>
																	{healthPlan.name}
																</option>
															))}
													</select>
												</div>
												<div className="row">
													<div className="col"></div>
													<div className="col text-right">
														<button type="submit" className="btn btn-primary">
															Register Patient
														</button>
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</main>
			</>
		);
	}
}
