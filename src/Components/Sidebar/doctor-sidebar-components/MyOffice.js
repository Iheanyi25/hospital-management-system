import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyOffice() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <Consultations pathname={pathname} />
      <Appointments pathname={pathname} />
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
        <Link className="item-link" to="/DoctorDashboard">
          <span className="link-icon icofont-dashboard-web" />{" "}
          <span
            className={
              pathname === "/DoctorDashboard"
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

const Consultations = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/DoctorConsultations">
          <span className="link-icon icofont-stethoscope-alt" />{" "}
          <span
            className={
              pathname === "/DoctorConsultations"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Consultations
          </span>
        </Link>
      </li>
    </div>
  );
};

const Appointments = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/DoctorAppointments">
          <span className="link-icon icofont-notepad" />{" "}
          <span
            className={
              pathname === "/DoctorAppointments"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Appointments
          </span>
        </Link>
      </li>
    </div>
  );
};

