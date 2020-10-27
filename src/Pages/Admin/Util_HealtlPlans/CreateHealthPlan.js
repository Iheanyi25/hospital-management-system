import React, { Component } from 'react';
import { PageLoader, TemplateSettings } from '../../../Components';

export default class CreateHealthPlan extends Component {
	state = {
		name: '',
		cost: '',
		renewal: '',
		noOfPatients: '',
		noOfAccounts: '',
		instantBilling: false,
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		console.log(this.state);
		const data = {
			name: this.state.name,
			cost: this.state.cost,
			renewal: this.state.renewal,
			noOfPatients: this.state.noOfPatients,
			noOfAccounts: this.state.noOfAccounts,
			instantBilling: this.state.instantBilling,
		};
		if (
			this.state.name !== '' &&
			this.state.cost !== '' &&
			this.state.renewal !== '' &&
			this.state.noOfPatients !== '' &&
			this.state.noOfAccounts !== ''
		) {
			try {
				let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/CreateHealthPlan', {
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

	render() {
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
									<div className="card border-light">
										<div className="card-body">
											<form
												className="mb-4 p-5 n"
												onSubmit={this.handleSubmit}
												noValidate
											>
												<h4 className="text-center">Create a health plan</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of the health plan"
														name="name"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
												</div>
												<div className="form-group">
													<label>Cost</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Price of the health plan"
														name="cost"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Oops! should be numbers only.
													</div>
												</div>
												<div className="form-group">
													<label>Renewal Cost</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Cost of annual renewal of card"
														name="renewal"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Oops! should be numbers only.
													</div>
												</div>
												<div className="form-group">
													<label>Patients Per Folder</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Number of patient per folder"
														name="noOfPatients"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Oops! should be numbers only.
													</div>
												</div>
												<div className="form-group">
													<label>Accounts Per Health Plan</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Accounts Per health plan"
														name="noOfAccounts"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">
														Oops! should be numbers only.
													</div>
												</div>
												<div className="form-group">
													<div className="custom-control custom-switch mb-3">
														<input
															type="checkbox"
															className="custom-control-input"
															id="control2"
															name="instantBilling"
															onClick={(e) => {
																this.setState({
																	instantBilling: !this.state.instantBilling,
																});
															}}
														/>{' '}
														<label className="custom-control-label" for="control2">
															Instant Billing
														</label>
													</div>
												</div>
												<div className="row">
													<div className="col"></div>
													<div className="col text-right">
														<button type="submit" className="btn btn-primary">
															Submit
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
				<TemplateSettings />
			</>
		);
	}
}
