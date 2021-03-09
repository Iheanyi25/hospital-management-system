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
                      <span className="link-icon icofont-dashboard-web" />{" "}
                      <span className="link-text">Dashboard</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link className="item-link" to="/AccountantManageAccounts">
                      <span className="link-icon icofont-users" />{" "}
                      <span className="link-text">Accounts</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">INVOICES</span>
                  </li>
                  <li className="menu-item">
                    <Link
                      className="item-link"
                      to="/AccountRegistrationInvoice"
                    >
                      <span className="link-icon icofont-copy-invert" />{" "}
                      <span className="link-text">Registration Invoices</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      className="item-link"
                      to="/AccountManageServiceRequest"
                    >
                      <span className="link-icon icofont-credit-card" />{" "}
                      <span className="link-text">Service Invoices</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <Link
                      className="item-link"
                      to="/AccountManagePrescriptionInvoice"
                    >
                      <span className="link-icon icofont-copy-invert" />{" "}
                      <span className="link-text">Prescription Invoices</span>
                    </Link>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">REPORTS</span>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-hospital" />{" "}
                      <span className="link-text">Service reports</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link className="item-link" to="/AccountantAllTransactions">
                          <span className="link-text">All Transactions</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link className="item-link" to="/AccountantDrugReport">
                          <span className="link-text">Drug Report</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          className="item-link"
                          to="/AccountantServiceRequestReport"
                        >
                          <span className="link-text">
                            Service Request Report
                          </span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          className="item-link"
                          to="/AccountantRegistrationReport"
                        >
                          <span className="link-text">Registration Report</span>
                        </Link>
                      </li>
                      <li className="menu-item">
                        <Link
                          className="item-link"
                          to="/AccountantExpiredDrugsReport"
                        >
                          <span className="link-text">
                            Expired drugs report
                          </span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item has-sub">
                    <div className="cursor item-link">
                      <span className="link-icon icofont-hospital" />{" "}
                      <span className="link-text">Account reports</span>{" "}
                      <span className="link-caret icofont-thin-right" />
                    </div>
                    <ul className="sub">
                      <li className="menu-item">
                        <Link
                          className="item-link"
                          to="/AccountantAllAccountTransactions"
                        >
                          <span className="link-text">All Transactions</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="menu-item">
                    <span className="group-title">PROFILE</span>
                  </li>
                  <li className="menu-item">
                    <Link className="item-link" to="/AccountantProfile">
                      <span className="link-icon icofont-user-suited" />{" "}
                      <span className="link-text">My Profile</span>
                    </Link>
                  </li>
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
