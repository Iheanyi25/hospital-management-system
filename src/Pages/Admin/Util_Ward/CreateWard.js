import React, { Component } from 'react';
import { PageLoader, TemplateSettings } from '../../../Components';

export default class CreateWard extends Component {
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
												<h4 className="text-center">Create a Ward</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of Ward"
													/>
												</div>
												<div className="form-group">
													<label>Capacity</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Room capacity"
													/>
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
