import React from "react";
import { NavLink as Link } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
class DoctorSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
      doctorAvailability: false,
    };

    this.logOut = this.logOut.bind(this);
  }

  async componentDidMount() {
    const response = await fetch(
      `${apiUrl}/Doctor/GetDoctorAvailability?DoctorId=${this.state.doctorId}`
    );

    const data = await response.json();

    this.setState({ doctorAvailability: data.isAvailable });
  }

  async fetchDoctorAvailability() {
    const response = await fetch(
      `${apiUrl}/Doctor/GetDoctorAvailability?DoctorId=${this.state.doctorId}`
    );

    const data = await response.json();
    this.setState({ doctorAvailability: data.isAvailable });
  }

  async setAvailability(e) {
    e.preventDefault();

    const { doctorId } = this.state;

    try {
      const request = await fetch(
        `${apiUrl}/Doctor/UpdateDoctorAvailability?DoctorId=${doctorId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      const data = await request.json();

      this.setState({
        showSuccessMessage: true,
        successMessage: data.message,
        consultationTitle: "",
        reasonForConsultation: "",
      });
      this.fetchDoctorAvailability();
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  logOut(props) {
    this.props.history.push("/");
    localStorage.clear();
  }

  render() {
    const { doctorAvailability } = this.state;

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
                    <Link className="item-link" to="/DoctorDashboard">
                      <span className="link-icon icofont-dashboard-web" />
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link className="item-link" to="/DoctorConsultations">
                      <span className="link-icon icofont-stethoscope-alt" />
                      <span className="link-text">Consultations</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <Link className="item-link" to="/DoctorAppointments">
                      <span className="link-icon icofont-notepad" />
                      <span className="link-text">Appointments</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">Patients</span>
                  </li>
                  <li className="menu-item">
                    <Link className="item-link" to="/DoctorPatientsList">
                      <span className="link-icon icofont-paralysis-disability" />
                      <span className="link-text">Patients</span>
                    </Link>
                  </li>

                  <li className="menu-item">
                    <span className="group-title">Profile</span>
                  </li>

                  <li className="menu-item">
                    <Link to="/DoctorProfile" className="item-link">
                      <span className="link-icon icon sli-user mr-2" />
                      <span className="link-text">Profile</span>{" "}
                    </Link>
                    <Link to="/myPatients" className="item-link">
                      <span className="link-icon icon sli-user mr-2" />
                      <span className="link-text">My Patients</span>{" "}
                    </Link>
                  </li>

                  <li className="menu-item">
                    <span className="group-title">Availability</span>
                  </li>
                  <li className="menu-item">
                    <div className="form-group text-center">
                      <div className="custom-control custom-switch mb-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id="control2"
                          checked={doctorAvailability ? true : false}
                          onClick={(e) => this.setAvailability(e)}
                        />{" "}
                        <label className="custom-control-label" for="control2">
                          {doctorAvailability ? "Available" : "Not Available"}
                        </label>
                      </div>
                    </div>

                  </li>
                </ul>
              </nav>
            </div>


            <div className="add-patient">
              <Link to="/DoctorConsultations" className="btn btn-primary">
                <span className="btn-icon icofont-plus mr-2" /> My consultations
              </Link>
            </div>
            <div className="assistant-menu">
              <Link to="#" className="link">
                <span className="link-icon icofont-ui-settings" />
                Settings{" "}
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

export { DoctorSidebar };
