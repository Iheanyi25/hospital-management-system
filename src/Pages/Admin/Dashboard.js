import React from 'react';
import { PageLoader } from '../../Components';

class Dashboard extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			apiUrl: process.env.REACT_APP_API_URL,
			doctorAppointments: [],
			doctorConsultations: []
		};

	}

	async componentDidMount() {

		const patientQueue = await fetch(`${this.state.apiUrl}/Admin/GetPatientQueue`);
		let data = await patientQueue.json()
		this.setState({ doctorConsultations: data.patientQueue });

		const doctorAppointments = await fetch(`${this.state.apiUrl}/Admin/GetDoctorAppointments`);
		let tempData = await doctorAppointments.json()
		this.setState({ doctorAppointments: tempData.result });

	}

	render() {

		return (

			<>

				<PageLoader />

				<main className="main-content">
					<div className="app-loader"><i className="icofont-spinner-alt-4 rotate" /></div>
					<div className="main-content-wrap">
						<div className="page-content">
							<div className="row">
								<div className="col col-12 col-md-6 col-xl-3">
									<div className="card animated fadeInUp delay-01s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-doctor">
													</div>
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1">My Doctors</h6>
													<div className="count text-primary fs-20">213</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-6 col-xl-3">
									<div className="card animated fadeInUp delay-02s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-wheelchair">
													</div>
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1">My patients</h6>
													<div className="count text-primary fs-20">104</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-6 col-xl-3">
									<div className="card animated fadeInUp delay-03s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-clip-board" />
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1">Appointments</h6>
													<div className="count text-primary fs-20">24</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-6 col-xl-3">
									<div className="card animated fadeInUp delay-04s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-users">
													</div>
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1 text-nowrap">All Users</h6>
													<div className="count text-primary fs-20">5238</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-6 col-xl-6">
									<div className="card animated fadeInUp delay-04s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-search-user">
													</div>
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1 text-nowrap">Total Lab Tests</h6>
													<div className="count text-primary fs-20">5238</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="col col-12 col-md-6 col-xl-6">
									<div className="card animated fadeInUp delay-04s bg-light">
										<div className="card-body">
											<div className="row align-items-center">
												<div className="col col-5">
													<div className="icon p-0 fs-48 text-primary opacity-50 icofont-pills">
													</div>
												</div>
												<div className="col col-7">
													<h6 className="mt-0 mb-1 text-nowrap">Total Drugs</h6>
													<div className="count text-primary fs-20">5238</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row">
								<div className="col col-md-6">

									<div className="card mb-0">
										<div className="card-header">Doctor Consultation Queue</div>
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-hover">
													<thead>
														<tr>
															<th className="text-nowrap" scope="col">Consultation Title</th>
															<th className="text-nowrap" scope="col">Patient Name</th>
															<th className="text-nowrap" scope="col">Patient Email</th>
															<th className="text-nowrap" scope="col">Doctor Name</th>
															<th className="text-nowrap" scope="col">Doctor Email</th>
															<th className="text-nowrap" scope="col">Date</th>
															<th className="text-nowrap" scope="col">Status</th>

															<th scope="col">Actions</th>
														</tr>
													</thead>
													<tbody>
														{this.state.doctorConsultations.map((consultation) => (
															<tr>
																<td>{consultation.patientQueue.consultationTitle}</td>
																<td><strong>{consultation.patient.lastName} {consultation.patient.firstName}</strong></td>
																<td>
																	<div className="d-flex align-items-center nowrap text-primary">
																		<span className="icofont-ui-email p-0 mr-2" />{consultation.patient.email}
																	</div>
																</td>
																<td>
																	<div className="text-muted text-nowrap">{consultation.doctor.lastName} {consultation.doctor.firstName}</div>
																</td>
																<td>
																	<div className="text-muted text-nowrap">{consultation.doctor.email}</div>
																</td>
																<td>
																	<div className="d-flex align-items-center nowrap text-primary">
																		<span className="icofont-ui-cell-phone p-0 mr-2" /> {consultation.patientQueue.dateOfConsultation}
																	</div>
																</td>

																<td>mumps</td>
																<td>
																	<div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
																		<button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
																	</div>
																</td>
															</tr>


														))}


													</tbody>
												</table>
											</div>
										</div>
									</div>

								</div>

								<div className="col col-md-6">

									<div className="card mb-0">
										<div className="card-header">Doctors Appointment List</div>
										<div className="card-body">
											<div className="table-responsive">
												<table className="table table-hover">
													<thead>
														<tr>

															<th className="text-nowrap" scope="col">Appointment Title</th>
															<th className="text-nowrap" scope="col">Patient Name</th>
															<th className="text-nowrap" scope="col">Patient Email</th>
															<th className="text-nowrap" scope="col">Doctor Name</th>
															<th className="text-nowrap" scope="col">Doctor Email</th>
															<th className="text-nowrap" scope="col">Date</th>
															<th className="text-nowrap" scope="col">Time</th>
															<th className="text-nowrap" scope="col">Status</th>

															<th scope="col">Actions</th>

														</tr>
													</thead>
													<tbody>
														{this.state.doctorAppointments.map((appointment) => (
															<tr>
																<td>{appointment.appointment.appointmentTitle}</td>
																<td><strong>{appointment.patient.lastName} {appointment.patient.firstName}</strong></td>
																<td>
																	<div className="d-flex align-items-center nowrap text-primary">
																		<span className="icofont-ui-email p-0 mr-2" />{appointment.patient.email}
																	</div>
																</td>
																<td>
																	<div className="text-muted text-nowrap">{appointment.doctor.lastName} {appointment.doctor.firstName}</div>
																</td>
																<td>
																	<div className="text-muted text-nowrap">{appointment.doctor.email}</div>
																</td>
																<td>
																	<div className="d-flex align-items-center nowrap text-primary">
																		<span className="icofont-ui-cell-phone p-0 mr-2" /> {appointment.appointment.appointmentDate}
																	</div>
																</td>

																<td>
																	<div className="d-flex align-items-center nowrap text-primary">
																		<span className="icofont-ui-cell-phone p-0 mr-2" /> {appointment.appointment.appointmentTime}
																	</div>
																</td>
																<td>
																	<div>Not Completed</div>
																</td>
																<td>
																	<div className="actions"><button className="btn btn-info btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-edit" /></button>
																		<button className="btn btn-error btn-sm btn-square rounded-pill"><span className="btn-icon icofont-ui-delete" /></button>
																	</div>
																</td>
															</tr>


														))}


													</tbody>
												</table>
											</div>
										</div>
									</div>

								</div>


							</div>



						</div>
					</div>
				</main>

			</>
		)
	}
}

export default Dashboard;
