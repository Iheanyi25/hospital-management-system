import React from 'react';
import { PageLoader, TemplateSettings } from '../../../Components';

class ServiceCategory extends React.Component {
	state = {
		name: '',
		description: '',
	};

	handleSubmit = async (e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
			description: this.state.description,
		};
		try {
			let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/CreateAServiceCategory', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'POST',
				body: JSON.stringify(data),
				redirect: 'follow',
			});
			console.log(res);
		} catch (error) {
			console.log(error);
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
									<div class="card border-light">
										<div class="card-body">
											<form
												className="mb-4 p-5 needs-validation"
												onSubmit={this.handleSubmit}
												noValidate
											>
												<h4 className="text-center">Service Category</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name"
														name="name"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div className="valid-feedback">Looks good!</div>
												</div>
												<div className="form-group">
													<label>Description</label>
													<textarea
														className="form-control"
														placeholder="Description"
														rows={3}
														name="description"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
														required
													/>
													<div class="valid-feedback">Looks good!</div>
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

export default ServiceCategory;
