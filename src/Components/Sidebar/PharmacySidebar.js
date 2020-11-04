import React from 'react';
import { Link } from 'react-router-dom';

class PharmacySidebar extends React.Component {
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
										<Link className="item-link" to="/PharmacyDashboard">
											<span className="link-icon icofont-thermometer-alt" />{' '}
											<span className="link-text">Dashboard</span>{' '}
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="appointments.html">
											<span className="link-icon icofont-stethoscope-alt" />{' '}
											<span className="link-text">Patients</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="doctors.html">
											<span className="link-icon icofont-doctor" />{' '}
											<span className="link-text">Prescriptions</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="doctors.html">
											<span className="link-icon icofont-doctor" />{' '}
											<span className="link-text">Pharmasists</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="payments.html">
											<span className="link-icon icofont-pay" />{' '}
											<span className="link-text">Payments</span>
										</Link>
									</li>

									<li className="menu-item">
										<span className="group-title">Drug Management</span>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link">
											<span className="link-text">Drug Categories</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/PharmacyCreateDrugCategories">
													<span className="link-text">Add Categories</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link
													onClick={() =>
														(window.location.to = '/PharmacyManageDrugCategories')
													}
													className="item-link"
													to="/PharmacyManageDrugCategories"
												>
													<span className="link-text">Manage Categories</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Drug Sub Categories</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/PharmacyCreateDrugSubCategories">
													<span className="link-text">Add SubCategories</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link
													onClick={() =>
														(window.location.to = '/PharmacyManageDrugSubCategories')
													}
													className="item-link"
													to="/PharmacyManageDrugSubCategories"
												>
													<span className="link-text">Manage SubCategories</span>
												</Link>
											</li>
										</ul>
									</li>

									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Drugs</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="/PharmacyCreateDrug">
													<span className="link-text">Add Drugs</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="/PharmacyManageDrugs">
													<span className="link-text">Manage Drugs</span>
												</Link>
											</li>
										</ul>
									</li>

									<li className="menu-item">
										<span className="group-title">Profile Settings</span>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">My Profile</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="alerts.html">
													<span className="link-text">View Profile</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="autocompletes.html">
													<span className="link-text">Update Profile</span>
												</Link>
											</li>
										</ul>
									</li>
								</ul>
							</nav>
						</div>
						<div className="add-patient">
							<button className="btn btn-primary" data-toggle="modal" data-target="#add-drug">
								<span className="btn-icon icofont-plus mr-2" /> Add Drugs
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

export { PharmacySidebar };
