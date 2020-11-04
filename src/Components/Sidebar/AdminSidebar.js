import React from 'react';
import { NavLink } from 'react-router-dom';

class AdminSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: process.env.REACT_APP_API_URL,
		};
	}

	render() {
		return (
			<>
				{/* Vertical navbar */}
				<div id="navbar2" className="app-navbar vertical">
					<div className="navbar-wrap">
						<button className="no-style navbar-toggle navbar-close icofont-close-line d-lg-none" />
						<div className="app-logo">
							<div className="logo-wrap">
								<img
									src="../../assets/img/logo.svg"
									width={147}
									height={33}
									className="logo-img"
									alt="Hello"
								/>
							</div>
						</div>
						<div className="main-menu">
							<nav className="main-menu-wrap">
								<ul className="menu-ul">
									<li className="menu-item">
										<span className="group-title">My Office</span>
									</li>
									<li className="menu-item">
										<NavLink className="item-link" to="/AdminDashboard">
											<span className="link-icon icofont-thermometer-alt" />{' '}
											<span className="link-text">Dashboard</span>
										</NavLink>
									</li>
									<li className="menu-item">
										<NavLink className="item-link" to="/AdminConsultationQueue">
											<span className="link-icon icofont-stethoscope-alt" />{' '}
											<span className="link-text">Consutation Queue</span>
										</NavLink>
									</li>
									<li className="menu-item">
										<NavLink className="item-link" to="/AdminAppointments">
											<span className="link-icon icofont-stethoscope-alt" />{' '}
											<span className="link-text">Appointments</span>
										</NavLink>
									</li>
									<li className="menu-item">
										<NavLink className="item-link" to="/AdminManageAccounts">
											<span className="link-icon icofont-user" />{' '}
											<span className="link-text">Accounts</span>
										</NavLink>
									</li>


									<li className="menu-item">
										<span className="group-title">User Management</span>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Patients</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink to="/AdminAddPatients" className="item-link">
													<span className="link-text">Register Patient</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink className="item-link" to="/AdminAllPatients">
													<span className="link-text">Manage Patients</span>
												</NavLink>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Doctors</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink
													to="#"
													className="item-link"
													data-toggle="modal"
													data-target="#add-user"
												>
													<span className="link-text">Register Doctors</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink className="item-link" to="/AdminAllDoctors">
													<span className="link-text">Manage Doctors</span>
												</NavLink>
											</li>
										</ul>
									</li>

									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Pharmacists</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink
													to="#"
													className="item-link"
													data-toggle="modal"
													data-target="#add-user"
												>
													<span className="link-text">Register Pharmacists</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="#" className="item-link">
													<span className="link-text">Manage Pharmacists</span>
												</NavLink>
											</li>
										</ul>
									</li>

									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Accountants</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink
													to="#"
													className="item-link"
													data-toggle="modal"
													data-target="#add-user"
												>
													<span className="link-text">Register Accountants</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="#" className="item-link">
													<span className="link-text">Manage Accountants</span>
												</NavLink>
											</li>
										</ul>
									</li>

									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Other Admins</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink
													to="#"
													className="item-link"
													data-toggle="modal"
													data-target="#add-user"
												>
													<span className="link-text">Register Other Admins</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="#" className="item-link">
													<span className="link-text">Manage Other Admins</span>
												</NavLink>
											</li>
										</ul>
									</li>
									<li className="menu-item">
										<span className="group-title">Utility</span>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Services</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item has-sub">
												<NavLink to="#" className="item-link">
													<span className="link-text">Services</span>{' '}
													<span className="link-caret icofont-thin-right" />
												</NavLink>
												<ul className="sub">
													<li className="menu-item">
														<NavLink to="/AdminCreateService" className="item-link">
															<span className="link-text">Create a Service</span>
														</NavLink>
													</li>
													<li className="menu-item">
														<NavLink to="/AdminManageServices" className="item-link">
															<span className="link-text">View Services</span>
														</NavLink>
													</li>
												</ul>
											</li>
											<li className="menu-item has-sub">
												<NavLink to="#" className="item-link">
													<span className="link-text">Service Categories</span>{' '}
													<span className="link-caret icofont-thin-right" />
												</NavLink>
												<ul className="sub">
													<li className="menu-item">
														<NavLink to="/AdminServiceCategory" className="item-link">
															<span className="link-text">Create a Category</span>
														</NavLink>
													</li>
													<li className="menu-item">
														<NavLink to="/AdminManageServiceCategory" className="item-link">
															<span className="link-text">View Categories</span>
														</NavLink>
													</li>
												</ul>
											</li>
											<li className="menu-item has-sub">
												<NavLink to="#" className="item-link">
													<span className="link-text">Service Requests</span>{' '}
													<span className="link-caret icofont-thin-right" />
												</NavLink>
												<ul className="sub">
													<li className="menu-item">
														<NavLink to="/AdminServiceRequests" className="item-link">
															<span className="link-text">Request a Service</span>
														</NavLink>
													</li>
													<li className="menu-item">
														<NavLink to="/AdminManageServiceRequests" className="item-link">
															<span className="link-text">View All Requests</span>
														</NavLink>
													</li>
												</ul>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Health Plans</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink to="/AdminCreateHealthPlan" className="item-link">
													<span className="link-text">Create a health plan</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="/AdminManageHealthPlans" className="item-link">
													<span className="link-text">Manage Health Plans</span>
												</NavLink>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">Wards</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink to="/AdminCreateWard" className="item-link">
													<span className="link-text">Create a ward</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="/AdminManageWards" className="item-link">
													<span className="link-text">Manage wards</span>
												</NavLink>
											</li>
										</ul>
									</li>
									<li className="menu-item">
										<span className="group-title">Schedules Mgt.</span>
									</li>
									<li className="menu-item has-sub">
										<NavLink to="#" className="item-link">
											<span className="link-text">My Schedule</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</NavLink>
										<ul className="sub">
											<li className="menu-item">
												<NavLink to="#" className="item-link">
													<span className="link-text">Create a Schedule</span>
												</NavLink>
											</li>
											<li className="menu-item">
												<NavLink to="#" className="item-link">
													<span className="link-text">Manage Schedules</span>
												</NavLink>
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div>
						<div className="add-patient">
							<NavLink to="/AdminAddPatients" className="btn btn-primary">
								<span className="btn-icon icofont-plus mr-2" />
								Register Patient
							</NavLink>
							{/* <button className="btn btn-primary" data-toggle="modal" data-target="#add-patient">
								<span className="btn-icon icofont-plus mr-2" /> Register Patient
							</button> */}
						</div>

						<div className="assistant-menu">
							<NavLink to="#" className="link">
								<span className="link-icon icofont-ui-settings" />
								Settings{' '}
							</NavLink>
							<NavLink to="#" className="link">
								<span className="link-icon icofont-question-square" />
								FAQ &amp; Support
							</NavLink>
						</div>
						<div className="navbar-skeleton vertical">
							<div className="top-part">
								<div className="sk-logo bg animated-bg" />
								<div className="sk-menu">
									<span className="sk-menu-item menu-header bg-1 animated-bg" />{' '}
									<span className="sk-menu-item bg animated-bg w-75" />{' '}
									<span className="sk-menu-item bg animated-bg w-80" />{' '}
									<span className="sk-menu-item bg animated-bg w-50" />{' '}
									<span className="sk-menu-item bg animated-bg w-75" />{' '}
									<span className="sk-menu-item bg animated-bg w-50" />{' '}
									<span className="sk-menu-item bg animated-bg w-60" />
								</div>
								<div className="sk-menu">
									<span className="sk-menu-item menu-header bg-1 animated-bg" />{' '}
									<span className="sk-menu-item bg animated-bg w-60" />{' '}
									<span className="sk-menu-item bg animated-bg w-40" />{' '}
									<span className="sk-menu-item bg animated-bg w-60" />{' '}
									<span className="sk-menu-item bg animated-bg w-40" />{' '}
									<span className="sk-menu-item bg animated-bg w-40" />{' '}
									<span className="sk-menu-item bg animated-bg w-40" />{' '}
									<span className="sk-menu-item bg animated-bg w-40" />
								</div>
								<div className="sk-menu">
									<span className="sk-menu-item menu-header bg-1 animated-bg" />{' '}
									<span className="sk-menu-item bg animated-bg w-60" />{' '}
									<span className="sk-menu-item bg animated-bg w-50" />
								</div>
								<div className="sk-button animated-bg w-90" />
							</div>
							<div className="bottom-part">
								<div className="sk-menu">
									<span className="sk-menu-item bg-1 animated-bg w-60" />{' '}
									<span className="sk-menu-item bg-1 animated-bg w-80" />
								</div>
							</div>
							<div className="horizontal-menu">
								<span className="sk-menu-item bg animated-bg" />{' '}
								<span className="sk-menu-item bg animated-bg" />{' '}
								<span className="sk-menu-item bg animated-bg" />{' '}
								<span className="sk-menu-item bg animated-bg" />{' '}
								<span className="sk-menu-item bg animated-bg" />{' '}
								<span className="sk-menu-item bg animated-bg" />
							</div>
						</div>
					</div>
				</div>
				{/* end Vertical navbar */}
			</>
		);
	}
}

export { AdminSidebar };
