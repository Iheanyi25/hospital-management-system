import React from "react";
import { Link } from "react-router-dom";
import Admission from "./admin-sidebar-components/Admission";
import HealthInsurance from "./admin-sidebar-components/HealthInsurance";
import MyOffice from "./admin-sidebar-components/MyOffice";
import Pharmacy from "./admin-sidebar-components/Pharmacy";
import Reports from "./admin-sidebar-components/Reports";
import Surgery from "./admin-sidebar-components/Surgery";
import UserManagement from "./admin-sidebar-components/UserManagement";
import Utility from "./admin-sidebar-components/Utility";
class AdminSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_API_URL,
    };
  }

  render() {
    const { setUserType } = this.props;
    return (
      <>
        {/* Vertical navbar */}
        <div id="navbar2" className="app-navbar vertical">
          <div className="navbar-wrap " id="accordion">
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
                  <UserManagement setUserType={setUserType} />
                  <Utility />
                  <Reports />
                  <Pharmacy />
                  <Admission />
                  <Surgery />
                  <HealthInsurance />
                </ul>
              </nav>
            </div>
            <div className="add-patient">
              <Link to="/AdminAddPatients" className="btn btn-primary">
                <span className="btn-icon icofont-plus mr-2" />
                Register Patient
              </Link>
            </div>
            <AdminSideBarFooter />
            <AdminSideBarSkeleton />
          </div>
        </div>
        {/* end Vertical navbar */}
      </>
    );
  }
}

export { AdminSidebar };

const AdminSideBarSkeleton = () => {
  return (
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
  );
};

const AdminSideBarFooter = () => {
  return (
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
  );
};
