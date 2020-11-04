import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../../../Components';

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;

class CreateServiceRequest extends Component {

	state = {
		categorySelected: false,
		categories: [],
		values: [],
		patients: [],
		services: [],
		category: '',
		rerender: ""
	}

	componentDidMount() {
		this.fetchServiceCategories();
		this.fetchPatients();
	}

	fetchServiceCategories = async () => {
		let res = await fetch(apiUrl + '/Admin/GetAllServiceCategories');
		const data = await res.json();
		console.log({ data })
		this.setState({ categories: data });
	};

	renderPicker() {
		var select = $('.custom-picker');
		console.log("adegoke")

		if (select.length) {
			select.each(function () {
				$(this).selectpicker({
					style: '',
					styleBase: 'form-control',
					tickIcon: 'icofont-check-alt'
				});
			});
		}
	}

	fetchPatients = async () => {
		let res = await fetch(apiUrl + '/Patient/GetPatients');
		const data = await res.json();
		const patientArray = [];

		data.patients.forEach(element => {
			patientArray.push(element.patient);
		});

		this.setState({ patients: patientArray }, () => {
			this.renderPicker();
		});
	}

	fetchServicesInACategory = async (id) => {
		let res = await fetch(apiUrl + "/Admin/GetAllServicesInAServiceCategory?serviceCategoryId=" + id);
		let data = await res.json();
		this.setState({ services: data }, () => {
			this.renderPicker();
		})
	}

	handleSelect = (e) => {
		if (e.target.value) {
			let valueContainer = document.getElementsByClassName('filter-option-inner-inner')[0];
			let values = valueContainer.innerText.split(',');
			let valueToPush = [];

			values.map((item) => {
				let newSelect = {
					serviceID: '',
					service: item,
					category: this.state.category,
				};
				return valueToPush.push(newSelect);
			});

			this.setState({ values: [...this.state.values, ...valueToPush] });
			console.log(this.state.values);
		}
	};

	handleChange = (e) => {
		let value = e.target.value;
		let fullData = value.split("#")
		console.log(fullData)
		this.setState({ category: fullData[0] });
		this.fetchServicesInACategory(fullData[1]);
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
													<select className="selectpicker custom-picker rounded form-control"
														data-live-search="true" >
														{
															this.state.patients.map((item, index) => {
																return <option data-tokens={`${item.firstName} ${item.lastName}`} key={index}>{`${item.firstName} ${item.lastName}`}</option>
															})
														}
													</select>
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
																: 'Loading...'}
															{/** added loading this.state to the form */}
														</option>
														{this.state.categories.length > 0 &&
															this.state.categories.map((category, i) => (
																<option key={i} value={category.name + "#" + category.id}>
																	{category.name}
																</option>
															))}
													</select>
												</div>

												<div className="form-group">
													<label>Services</label>

													<select
														className="selectpicker custom-picker rounded form-control"
														multiple
														data-live-search="false"
														onChange={(e) => {
															this.handleSelect(e);
														}}
													>
														{
															this.state.services.map((service, i) => (
																<option key={i} value={service.id}>
																	{service.name}
																</option>
															))
														}
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
														{
															this.state.values.length > 0 ? (
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
															) :
																<tr>
																	<td colSpan="4">
																		<p className="w-50 text-secondary">
																			You can always change the service category, if
																			you want to add different services from
																			different categories
																	</p>
																	</td>
																</tr>

														}
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

export default CreateServiceRequest;