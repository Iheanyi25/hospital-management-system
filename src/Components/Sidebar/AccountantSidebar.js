import React from "react";
import { Link } from "react-router-dom";

class AccountantSidebar extends React.Component {
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
                  src="../../../assets/img/logo.svg"
                  alt=""
                  width={147}
                  height={33}
                  className="logo-img"
                />
              </div>
            </div>
            <div className="main-menu">
              <nav className="main-menu-wrap">
                <ul className="menu-ul">
                  <li className="menu-item">
                    <span className="group-title">MY OFFICE</span>
                  </li>
                  <li className="menu-item">
                    <Link className="item-link" to="/AccountantDashboard">
                      <span className="link-icon icofont-thermometer-alt" />{" "}
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      className="item-link"
                      to="/AccountantManageAccounts"
                    >
                      <span className="link-icon icofont-pay" />{" "}
                      <span className="link-text">Accounts</span>
                    </Link>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="item-link cursor">
                      <span className="link-icon icofont-pay" />{" "}
                      <span className="link-text">Invoices</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/AccountManageServiceRequest" className="item-link">
                          <span className="link-text">Service Invoices</span>
                        </Link>
                      </li>
                      {/* <li className="menu-item">
                        <Link to="/AdminConsultations" className="item-link">
                          <span className="link-text">
                            Manage Consultations
                          </span>
                        </Link>
                      </li> */}
                    </ul>
                  </li>
                  {/* <li className="menu-item">
										<Link className="item-link" to="#">
											<span className="link-icon icofont-doctor" />{' '}
											<span className="link-text">Doctors</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="#">
											<span className="link-icon icofont-nurse" />{' '}
											<span className="link-text">Departments</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="#">
											<span className="link-icon icofont-paralysis-disability" />{' '}
											<span className="link-text">Patients</span>
										</Link>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="#">
											<span className="link-icon icofont-pay" />{' '}
											<span className="link-text">Payments</span>
										</Link>
									</li> */}
                  <li className="menu-item">
                    <span className="group-title">UI Kit</span>
                  </li>
                  {/* <li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Components</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Alerts</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Autocompletes</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Badges</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Buttons</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Cards</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Checkboxes</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Contacts</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Inputs</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Modal windows</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Radio buttons</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Ratings</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Selects</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Switchers</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Textareas</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Vertical timeline</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Icons</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Simple line icons</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Icofont icons</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item">
										<Link className="item-link" to="#">
											<span className="link-text">Typography</span>
										</Link>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Tables</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Bootstrap tables</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Data tables</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Forms</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Elements</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Layout</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Validation</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Charts</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Chart.js</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Morris.js</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Echarts</span>
												</Link>
											</li>
										</ul>
									</li>
									<li className="menu-item has-sub">
										<Link className="item-link" to="#">
											<span className="link-text">Maps</span>{' '}
											<span className="link-caret icofont-thin-right" />
										</Link>
										<ul className="sub">
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Google map</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Leaflet map</span>
												</Link>
											</li>
											<li className="menu-item">
												<Link className="item-link" to="#">
													<span className="link-text">Echarts map</span>
												</Link>
											</li>
										</ul>
									</li> */}
                  <li className="menu-item">
                    <span className="group-title">Apps</span>
                  </li>
                  <li className="menu-item has-sub">
                    <Link className="item-link" to="#">
                      <span className="link-text">Service pages</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </Link>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Invoices</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Pricing</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Edit account</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">User profile</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Events timeline</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <Link className="item-link" to="#">
                      <span className="link-text">Sessions</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </Link>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Sign in</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">Sign up</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">404</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="#">
                          <span className="link-text">500</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="add-patient">
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#add-patient"
              >
                <span className="btn-icon icofont-plus mr-2" /> Add Patient
              </button>
            </div>
            <div className="assistant-menu">
              <Link className="link" to="#">
                <span className="link-icon icofont-ui-settings" />
                Settings{" "}
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

export { AccountantSidebar };
