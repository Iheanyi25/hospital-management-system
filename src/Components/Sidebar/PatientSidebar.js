import React from 'react';
import { NavLink as Link } from 'react-router-dom';

class PatientSidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			endpoint: process.env.REACT_APP_API_URL,
		};

		this.logOut = this.logOut.bind(this);
	}

	logOut() {
		localStorage.clear();
		this.props.history.push('/');
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
										<span className="group-title">Medicine</span>
									</li>

									<li className="menu-item">
										<Link className="item-link" to="/PatientDashboard">
											<span className="link-icon icofont-thermometer-alt" />
											<span className="link-text">Dashboard</span>
										</Link>
									</li>

									<li className="menu-item">
										<Link className="item-link" to="/PatientConsultations">
											<span className="link-icon icofont-stethoscope-alt" />
											<span className="link-text">My Consultations </span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="/PatientAppointments">
											<span className="link-icon icofont-stethoscope-alt" />
											<span className="link-text">My Appointments </span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="/PatientDoctorList">
											<span className="link-icon icofont-doctor" />
											<span className="link-text">Doctors</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="/PatientAccount">
											<span className="link-icon icofont-doctor" />
											<span className="link-text">Accounts</span>
										</Link>
									</li>

									<li className="menu-item">
										<span className="group-title">Profile Mgt</span>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">My Profile</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/PatientProfile">
													<span className="link-text">View Profle</span>
												</Link>
											</li>
											
										</ul>
									</li>

									<li className="menu-item">
										<span className="group-title">Health Records Mgt</span>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">My Health Records</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/PatientPreConsultationHistory">
													<span className="link-text">View Pre-Consultations</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="/PatientClarkingHistory">
													<span className="link-text">View Clarking History</span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div>
						<div className="add-patient">
							<button className="btn btn-primary" data-toggle="modal" data-target="#search-doctor">
								<span className="btn-icon icofont-plus mr-2" /> Search Doctors
							</button>
						</div>
						<div className="assistant-menu">
							<Link className="link" to="#">
								<span className="link-icon icofont-ui-settings" />
								Settings{' '}
							</Link>
							<Link className="link" to="#">
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

export { PatientSidebar };
