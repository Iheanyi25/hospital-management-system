import React from "react";
import { Link } from "react-router-dom";

const NurseSidebar = () => {
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
                    <span className="link-icon icofont-dashboard-web" />{" "}
                    <span className="link-text">Dashboard</span>{" "}
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
                      <Link to="/NurseBookConsultation" className="item-link">
                        <span className="link-text">Book Consultation</span>
                      </Link>
                    </li>
                    <li className="menu-item">
                      <Link to="/NurseConsultations" className="item-link">
                        <span className="link-text">Manage Consultations</span>
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
                      <Link to="/NurseBookAppointment" className="item-link">
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
                  <span className="group-title">Profile Settings</span>
                </li>
                <li className="menu-item">
                  <Link className="item-link" to="/PharmacyProfile">
                    <span className="link-icon icofont-user-suited" />{" "}
                    <span className="link-text">My Profile</span>{" "}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          {/* <div className="add-patient">
            <Link to="/PharmacyRegisterDrug" className="btn btn-primary">
              <span className="btn-icon icofont-plus mr-2" /> Add Drugs
            </Link>
          </div> */}
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
};

export { NurseSidebar };
