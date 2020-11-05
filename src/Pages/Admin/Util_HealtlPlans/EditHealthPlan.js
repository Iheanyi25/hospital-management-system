import React, { Component } from 'react'
import { PageLoader, TemplateSettings } from '../../../Components';

export default class EditHealthPlan extends Component {

	state = {}

	componentDidMount() {
		if (this.props.history.location.state) {
			this.setState(this.props.history.location.state);
		}
		else {
			return this.props.history.push("/AdminDashboard");
		}

	}

	render() {
		return (
			<>
				<PageLoader />
				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					<div className="main-content-wrap w-75">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									<div className="card border-light">
										<div className="card-body">
											<form className="mb-4 p-5 needs-validation" noValidate>
												<h4 className="text-center">Edit a health plan</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of the health plan"
														defaultValue={this.state.name}
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
														defaultValue={this.state.cost}
														placeholder="Price of the health plan"
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
														defaultValue={this.state.renewal}
														tabIndex={-98}
														placeholder="Cost of annual renewal of card"
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
														defaultValue={this.state.noOfPatients}
														placeholder="Number of patient per folder"
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
														defaultValue={this.state.noOfAccounts}
														tabIndex={-98}
														placeholder="Accounts Per health plan"
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
															checked={this.state.instantBilling ? "checked" : ""}
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
		)
	}
}
