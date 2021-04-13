import React from "react";
import { NavLink as Link } from "react-router-dom";
import Availability from "./doctor-sidebar-components/Availability";
import MyOffice from "./doctor-sidebar-components/MyOffice";
import Patients from "./doctor-sidebar-components/Patients";
import Profile from "./common-sidebar-components/Profile";
import Admission from "./common-sidebar-components/Admission";

function DoctorSidebar ()  {
    return (
      <>
        {/* Vertical navbar */}
        <div id="navbar2" className="app-navbar vertical">
          <div className="navbar-wrap" id="accordion">
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
                  <MyOffice />
                  <Patients />
                  <Profile profileUrl="DoctorProfile" />
                  <Admission admissionUrl="DoctorManageAdmissions" />
                  <Availability />
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
          </div>
        </div>
      </>
    )
}

export { DoctorSidebar };
