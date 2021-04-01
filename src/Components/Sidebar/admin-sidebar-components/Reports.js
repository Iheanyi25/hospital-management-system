import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Reports() {
  const { pathname } = useLocation();
  return (
    <div>
      <ReportsSection />
      <ServiceReports pathname={pathname} />
      <AccountReports pathname={pathname} />
      <HMOReports pathname={pathname} />
      <NHISReports pathname={pathname} />
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
          <Link className="item-link" to="/AdminAllTransactions">
            <span
              className={
                pathname === "/AdminAllTransactions"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              All Transactions
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminDrugReport" className="item-link">
            <span
              className={
                pathname === "/AdminDrugReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Drug Report
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminServiceRequestReport" className="item-link">
            <span
              className={
                pathname === "/AdminServiceRequestReport"
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
          <Link className="item-link" to="/AdminRegistrationReport">
            <span
              className={
                pathname === "/AdminRegistrationReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Registration Report
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminExpiredDrugsReport" className="item-link">
            <span
              className={
                pathname === "/AdminExpiredDrugsReport"
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
          <Link className="item-link" to="/AdminAllAccountTransactions">
            <span
              className={
                pathname === "/AdminAllAccountTransactions"
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

const HMOReports = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuReports">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuHMOReports"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">HMO reports</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuHMOReports"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminHMOPatientInvoiceReport">
            <span
              className={
                pathname === "/AdminHMOPatientInvoiceReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Patient Reports
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminHMODrugInvoiceReport" className="item-link">
            <span
              className={
                pathname === "/AdminHMODrugInvoiceReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Drug Reports
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminHMOServiceInvoiceReport" className="item-link">
            <span
              className={
                pathname === "/AdminHMOServiceInvoiceReport"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              {" "}
              Service Reports
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const NHISReports = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuReports">
      <li className="menu-item">
        <Link className="item-link" to="/AdminNHISReport">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminNHISReport"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            NHIS Report
          </span>
        </Link>
      </li>
    </div>
  );
};
