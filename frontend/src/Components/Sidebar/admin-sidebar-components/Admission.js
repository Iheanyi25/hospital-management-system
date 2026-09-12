import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Admission() {
  const { pathname } = useLocation();
  return (
    <div>
      <AdmissionSection  />
      <Wards pathname={pathname} />
      <RefferedPatients pathname={pathname} />
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
        data-target="#menuAdmission"
        aria-expanded="false"
        aria-controls="collapseAdmission"
      >
        <span className="group-title">Admission</span>
      </div>
    </li>
  );
};

const Wards = ({ pathname }) => {
  return (
    <div className="collapse" id="menuAdmission">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuWards"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">Wards</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuWards"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminCreateWard" className="item-link">
            <span
              className={
                pathname === "/AdminCreateWard"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create a ward
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageWards">
            <span
              className={
                pathname === "/AdminManageWards"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage wards
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const RefferedPatients = ({ pathname }) => {
  return (
    <div className="collapse" id="menuAdmission">
      <li className="menu-item">
        <Link className="item-link" to="/AdminViewReferredPatients">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminViewReferredPatients"
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
    <div className="collapse" id="menuAdmission">
      <li className="menu-item">
        <Link className="item-link" to="/AdminManageAdmissions">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminManageAdmissions"
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
