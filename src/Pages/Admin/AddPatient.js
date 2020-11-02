import React, { Component } from 'react';
import { PageLoader } from '../../Components';
import SelectHealthPlan from './SelectHealthPlan';
import { Success } from '../../Components/Alerts';

export default class AddPatient extends Component {
	state = {
		healthPlans: [],
		accounts: [],
		stage: 0,
		firstName: '',
		lastName: '',
		email: '',
		healthPlan: '',
		healthPlanId: '',
		accountId: '',

		success: false,
	};

	componentDidMount() {
		this.fetchHealthPlans();
		this.fetchAccounts();
	}

	fetchHealthPlans = async () => {
		try {
			let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/GetAllHealthPlans', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'GET',
				redirect: 'follow',
			});
			const data = await res.text();
			this.setState({ healthPlans: JSON.parse(data).plans });
		} catch (error) {}
	};

	fetchAccounts = async () => {
		try {
			let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/Account/GetAllAccounts', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'GET',
				redirect: 'follow',
			});
			const data = await res.text();
			this.setState({ accounts: JSON.parse(data).accounts });
		} catch (error) {}
	};

	handleChange(name, e) {
		const value = e.target.value;

		if (name === 'healthPlan') {
			let healthPlanDetails = e.target.value.split('#');
			const { firstName, lastName, email } = this.state;

			switch (healthPlanDetails[0]) {
				case 'family':
					if (firstName !== '' && lastName !== '' && email !== '') {
						this.setState({ healthPlanId: healthPlanDetails[1], stage: this.state.stage + 1 });
					} else {
						alert('please fill in the empty fields');
						console.log(this.state);
						this.setState({
							[name]: '',
						});
						return;
					}
					break;

				default:
					this.setState({ healthPlanId: healthPlanDetails[1] });
					break;
			}
		}

		this.setState({
			[name]: value,
		});
	}

	handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, email, healthPlanId, healthPlan, stage } = this.state;

		console.log(healthPlan);

		let data = { firstName, lastName, email, healthPlanId };
		if (firstName !== '' && lastName !== '' && email !== '' && healthPlanId !== '') {
			if (healthPlan.includes('personal')) {
				this.submit(data);
			} else {
				this.setNewStage(stage + 1);
			}
		}
	};

	submit = async (data) => {
		try {
			let res = await fetch(process.env.REACT_APP_API_URL + '/Admin/RegisterPatient', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'POST',
				body: JSON.stringify(data),
				redirect: 'follow',
			});
			const response = await res.json();
			if (res.status === 200) {
				this.setState({ success: true });
			}
			// alert(response.message);
			// this.props.history.push("/AdminAllPatients")
		} catch (error) {
			console.log(error);
		}
	};

	setNewStage = (stage) => {
		this.setState({ stage });
	};

	render() {
		const { email, firstName, lastName, healthPlan, healthPlanId } = this.state;
		let data = { firstName, lastName, email, healthPlanId };

		return (
			<>
				<PageLoader />
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					{this.state.success ? (
						<Success
							history={this.props.history}
							message="Well done, you successfully added a patient"
							nextRoute="/AdminAllPatients"
						/>
					) : null}
					<div className="main-content-wrap w-75">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									{this.state.stage === 0 ? (
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
														<div className="invalid-feedback">
															Please provide a valid name.
														</div>
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
														<div className="invalid-feedback">
															Please provide a valid name.
														</div>
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
																{this.state.healthPlans.length > 0
																	? 'Select health plan'
																	: 'Loading...'}{' '}
																{/** added loading state to the form */}
															</option>
															{this.state.healthPlans.length > 0 &&
																this.state.healthPlans.map((healthPlan, index) => (
																	<option
																		key={index}
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
									) : this.state.stage === 1 ? (
										<SelectHealthPlan
											accounts={this.state.accounts}
											healthPlanId={this.state.healthPlanId}
											currentStage={this.state.stage}
											stageSetter={this.setNewStage}
											payload={data}
											submitFunction={this.submit}
										/>
									) : null}
								</div>
							</div>
						</div>
					</div>
				</main>
			</>
		);
	}
}

//comments
// selectHealthPlan(val) {
//     console.log(val);
//     this.props.history.push({
//         pathname: '/AdminSelectHealthPlan',
//         state: this.state
//     });
// }
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
