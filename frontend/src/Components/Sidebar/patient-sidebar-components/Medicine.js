import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Medicine() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <Consultation pathname={pathname} />
      <Appointments pathname={pathname} />
      <Doctors pathname={pathname} />
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
        <span className="group-title">medicine</span>
      </div>
    </li>
  );
};

const Dashboard = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/PatientDashboard">
          <span className="link-icon icofont-dashboard-web" />{" "}
          <span
            className={
              pathname === "/PatientDashboard"
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
          <Link className="item-link" to="/PatientConsultations">
            <span className="link-icon icofont-stethoscope-alt" />{" "}
            <span
              className={
                pathname === "/PatientConsultations"
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
          <Link className="item-link" to="/PatientAppointments">
            <span className="link-icon icofont-papers" />{" "}
            <span
              className={
                pathname === "/PatientAppointments"
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

const Doctors = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <Link className="item-link" to="/PatientDoctorList">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/PatientDoctorList"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Doctors
          </span>
        </Link>
      </li>
    </div>
  );
};