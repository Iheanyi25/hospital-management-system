import React from "react";
import { Link } from "react-router-dom";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_API_URL,
    };

    this.logOut = this.logOut.bind(this);
  }

  logOut(props) {
    this.props.history.push("/");
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
                    <Link
                      onClick={() => (window.location.href = "/AdminDashboard")}
                      className="item-link"
                      to="/AdminDashboard"
                    >
                      <span className="link-icon icofont-thermometer-alt" />{" "}
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      onClick={() =>
                        (window.location.href = "/AdminConsultationQueue")
                      }
                      className="item-link"
                      to="/AdminConsultationQueue"
                    >
                      <span className="link-icon icofont-stethoscope-alt" />{" "}
                      <span className="link-text">Consutation Queue</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      onClick={() =>
                        (window.location.href = "/AdminAppointments")
                      }
                      className="item-link"
                      to="/AdminAppointments"
                    >
                      <span className="link-icon icofont-stethoscope-alt" />{" "}
                      <span className="link-text">Appointments</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      onClick={() =>
                        (window.location.href = "/AdminAllDoctors")
                      }
                      className="item-link"
                      to="/AdminAllDoctors"
                    >
                      <span className="link-icon icofont-doctor" />{" "}
                      <span className="link-text">Doctors</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      onClick={() =>
                        (window.location.href = "/AdminAllPatients")
                      }
                      className="item-link"
                      to="/AdminAllPatients"
                    >
                      <span className="link-icon icofont-paralysis-disability" />{" "}
                      <span className="link-text">Patients</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <span className="group-title">User Management</span>
                  </li>
                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">Patients</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                        <a
                          className="item-link"
                          data-toggle="modal"
                          data-target="#add-patient"
                        >
                          <span className="link-text">Register Patient</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <Link
                          onClick={() =>
                            (window.location.href = "/AdminAllPatients")
                          }
                          className="item-link"
                          to="/AdminAllPatients"
                        >
                          <span className="link-text">Manage Patients</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">Doctors</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                        <a className="item-link" data-toggle="modal" data-target="#add-user">
                          <span className="link-text">Register Doctors</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <Link
                          onClick={() =>
                            (window.location.href = "/AdminAllDoctors")
                          }
                          className="item-link"
                          to="/AdminAllDoctors"
                        >
                          <span className="link-text">Manage Doctors</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">Pharmacists</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                        <a className="item-link" data-toggle="modal" data-target="#add-user">
                          <span className="link-text">
                            Register Pharmacists
                          </span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="item-link" href="data-tables.html">
                          <span className="link-text">Manage Pharmacists</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">Accountants</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                      <a className="item-link" data-toggle="modal" data-target="#add-user">
                          <span className="link-text">
                            Register Accountants
                          </span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="item-link" href="data-tables.html">
                          <span className="link-text">Manage Accountants</span>
                        </a>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">Other Admins</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                        <a className="item-link" data-toggle="modal" data-target="#add-user">
                          <span className="link-text">
                            Register Other Admins
                          </span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="item-link" href="data-tables.html">
                          <span className="link-text">Manage Other Admins</span>
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">Schedules Mgt.</span>
                  </li>
                  <li className="menu-item has-sub">
                    <a className="item-link" href="#">
                      <span className="link-text">My Schedule</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </a>
                    <ul className="sub">
                      <li className="menu-item">
                        <a className="item-link" href="alerts.html">
                          <span className="link-text">Create a Schedule</span>
                        </a>
                      </li>
                      <li className="menu-item">
                        <a className="item-link" href="autocompletes.html">
                          <span className="link-text">Manage Schedules</span>
                        </a>
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
                <span className="btn-icon icofont-plus mr-2" /> Register Patient
              </button>
            </div>
            
            <div className="assistant-menu">
              <a className="link" href="#">
                <span className="link-icon icofont-ui-settings" />
                Settings{" "}
              </a>
              <a className="link" href="#">
                <span className="link-icon icofont-question-square" />
                FAQ &amp; Support
              </a>
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

export default Sidebar;
