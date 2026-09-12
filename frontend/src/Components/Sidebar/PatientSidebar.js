import React from "react";
import { NavLink as Link } from "react-router-dom";
import Profile from "./common-sidebar-components/Profile";
import HealthRecordsMGT from "./patient-sidebar-components/HealthRecords";
import Medicine from "./patient-sidebar-components/Medicine";
import Wallet from "./patient-sidebar-components/Wallet";

function PatientSidebar() {
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
                <Medicine />
                <Wallet />
                <Profile profileUrl="PatientProfile" />
				<HealthRecordsMGT />
              </ul>
            </nav>
          </div>
          <div className="add-patient">
            <button
              className="btn btn-primary"
              data-toggle="modal"
              data-target="#search-doctor"
            >
              <span className="btn-icon icofont-plus mr-2" /> Search Doctors
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
        </div>
      </div>
      {/* end Vertical navbar */}
    </>
  );
}

export { PatientSidebar };
