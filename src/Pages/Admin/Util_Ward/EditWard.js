import React, { Component } from 'react'
import { PageLoader, TemplateSettings } from '../../../Components';
import { Success } from '../../../Components/Alerts';
import { isNotEmptyString, isValidPositiveInteger } from '../../../utils/validationUtils';

const apiUrl = process.env.REACT_APP_API_URL;

export default class EditWard extends Component {

	state = {
		name: "",
		capacity: "",
		description: "",
		formDone: true,
	};

	componentDidMount() {
		if (this.props.history.location.state) {
			const { name, capacity, description } = this.props.history.location.state;
			this.setState({ name, capacity, description })
		} else {
			return this.props.history.push("/AdminDashboard");
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextState !== this.state;
	  }
	
	  componentDidUpdate() {
		const { formDone } = this.state;
		if ( this.checkValidity() && !formDone) {
		  this.setState((state) => ({ ...state, formDone: true }));
		}
		else if(!this.checkValidity() && formDone){
		  this.setState((state) => ({ ...state, formDone: false }));
		}
	  }
	
	  checkValidity = () => {
		const { name, capacity, description } = this.state
		return (
		  isNotEmptyString(name) &&
		  isValidPositiveInteger(capacity) &&
		  isNotEmptyString(description)
		);
	  };	

	handleSubmit = async (e) => {
		e.preventDefault();
		const { name, description, capacity } = this.state;

		const data = {
			name,
			description,
			capacity: Number(capacity),

			id: this.props.location.state?.id
		};

		console.log({ data });
		if (
			name !== "" &&
			Component !== "" &&
			description !== ""
		) {
			try {
				let res = await fetch(`${apiUrl}/Admin/Ward/UpdateWard`, {
					headers: { "Content-Type": "application/json-patch+json" },
					method: "POST",
					body: JSON.stringify(data),
					// redirect: "follow",
				});

				if (res.status === 200) {
					this.setState({ success: true });
				}
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
					{this.state.success ? (
						<Success
							history={this.props.history}
							message="Well done, you successfully updated a category"
							nextRoute="/AdminManageWards"
						/>
					) : null}
					<div className="main-content-wrap w-75">
						<div className="page-content">
							<div className="row justify-content-center">
								<div className="col col-md-12">
									<div className="card border-light">
										<div className="card-body">
											<form className="mb-4 p-5 needs-validation" noValidate onSubmit={this.handleSubmit}>
												<h4 className="text-center">Edit a Ward</h4>
												<div className="form-group">
													<label>Name</label>
													<input
														className="form-control"
														type="text"
														tabIndex={-98}
														placeholder="Name of Ward"
														value={this.state.name}
														required
														onChange={(e) => this.setState({ name: e.target.value })}
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Please provide a valid name.</div>
												</div>
												<div className="form-group">
													<label>Capacity</label>
													<input
														className="form-control"
														type="number"
														tabIndex={-98}
														value={this.state.capacity}
														onChange={(e) => this.setState({ capacity: e.target.value })}
														placeholder="Room capacity"
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Oops! should be numbers only.</div>
												</div>
												<div className="form-group">
													<label>Description</label>
													<textarea
														className="form-control"
														type="text"
														tabIndex={-98}
														value={this.state.description}
														onChange={(e) => this.setState({ description: e.target.value })}
														placeholder="Ward Description"
														required
													/>
													<div className="valid-feedback">Looks good!</div>
													<div className="invalid-feedback">Oops! should be numbers only.</div>
												</div>
												<div className="row">
													<div className="col"></div>
													<div className="col text-right">
														<button type="submit" className="btn btn-primary" disabled={!this.state.formDone}>
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
