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
		rerender: "",
		patient: "",
		description: "",
		showServices: false
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

	renderPicker(customClass) {
		var select = $(customClass);

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

		console.log(patientArray)
		this.setState({ patients: patientArray }, () => {
			this.renderPicker('.custom-picker');
		});
	}

	fetchServicesInACategory = async (id) => {
		let res = await fetch(apiUrl + "/Admin/GetAllServicesInAServiceCategory?serviceCategoryId=" + id);
		let data = await res.json();

		this.setState({ services: data, showServices: true }, () => {
			this.renderPicker(".custom-picker-services")
		})
	}

	handleSelect = (e) => {
		if (this.state.patient) {
			if (e.target.value) {
				let valueContainer = document.getElementsByClassName('filter-option-inner-inner')[1];
				let values = valueContainer.innerText.split(',');
				let valueToPush = [];
				let stateValue = this.state.values;

				values.map((item, index) => {
					if (stateValue.length > 0) {

						stateValue.forEach(element => {
							if (element.serviceId === e.target.value || element.service === item) return;
							else {
								console.log(element, item, e.target.value)
								let newSelect = {
									serviceId: e.target.value,
									service: item,
									category: this.state.category,
									index
								};
								valueToPush.push(newSelect);
								this.setState({ values: [...this.state.values, ...valueToPush] });
							}
						});
					}
					else {
						console.log("second loop")
						let newSelect = {
							serviceId: e.target.value,
							service: item,
							category: this.state.category,
							index
						};
						valueToPush.push(newSelect);
						this.setState({ values: [...this.state.values, ...valueToPush] });
					}
				});

				console.log(e.target.value, this.state.services)

			}
			return;
		}
		else {
			alert("select a patient")
		}
	}

	handleChange = (name, e) => {
		let value = e.target.value;
		if (name) {
			this.setState({ [name]: value })
		}
		else {
			let fullData = value.split("#")
			this.setState({ category: fullData[0], showServices: false });
			this.fetchServicesInACategory(fullData[1]);
		}
	};

	deleteService = (index) => {
		let serviceRequests = this.state.values;
		serviceRequests.splice(index, 1);
		console.log("the services remaining here is: ", serviceRequests);
		this.setState({ values: serviceRequests })
	}

	handleSubmit = async () => {
		let serviceId = [];
		let generatedBy = JSON.parse(localStorage.getItem("authenticatedUser"));
		generatedBy = generatedBy.id;

		let payload = {
			patientId: this.state.patient,
			generatedBy,
			description: this.state.description,
		}

		this.state.values.forEach(element => {
			serviceId.push(element.serviceId);
		});

		payload.serviceId = serviceId;
		const request = await fetch(`${apiUrl}/Admin/RequestServices`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});
		const res = await request.json();
		console.log(res);

	}

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
												<h4 className="text-center mt-0">Service request form</h4>

												<div className="form-group">
													<label>Patient</label>

													<select className="custom-picker rounded form-control"
														data-live-search="true"
														onChange={(e) => this.handleChange("patient", e)}
													>
														<option disabled selected="true" value="">
															{this.state.patients.length > 0
																? 'Select Patient'
																: 'Loading...'}
															{/** added loading this.state to the form */}
														</option>
														{
															this.state.patients.map((item, index) => {
																return <option data-tokens={`${item.firstName} ${item.lastName}`} key={index} value={item.id}>{`${item.firstName} ${item.lastName}`}</option>
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
															this.handleChange(null, e);
														}}
													>
														<option disabled selected="true" value="">
															{this.state.categories.length > 0
																? 'Select service category'
																: 'Loading...'}
															{/** added loading this.state to the form */}
														</option>
														{
															this.state.categories.length > 0 &&
															this.state.categories.map((category, i) => (
																<option key={i} value={category.name + "#" + category.id}>
																	{category.name}
																</option>
															))
														}
													</select>
												</div>

												<div className="form-group">
													<label>Comment / Description <span>(Optional)</span></label>
													<textarea placeholder="Enter comments" defaultValue={this.state.description} className="form-control" onChange={(e) => this.setState({ description: e.target.value })} />
												</div>

												<div className="form-group">
													<label>Services</label>

													{
														this.state.showServices ?
															<div>

																<select
																	className="rounded custom-picker-services form-control"
																	multiple="multiple"
																	onChange={(e) => {
																		this.handleSelect(e);
																	}}
																>
																	<option disabled value="">
																		{this.state.services.length > 0
																			? 'Select service'
																			: 'Loading...'}
																		{/** added loading this.state to the form */}
																	</option>
																	{
																		this.state.services.map((service, i) => (
																			<option key={i} value={service.id}>
																				{service.name}
																			</option>
																		))
																	}
																</select>
															</div>
															:
															<p>Please select a category to continue</p>
													}
												</div>
											</form>
										</div>
									</div>
								</div>

								{/* display service chosen */}
								<div className="col-12 col-md-7">
									<div className="card border-light">
										<div className="card-body">
											<header className="page-header justify-content-between d-flex align-items-center mb-2">
												<h4 className="page-title"> Selected services</h4>
											</header>
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
																	<tr key={index}>
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
																					onClick={() => this.deleteService(index)}
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
													<button onClick={this.handleSubmit} className="btn btn-primary">
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