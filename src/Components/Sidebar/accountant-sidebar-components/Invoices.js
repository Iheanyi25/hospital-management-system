import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Invoices() {
  const { pathname } = useLocation();
  return (
    <div>
      <InvoicesSection />
      <RegistrationInvoices pathname={pathname} />
      <ServiceInvoices pathname={pathname} />
      <PrescriptionInvoices pathname={pathname} />
    </div>
  );
}
const InvoicesSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuInvoice"
        aria-expanded="false"
        aria-controls="collapseMyInvoice"
      >
        <span className="group-title">INVOICES</span>
      </div>
    </li>
  );
};

const RegistrationInvoices = ({ pathname }) => {

  return (
    <div className="collapse" id="subMenuInvoice">
      <li className="menu-item">
        <Link className="item-link" to="/AccountRegistrationInvoice">
          <span className="link-icon icofont-copy-invert" />{" "}
          <span
            className={
              pathname === "/AccountRegistrationInvoice"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Registration Invoices
          </span>
        </Link>
      </li>
    </div>
  );
};

const ServiceInvoices = ({ pathname }) => {

  return (
    <div className="collapse" id="subMenuInvoice">
      <li className="menu-item">
        <Link className="item-link" to="/AccountManageServiceRequest">
          <span className="link-icon icofont-credit-card" />{" "}
          <span
            className={
              pathname === "/AccountManageServiceRequest"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Service Invoices
          </span>
        </Link>
      </li>
    </div>
  );
};

const PrescriptionInvoices = ({ pathname }) => {

    return (
      <div className="collapse" id="subMenuInvoice">
        <li className="menu-item">
          <Link className="item-link" to="/AccountManagePrescriptionInvoice">
            <span className="link-icon  icofont-copy-invert" />{" "}
            <span
              className={
                pathname === "/AccountManagePrescriptionInvoice"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Prescription Invoices
            </span>
          </Link>
        </li>
      </div>
    );
  };