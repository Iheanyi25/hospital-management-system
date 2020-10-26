import React from 'react';
import { PageLoader, TemplateSettings } from '../../Components';

class CreateService extends React.Component {
	render() {
		return (
			<>
				<PageLoader />

				<main className="main-content">
					<div className="app-loader">
						<i className="icofont-spinner-alt-4 rotate" />
					</div>
					<div className="main-content-wrap">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									<div class="card border-light">
										<div class="card-body">
											<form className="mb-4">
												<h4 className="text-center">Create a service</h4>
												<div className="form-group">
													<label>Title</label>

													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of service"
													/>
												</div>

												<div className="form-group">
													<label>Category</label>

													<select className="form-control">
														<option>Select a category</option>
														<option>One</option>
														<option>Two</option>
													</select>
												</div>
												<div className="form-group">
													<label>Cost</label>{' '}
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Price of Service"
													/>
												</div>
												<div className="row">
													<div className="col">
													</div>
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

export default CreateService;
