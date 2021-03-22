import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Pharmacy() {
  const { pathname } = useLocation();
  return (
    <div>
      <PharmacySection />
      <Drugs pathname={pathname} />
      <Prescription pathname={pathname} />
    </div>
  );
}

const PharmacySection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuPharmacy"
        aria-expanded="false"
        aria-controls="collapsePharmacy"
      >
        <span className="group-title">Pharmacy</span>
      </div>
    </li>
  );
};

const Drugs = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuPharmacy">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuDrugs"
        >
          <span className="link-icon icofont-drug" />{" "}
          <span className="link-text">Drug</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuDrugs"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminRegisterDrug" className="item-link">
            <span
              className={
                pathname === "/AdminRegisterDrug"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Register a Drug
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminViewDrugs">
            <span
              className={
                pathname === "/AdminViewDrugs"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              View Drugs
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Prescription = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuPharmacy">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuPrescription"
        >
          <span className="link-icon icofont-prescription" />{" "}
          <span className="link-text">Prescription</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuPrescription"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminManagePrescriptions" className="item-link">
            <span
              className={
                pathname === "/AdminManagePrescriptions"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Prescriptions
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManagePrescriptionInvoice">
            <span
              className={
                pathname === "/AdminManagePrescriptionInvoice"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Prescription Invoices
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
