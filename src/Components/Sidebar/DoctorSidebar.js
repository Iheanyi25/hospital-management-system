import React from 'react';
import { NavLink as Link } from 'react-router-dom';

class DoctorSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: process.env.REACT_APP_API_URL,
		};

		this.logOut = this.logOut.bind(this);
	}

	logOut(props) {
		this.props.history.push('/');
		localStorage.clear();
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
									src="./assets/img/logo.svg"
									width={147}
									height={33}
									className="logo-img"
									alt="hello"
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
										<Link className="item-link" to="/DoctorDashboard">
											<span className="link-icon icofont-thermometer-alt" />
											<span className="link-text">Dashboard</span>
										</Link>
									</li>

									<li className="menu-item">
										<Link className="item-link" to="/DoctorConsultationQueue">
											<span className="link-icon icofont-stethoscope-alt" />
											<span className="link-text">Consultation Queue</span>
										</Link>
									</li>

									<li className="menu-item">
										<Link className="item-link" to="/DoctorAppointments">
											<span className="link-icon icofont-stethoscope-alt" />
											<span className="link-text">My Appointments</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="/DoctorPatientsList">
											<span className="link-icon icofont-paralysis-disability" />
											<span className="link-text">Patients List</span>
										</Link>
									</li>

									<li className="menu-item">
										<span className="group-title">Profile Mgt</span>
									</li>

									<li className="menu-item has-sub">
										<Link to="#" className="item-link">
											<span className="link-text">Profile</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/DoctorProfile">
													<span className="link-text">View Profile</span>
												</Link>{' '}
											</li>
											<li className="menu-item">
												<Link className="item-link" to="/DoctorUpdateProfile">
													<span className="link-text">Update Profile</span>
												</Link>{' '}
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link to="#" className="item-link">
											<span className="link-text">Avaliability</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/DoctorAvaliablity">
													<span className="link-text">Set Avaliablity</span>
												</Link>{' '}
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div>
						<div className="add-patient">
							<button className="btn btn-primary" data-toggle="modal" data-target="#add-patient">
								<span className="btn-icon icofont-plus mr-2" /> Search Patient
							</button>
						</div>
						<div className="assistant-menu">
							<Link to="#" className="link">
								<span className="link-icon icofont-ui-settings" />
								Settings{' '}
							</Link>
							<Link to="#" className="link">
								<span className="link-icon icofont-question-square" />
								FAQ &amp; Support
							</Link>
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

export { DoctorSidebar };
