import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Reports() {
  const { pathname } = useLocation();
  return (
    <div>
      <ReportsSection />
      <ServiceReports pathname={pathname} />
      <AccountReports pathname={pathname} />
    </div>
  );
}

const ReportsSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuReports"
        aria-expanded="false"
        aria-controls="collapseReports"
      >
        <span className="group-title">Reports</span>
      </div>
    </li>
  );
};

const ServiceReports = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuReports">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuServiceReports"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">Service reports</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuServiceReports"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AccountantAllTransactions">
            <span
              className={
                pathname === "/AccountantAllTransactions"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              All Transactions
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AccountantDrugReport" className="item-link">
            <span
              className={
                pathname === "/AccountantDrugReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Drug Report
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AccountantServiceRequestReport" className="item-link">
            <span
              className={
                pathname === "/AccountantServiceRequestReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              {" "}
              Service Request Report
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AccountantRegistrationReport">
            <span
              className={
                pathname === "/AccountantRegistrationReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Registration Report
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AccountantExpiredDrugsReport" className="item-link">
            <span
              className={
                pathname === "/AccountantExpiredDrugsReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Expired drugs report
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const AccountReports = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuReports">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuAccountReports"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">Account reports</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuAccountReports"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AccountantAllAccountTransactions">
            <span
              className={
                pathname === "/AccountantAllAccountTransactions"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              All Account Transactions
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

