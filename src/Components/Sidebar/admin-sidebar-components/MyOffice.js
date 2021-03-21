import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyOffice() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <Consultation pathname={pathname} />
      <Appointments pathname={pathname} />
      <Account pathname={pathname} />
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
        <Link className="item-link" to="/AdminDashboard">
          <span className="link-icon icofont-dashboard-web" />{" "}
          <span
            className={
              pathname === "/AdminDashboard"
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

const Consultation = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuConsultation"
          aria-controls="collapseConsultation"
        >
          <span className="link-icon icofont-contact-add" />{" "}
          <span className="link-text">Consultations</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuConsultation"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminBookConsultation" className="item-link">
            <span
              className={
                pathname === "/AdminBookConsultation"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Book Consultation
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminConsultations">
            <span
              className={
                pathname === "/AdminConsultations"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Consultations
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
const Appointments = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  mark-active"
          data-toggle="collapse"
          data-target="#submenuAppointment"
          aria-controls="collapseAppointment"
        >
          <span className="link-icon icofont-ui-contact-list" />{" "}
          <span className="link-text">Appointments</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuAppointment"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminBookAppointment" className="item-link">
            <span
              className={
                pathname === "/AdminBookAppointment"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Book Appointment
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAppointments">
            <span className={
                pathname === "/AdminAppointments"
                  ? "link-text text-primary"
                  : "link-text"
              }>Manage Appointments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
const Account = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/AdminManageAccounts">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminManageAccounts"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Accounts
          </span>
        </Link>
      </li>
    </div>
  );
};
