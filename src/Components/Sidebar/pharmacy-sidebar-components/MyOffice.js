import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyOffice() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <Prescription pathname={pathname} />
    </div>
  );
}
const MyOfficeSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuMyOffice"
        aria-expanded="false"
        aria-controls="collapseMyOffice"
      >
        <span className="group-title">my office</span>
      </div>
    </li>
  );
};

const Dashboard = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/PharmacyDashboard">
          <span className="link-icon icofont-dashboard-web" />{" "}
          <span
            className={
              pathname === "/PharmacyDashboard"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Dashboard
          </span>
        </Link>
      </li>
    </div>
  );
};

const Prescription = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuPrescription"
          aria-controls="collapsePrescription"
        >
          <span className="link-icon icofont-list" />{" "}
          <span className="link-text">Prescriptions</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuPrescription"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/PharmacyManagePrescriptionInvoice" className="item-link">
            <span
              className={
                pathname === "/PharmacyManagePrescriptionInvoice"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
                Prescription
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminPrescriptions">
            <span
              className={
                pathname === "/AdminPrescriptions"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
               Prescriptions Invoices
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

