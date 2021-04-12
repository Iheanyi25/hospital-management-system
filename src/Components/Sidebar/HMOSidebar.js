import React from "react";
import { Link } from "react-router-dom";
import MyOffice from "./hmo-sidebar-components/MyOffice";
import Profile from "./hmo-sidebar-components/Profile";

const HMOSidebar = () => {
  return (
    <>
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
                <Profile />
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

        </div>
      </div>
      {/* end Vertical navbar */}
    </>
  );
};

export { HMOSidebar };
