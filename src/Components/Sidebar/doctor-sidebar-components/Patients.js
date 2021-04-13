import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Patients() {
    const { pathname } = useLocation();
    return (
        <div>
            <PatientsSection />
            <DoctorPatientList pathname={pathname} />
            <MyPatients pathname={pathname} />
        </div>
    )
}

const PatientsSection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuPatients"
          aria-expanded="false"
          aria-controls="collapsePatients"
        >
          <span className="group-title">Patients</span>
        </div>
      </li>
    );
  };

  const DoctorPatientList = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuPatients">
        <li className="menu-item">
          <Link className="item-link" to="/DoctorPatientsList">
            <span className="link-icon icofont-paralysis-disability" />{" "}
            <span
              className={
                pathname === "/AdminDashboard"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Patients
            </span>
          </Link>
        </li>
      </div>
    );
  };

  const MyPatients = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuPatients">
        <li className="menu-item">
          <Link className="item-link" to="/myPatients">
            <span className="link-icon icon sli-user" />{" "}
            <span
              className={
                pathname === "/myPatients"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              My Patients
            </span>
          </Link>
        </li>
      </div>
    );
  };


