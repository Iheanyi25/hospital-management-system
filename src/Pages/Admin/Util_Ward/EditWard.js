import React, { Component } from 'react'
import { PageLoader, TemplateSettings } from '../../../Components';

export default class EditWard extends Component {

	state = {
		name: "",
		capacity: ""
	};

	componentDidMount() {
		if (this.props.history.location.state) {
			const { name, capacity } = this.props.history.location.state;
			console.log(this.props.history.location.state);
			this.setState({ name, capacity })
		} else {
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
					<div className="main-content-wrap w-50">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									<div class="card border-light">
										<div class="card-body">
											<form className="mb-4 p-5">
												<h4 className="text-center">Edit a Ward</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of Ward"
														defaultValue={this.state.name}
													/>
												</div>
												<div className="form-group">
													<label>Capacity</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														defaultValue={this.state.capacity}
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
		)
	}
}
