import React from "react";
import Header from "../../Components/Header/PharmacyHeader";
import Sidebar from "../../Components/Sidebar/PharmacySidebar";
import PageLoader from "../../Components/PageLoader";
import Footer from "../../Components/Footer";
import AddDrug from "../../Components/Pharmacy/AddDrug";
import TemplateSettings from "../../Components/TemplateSettings";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class ManageDrugs extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drugs: [],
			apiUrl: process.env.REACT_APP_API_URL,
		};
	}

	async componentDidMount() {
		this.getAllDrugs().then(() => this.sync());
	}

	async getAllDrugs() {
		const { apiUrl } = this.state;
		const response = await fetch(`${apiUrl}/Pharmacy/GetAllDrugs`);
		const data = await response.json();
		this.setState({ drugs: data });
	}

	sync() {
		this.$el = $(this.el);
		this.$el.DataTable();
	}

	deleteDrug = async (id) => {
		try {
			const { url } = this.state;
			var Id = id;
			const request = await fetch(`${url}/Pharmacy/DeleteDrug?Id=${Id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!request.ok) {
				const error = await request.json();
				throw Error(error.message);
			}

			//Drug successfully deleted
			const response = await fetch(`${url}/Pharmacy/GetAllDrugs`);
			const data1 = await response.json();
			console.log("i work");
			setTimeout(
				() =>
					this.setState({
						drugs: data1,
					}),
				300
			);
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		const { drugs } = this.state;
		return (
			<>
				<PageLoader />
				<div className="page-box">
					<div className="app-container">
						{/* Horizontal navbar---Header */}
						<Header></Header>

						{/* Vertical navbar */}
						<Sidebar></Sidebar>

						<main className="main-content">
							<div className="app-loader">
								<i className="icofont-spinner-alt-4 rotate" />
							</div>

							<div className="main-content-wrap">
								<header className="page-header">
									<h4 className="page-title">Manage Drugs</h4>
								</header>
								<div className="page-content">
									<div className="card-body"></div>
								</div>
								<div className="page-content">
									<div className="card mb-0">
										<div className="card-body">
											<div className="table-responsive">
												<table
													ref={(el) => (this.el = el)}
													class="table"
													data-columns='[
														{ "data": "name" },
														{ "data": "description" },
														{ "data": "price" },
														{ "data": "actions" }
													]'
													data-paging="true"
													data-info="true"
												>
													<thead>
														<tr>
															<th>Name</th>
															<th>Description</th>
															<th>Price</th>
															<th>Actions</th>
														</tr>
													</thead>
													<tbody>
														{
															drugs
																? drugs.map((drug) => (
																	<tr>
																		<td>{drug.name}</td>
																		<td>{drug.description}</td>
																		<td>{drug.price}</td>

																		<td>
																			<div className="actions">
																				<button className="btn btn-info btn-sm btn-square rounded-pill">
																					<span className="btn-icon icofont-ui-edit" />
																				</button>

																				<button
																					onClick={() =>
																						this.deleteDrug(drug.id)
																					}
																					className="btn btn-error btn-sm btn-square rounded-pill"
																				>
																					<span className="btn-icon icofont-ui-delete" />
																				</button>
																			</div>
																		</td>
																	</tr>
																))
																: null
														}
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="add-action-box">
										<button
											className="btn btn-primary btn-lg btn-square rounded-pill"
											data-toggle="modal"
											data-target="#add-appointment"
										>
											<span className="btn-icon icofont-stethoscope-alt" />
										</button>
									</div>
								</div>
							</div>
						</main>

						{/* Add Drug Modal */}
						<AddDrug />
						{/* footer here */}
						<Footer />
					</div>
				</div>
				{/* template setting */}
				<TemplateSettings />
			</>
		);
	}
}

export default ManageDrugs;
