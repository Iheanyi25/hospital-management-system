import React from "react";
import { Link } from "react-router-dom";

class LabSidebar extends React.Component {
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
                    <Link className="item-link"to="/LabDashboard">
                      <span className="link-icon icofont-dashboard-web" />{" "}
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">Requests</span>
                  </li>

                  <li className="menu-item has-sub">
                    <div className="item-link cursor">
                      <span className="link-icon icofont-binoculars" />
                      <span className="link-text">Service Requests</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/LabServiceRequests" className="item-link">
                          <span className="link-text">Request Service</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/LabManageServiceRequests"
                          className="item-link"
                        >
                          <span className="link-text">Manage Services</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">Manage Services</span>
                  </li>
                  <li className="menu-item has-sub">
                    <Link className="item-link" to="#">
                      <span className="link-icon icofont-hard-disk" />
                      <span className="link-text">Service Category</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </Link>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/LabServiceCategory" className="item-link">
                          <span className="link-text">Create a Category</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          to="/LabManageServiceCategory"
                          className="item-link"
                        >
                          <span className="link-text">Manage Categories</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <Link className="item-link" to="#">
                      <span className="link-icon icofont-cloud" />
                      <span className="link-text">Services</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </Link>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link to="/LabCreateService" className="item-link">
                          <span className="link-text">Create a Service</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link to="/LabManageServices" className="item-link">
                          <span className="link-text">Manage Services</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <li className="menu-item">
                    <span className="group-title">Profile Mgt</span>
                  </li>

                  <li className="menu-item">
                    <Link className="item-link" to="#">
                      <span className="link-icon icofont-user-suited" />
                      <span className="link-text">Profile</span>{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="add-patient">
              <Link
                to="/LabManageServiceRequests"
                className="btn btn-primary"
              >
                <span className="btn-icon icofont-plus mr-2" /> Manage Requests
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

export { LabSidebar };
