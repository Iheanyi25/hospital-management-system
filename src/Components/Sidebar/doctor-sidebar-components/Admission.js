import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Admission() {
  const { pathname } = useLocation();
  return (
    <div>
      <AdmissionSection />
      <ManageAdmissions pathname={pathname} />
    </div>
  );
}

const AdmissionSection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuAdmission"
          aria-expanded="false"
          aria-controls="collapseAdmission"
        >
          <span className="group-title">ADDMISSION</span>
        </div>
      </li>
    );
  };

  
const ManageAdmissions = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuAdmission">
        <li className="menu-item">
          <Link className="item-link" to="/DoctorManageAdmissions">
            <span className="link-icon icofont-users" />{" "}
            <span
              className={
                pathname === "/DoctorManageAdmissions"
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
