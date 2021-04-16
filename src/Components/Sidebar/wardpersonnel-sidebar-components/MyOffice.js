import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyOffice() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <Wards pathname={pathname} />
      <RefferedPatients pathname={pathname} />
      <ManageAdmissions pathname={pathname} />
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

const Wards = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuWard"
          aria-controls="collapseWard"
        >
          <span className="link-icon icofont-contact-add" />{" "}
          <span className="link-text">Wards</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuWard"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/WardCreateWard" className="item-link">
            <span
              className={
                pathname === "/WardCreateWard"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
               Create Ward
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/WardManageWards">
            <span
              className={
                pathname === "/WardManageWards"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
               Manage Wards
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const RefferedPatients = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/WardViewReferredPatients">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/WardViewReferredPatients"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Referred Patients
          </span>
        </Link>
      </li>
    </div>
  );
};

const ManageAdmissions = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/WardManageAdmissions">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/WardManageAdmissions"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Manage Admissions
          </span>
        </Link>
      </li>
    </div>
  );
};