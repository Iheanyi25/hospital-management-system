import React from 'react';
import { PageLoader } from '../../../Components';

class CreateService extends React.Component {
	state = {
		categories: [],

		name: '',
		serviceCategoryId: '',
		cost: '',
	};

	componentDidMount() {
		this.fetchServiceCategories();
	}

	fetchServiceCategories = async () => {
		try {
			let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/GetAllServiceCategories', {
				headers: { 'Content-Type': 'application/json-patch+json' },
				method: 'GET',
				redirect: 'follow',
			});
			const data = await res.text();
			console.log(JSON.parse(data));
			this.setState({ categories: JSON.parse(data) });
		} catch (error) {
			console.log(error);
		}
	};

	handleSubmit = async(e) => {
		e.preventDefault();
		const data = {
			name: this.state.name,
			serviceCategoryId: this.state.serviceCategoryId,
			cost: this.state.cost,
		};
		if (this.state.name !== '' && this.state.serviceCategoryId !== '' && this.state.cost !== '') {
			try {
				let res = await fetch('https://hms-tenece.azurewebsites.net/api/Admin/CreateService', {
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
					<div className="main-content-wrap w-75">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									<div className="card border-light">
										<div className="card-body">
											<form
												className="mb-4 p-5 needs-validation"
												onSubmit={this.handleSubmit}
												noValidate
											>
												<h4 className="text-center">Create a service</h4>
												<div className="form-group">
													<label>Title</label>

													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of service"
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
													<label>Category</label>
													<select
														className="form-control"
														name="serviceCategoryId"
														onChange={(e) => {
															this.setState({ [e.target.name]: e.target.value });
														}}
													>
														<option>Select a category</option>
														{this.state.categories.length > 0 &&
															this.state.categories.map((category, i) => (
																<option key={i} value={category.id}>
																	{category.name}
																</option>
															))}
													</select>
												</div>
												<div className="form-group">
													<label>Cost</label>{' '}
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														placeholder="Price of Service"
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
			</>
		);
	}
}

export default CreateService;
