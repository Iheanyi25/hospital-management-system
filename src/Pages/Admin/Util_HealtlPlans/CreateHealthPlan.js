import React, { Component } from 'react';
import { PageLoader, TemplateSettings } from '../../../Components';

export default class CreateHealthPlan extends Component {
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
									<div class="card border-light">
										<div class="card-body">
											<form className="mb-4 p-5">
												<h4 className="text-center">Create a health plan</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of the health plan"
													/>
												</div>
												<div className="form-group">
													<label>Cost</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Price of the health plan"
													/>
												</div>
												<div className="form-group">
													<label>Renewal Cost</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Cost of annual renewal of card"
													/>
												</div>
												<div className="form-group">
													<label>Patients Per Folder</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Number of patient per folder"
													/>
												</div>
												<div className="form-group">
													<label>Accounts Per Health Plan</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Accounts Per health plan"
													/>
												</div>
												<div className="form-group">
													<div class="custom-control custom-switch mb-3">
														<input
															type="checkbox"
															class="custom-control-input"
															id="control2"
														/>{' '}
														<label class="custom-control-label" for="control2">
															Instant Billing
														</label>
													</div>
												</div>
												<div className="row">
													<div className="col"></div>
													<div className="col text-right">
														<button type="button" className="btn btn-primary">
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
