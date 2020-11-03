import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../../../Components';

export default class CreateServiceRequest extends Component {
	state = {
		categorySelected: false,
		categories: [],
		values: [],
		category: '',
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

	handleSelect = (e) => {
		// this.setState({ values: text.target.value });
		// console.log(this.state.values);
		if (e.target.value) {
			let valueContainer = document.getElementsByClassName('filter-option-inner-inner')[0];
			let values = valueContainer.innerText.split(',');
			let valueToPush = [];

			values.map((item, index) => {
				let newSelect = {
					serviceID: '',
					service: item,
					category: this.state.category,
				};
				valueToPush.push(newSelect);
			});

			this.setState({ values: valueToPush });
			console.log(this.state.values);
		}
	};

	handleChange = (e) => {
		this.setState({ category: e.target.value });
	};

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
							<div className="row">
								<div className="col-12 col-md-5">
									<div className="card border-light">
										<div className="card-body">
											<form className="mb-4 p-5 needs-validation">
												<h4 className="text-center">Service request form</h4>
												<div className="form-group">
													<label>Patient</label>

													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Patient"
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
												</div>

												<div className="form-group">
													<label>Service Category</label>
													<select
														className="form-control"
														defaultValue={this.state.category}
														onChange={(e) => {
															this.handleChange(e);
														}}
													>
														<option disabled selected="true" value="">
															{this.state.categories.length > 0
																? 'Select service category'
																: 'Loading...'}{' '}
															{/** added loading state to the form */}
														</option>
														{this.state.categories.length > 0 &&
															this.state.categories.map((category, i) => (
																<option key={i} value={category.name}>
																	{category.name}
																</option>
															))}
													</select>
												</div>
												<div className="form-group">
													<label>Services</label>
													<select
														className="selectpicker rounded form-control"
														multiple="multiple"
														// defaultValue={this.state.values}
														onChange={(e) => {
															this.handleSelect(e);
														}}
													>
														<option value="mustard">Mustard</option>
														<option value="ketchup">Ketchup</option>
														<option value="barbeKue">Barbecue</option>
													</select>
												</div>
											</form>
										</div>
									</div>
								</div>

								{/* display service chosen */}
								<div className="col-12 col-md-7">
									<div className="card border-light">
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-striped">
													<thead>
														<tr className="">
															<th>#</th>
															<th>Service</th>
															<th>Category</th>
															<th>Action</th>
														</tr>
													</thead>

													<tbody>
														{this.state.values.length > 0 ? (
															this.state.values.map((item, index) => (
																<tr>
																	<td>
																		<strong>{index + 1}</strong>
																	</td>
																	<td>
																		<strong>
																			<div className="d-flex align-items-center nowrap">
																				{item.service}
																			</div>
																		</strong>
																	</td>
																	<td>{item.category}</td>
																	<td>
																		<div className="d-flex align-items-center nowrap">
																			<Link
																				title="Delete"
																				to="#"
																				className="text-danger mr-4"
																			>
																				<span className="btn-icon icofont-delete-alt" />
																			</Link>
																		</div>
																	</td>
																</tr>
															))
														) : (
															<tr>
																<td colSpan="4">
																	<p className="w-50 text-secondary">
																		You can always change the service category, if
																		you want to add different services from
																		different categories
																	</p>
																</td>
															</tr>
														)}
													</tbody>
												</table>
											</div>
											<div className="row mt-5">
												<div className="col"></div>
												<div className="col text-right">
													<button type="submit" className="btn btn-primary">
														Request service
													</button>
												</div>
											</div>
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
