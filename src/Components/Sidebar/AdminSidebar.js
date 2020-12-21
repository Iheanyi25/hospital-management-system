import React from "react";
import { Link } from "react-router-dom";

const $ = window.$;
class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_API_URL,
    };
  }
  componentWillMount() {
    // $('.navbar-toggle').click(function () {
    //   $('.app-navbar.vertical, .app-navbar.horizontal-vertical').toggleClass('opened');
    //   $('.content-overlay').toggleClass('show');
    // });
    // $('.content-overlay').click(function () {
    //   $('.app-navbar.vertical, .app-navbar.horizontal-vertical').removeClass('opened');
    //   $(this).removeClass('show');
    // });
    // console.log($);
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
                    <Link className="item-link" to="/AdminDashboard">
                      <span className="link-icon icofont-dashboard-web" />{" "}
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>

                  <li className="menu-item has-sub">
                    <div className="item-link cursor">
                      <span className="link-icon icofont-contact-add" />{" "}
                      <span className="link-text">Consultations</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminBookConsultation" className="item-link">
                          <span className="link-text">Book Consultation</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/AdminConsultations" className="item-link">
                          <span className="link-text">
                            Manage Consultations
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-ui-contact-list" />{" "}
                      <span className="link-text">Appointments</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminBookAppointment" className="item-link">
                          <span className="link-text">Book Appointment</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/AdminAppointments" className="item-link">
                          <span className="link-text">Manage Appointments</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item">
                    <Link className="item-link" to="/AdminManageAccounts">
                      <span className="link-icon icofont-users" />{" "}
                      <span className="link-text">Accounts</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <span className="group-title">User Management</span>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-patient-bed" />{" "}
                      <span className="link-text">Patients</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminAddPatients" className="item-link">
                          <span className="link-text">Register Patient</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="/AdminAllPatients">
                          <span className="link-text">Manage Patients</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">

                      <span className="link-icon icofont-doctor-alt" />{" "}
                      <span className="link-text">Doctors</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link
                          to="#"
                          className="item-link"
                          data-toggle="modal"
                          data-target="#add-user"
                        >
                          <span className="link-text">Register Doctors</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="/AdminAllDoctors">
                          <span className="link-text">Manage Doctors</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-drug-pack" />{" "}
                      <span className="link-text">Pharmacists</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link
                          to="#"
                          className="item-link"
                          data-toggle="modal"
                          data-target="#add-user"
                        >
                          <span className="link-text">
                            Register Pharmacists
                          </span>
                        </Link>
                      </li>
                      {/* <li className="menu-item">
												<div className="item-link">
													<span className="link-text">Manage Pharmacists</span>
												</Link>
											</li> */}
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-money" />{" "}
                      <span className="link-text">Accountants</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link
                          to="#"
                          className="item-link"
                          data-toggle="modal"
                          data-target="#add-user"
                        >
                          <span className="link-text">
                            Register Accountants
                          </span>
                        </Link>
                      </li>
                      {/* <li className="menu-item">
												<div className="item-link">
													<span className="link-text">Manage Accountants</span>
												</Link>
											</li> */}
                    </ul>
                  </li>

                  {/* <li className="menu-item has-sub">
										<div className="itemcursor -link">
											<span className="link-text">Other Admins</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link
													to="#"
													className="item-link"
													data-toggle="modal"
													data-target="#add-user"
												>
													<span className="link-text">Register Other Admins</span>
												</Link>
											</li>
											<li className="menu-item">
												<div className="item-link">
													<span className="link-text">Manage Other Admins</span>
												</Link>
											</li>
										</ul>
									</li> */}

                  <li className="menu-item">
                    <span className="group-title">Utility</span>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="item-link cursor">
                      <span className="link-icon icofont-architecture-alt" />{" "}
                      <span className="link-text">Service Requests</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminServiceRequests" className="item-link">
                          <span className="link-text">Request Service</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/AdminManageServiceRequests"
                          className="item-link"
                        >
                          <span className="link-text">Manage Services</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-brand-myspace" />{" "}
                      <span className="link-text">Services</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item has-sub">
                        <div className="cursor item-link">
                          <span className="link-text">Services</span>{" "}
                          <span className="link-caret icofont-thin-right" />
                        </div>
                        <ul className="sub">
                          <li className="menu-item">
                            <Link
                              to="/AdminCreateService"
                              className="item-link"
                            >
                              <span className="link-text">
                                Create a Service
                              </span>
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link
                              to="/AdminManageServices"
                              className="item-link"
                            >
                              <span className="link-text">View Services</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                      <li className="menu-item has-sub">
                        <div className="cursor item-link">
                          <span className="link-text">Service Categories</span>{" "}
                          <span className="link-caret icofont-thin-right" />
                        </div>
                        <ul className="sub">
                          <li className="menu-item">
                            <Link
                              to="/AdminServiceCategory"
                              className="item-link"
                            >
                              <span className="link-text">
                                Create a Category
                              </span>
                            </Link>
                          </li>
                          <li className="menu-item">
                            <Link
                              to="/AdminManageServiceCategory"
                              className="item-link"
                            >
                              <span className="link-text">View Categories</span>
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-package" />{" "}
                      <span className="link-text">Health Plans</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminCreateHealthPlan" className="item-link">
                          <span className="link-text">
                            Create a health plan
                          </span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/AdminManageHealthPlans"
                          className="item-link"
                        >
                          <span className="link-text">Manage Health Plans</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-hospital" />{" "}
                      <span className="link-text">Wards</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminCreateWard" className="item-link">
                          <span className="link-text">Create a ward</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/AdminManageWards" className="item-link">
                          <span className="link-text">Manage wards</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">PHARMACY</span>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-drug" />{" "}
                      <span className="link-text">Drug</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminRegisterDrug" className="item-link">
                          <span className="link-text">Register a drug</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/AdminViewDrugs" className="item-link">
                          <span className="link-text">View drugs</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-prescription" />{" "}
                      <span className="link-text">Prescription</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AdminManagePrescriptions" className="item-link">
                          <span className="link-text">Prescriptions</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/AdminManagePrescriptionInvoice" className="item-link">
                          <span className="link-text">Prescription Invoices</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="add-patient">
              <Link to="/AdminAddPatients" className="btn btn-primary">
                <span className="btn-icon icofont-plus mr-2" />
                Register Patient
              </Link>
              {/* <button className="btn btn-primary" data-toggle="modal" data-target="#add-patient">
								<span className="btn-icon icofont-plus mr-2" /> Register Patient
							</button> */}
            </div>

            <div className="assistant-menu">
              <Link className="link">
                <span className="link-icon icofont-ui-settings" />
                Settings{" "}
              </Link>
              <Link className="link">
                <span className="link-icon icofont-question-square" />
                FAQ &amp; Support
              </Link>
            </div>
            <div className="navbar-skeleton vertical">
              <div className="top-part">
                <div className="sk-logo bg animated-bg" />
                <div className="sk-menu">
                  <span className="sk-menu-item menu-header bg-1 animated-bg" />{" "}
                  <span className="sk-menu-item bg animated-bg w-75" />{" "}
                  <span className="sk-menu-item bg animated-bg w-80" />{" "}
                  <span className="sk-menu-item bg animated-bg w-50" />{" "}
                  <span className="sk-menu-item bg animated-bg w-75" />{" "}
                  <span className="sk-menu-item bg animated-bg w-50" />{" "}
                  <span className="sk-menu-item bg animated-bg w-60" />
                </div>
                <div className="sk-menu">
                  <span className="sk-menu-item menu-header bg-1 animated-bg" />{" "}
                  <span className="sk-menu-item bg animated-bg w-60" />{" "}
                  <span className="sk-menu-item bg animated-bg w-40" />{" "}
                  <span className="sk-menu-item bg animated-bg w-60" />{" "}
                  <span className="sk-menu-item bg animated-bg w-40" />{" "}
                  <span className="sk-menu-item bg animated-bg w-40" />{" "}
                  <span className="sk-menu-item bg animated-bg w-40" />{" "}
                  <span className="sk-menu-item bg animated-bg w-40" />
                </div>
                <div className="sk-menu">
                  <span className="sk-menu-item menu-header bg-1 animated-bg" />{" "}
                  <span className="sk-menu-item bg animated-bg w-60" />{" "}
                  <span className="sk-menu-item bg animated-bg w-50" />
                </div>
                <div className="sk-button animated-bg w-90" />
              </div>
              <div className="bottom-part">
                <div className="sk-menu">
                  <span className="sk-menu-item bg-1 animated-bg w-60" />{" "}
                  <span className="sk-menu-item bg-1 animated-bg w-80" />
                </div>
              </div>
              <div className="horizontal-menu">
                <span className="sk-menu-item bg animated-bg" />{" "}
                <span className="sk-menu-item bg animated-bg" />{" "}
                <span className="sk-menu-item bg animated-bg" />{" "}
                <span className="sk-menu-item bg animated-bg" />{" "}
                <span className="sk-menu-item bg animated-bg" />{" "}
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
