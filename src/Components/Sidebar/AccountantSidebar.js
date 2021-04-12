import React from "react";
import { Link } from "react-router-dom";
import Admission from "./accountant-sidebar-components/Admission";
import Invoices from "./accountant-sidebar-components/Invoices";
import MyOffice from "./accountant-sidebar-components/MyOffice";
import Profile from "./accountant-sidebar-components/Profile";
import Reports from "./accountant-sidebar-components/Report";

class AccountantSidebar extends React.Component {
  render() {
    return (
      <>
        {/* Vertical navbar */}
        <div id="navbar2" className="app-navbar vertical">
          <div className="navbar-wrap"id="accordion">
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
                <MyOffice />
                <Invoices />
                <Reports />
                <Admission/>
                <Profile />
                </ul>
              </nav>
            </div>
            <div className="add-patient">
              <Link to="/AccountantManageAccounts" className="btn btn-primary">
                <span className="btn-icon icofont-plus mr-2" /> Fund Accounts
              </Link>
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
}

export { AccountantSidebar };
