import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function UserManagement({ setUserType }) {
  const { pathname } = useLocation();
  return (
    <div>
      <UserManagementSection />
      <Patients pathname={pathname} />
      <Doctors setUserType={setUserType} pathname={pathname} />
      <Nurses setUserType={setUserType} pathname={pathname} />
      <Pharmacists setUserType={setUserType} pathname={pathname} />
      <Accountants setUserType={setUserType} pathname={pathname} />
      <Lab setUserType={setUserType} pathname={pathname} />
    </div>
  );
}

const UserManagementSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuUserMangement"
        aria-expanded="false"
        aria-controls="collapseUserManagement"
      >
        <span className="group-title">User Management</span>
      </div>
    </li>
  );
};

const Patients = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuPatients"
        >
          <span className="link-icon icofont-patient-bed" />{" "}
          <span className="link-text">Patients</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuPatients"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminAddPatients" className="item-link">
            <span
              className={
                pathname === "/AdminAddPatients"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Register Patient
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllPatients">
            <span
              className={
                pathname === "/AdminAllPatients"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Patients
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Doctors = ({ setUserType, pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuDoctors"
        >
          <span className="link-icon icofont-doctor-alt" />{" "}
          <span className="link-text">Doctors</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuDoctors"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link
            to="#"
            className="item-link"
            data-toggle="modal"
            data-target="#add-user"
            onClick={() => setUserType("doctor")}
          >
            <span className="link-text">Register Doctors</span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllDoctors">
            <span
              className={
                pathname === "/AdminAllDoctors"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Doctors
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Nurses = ({ setUserType, pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  t"
          data-toggle="collapse"
          data-target="#submenuNurses"
        >
          <span className="link-icon icofont-doctor-alt" />{" "}
          <span className="link-text">Nurses</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuNurses"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link
            to="#"
            className="item-link"
            data-toggle="modal"
            data-target="#add-user"
            onClick={() => setUserType("nurse")}
          >
            <span className="link-text">Register Nurses</span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllNurses">
            <span
              className={
                pathname === "/AdminAllNurses"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Nurses
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Pharmacists = ({ setUserType, pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed "
          data-toggle="collapse"
          data-target="#submenuPharmacists"
        >
          <span className="link-icon icofont-drug-pack" />{" "}
          <span className="link-text">Pharmacists</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuPharmacists"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link
            to="#"
            className="item-link"
            data-toggle="modal"
            data-target="#add-user"
            onClick={() => setUserType("pharmacy")}
          >
            <span className="link-text">Register Pharmacist</span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllPharmacists">
            <span
              className={
                pathname === "/AdminAllPharmacists"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Pharmacists
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Accountants = ({ setUserType, pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed "
          data-toggle="collapse"
          data-target="#submenuAccountants"
        >
          <span className="link-icon icofont-money" />{" "}
          <span className="link-text">Accountants</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuAccountants"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link
            to="#"
            className="item-link"
            data-toggle="modal"
            data-target="#add-user"
            onClick={() => setUserType("accountant")}
          >
            <span className="link-text">Register Accountant</span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllAccountants">
            <span
              className={
                pathname === "/AdminAllAccountants"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Accountants
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Lab = ({ setUserType, pathname }) => {
  return (
    <div className="collapse" id="subMenuUserMangement">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed "
          data-toggle="collapse"
          data-target="#submenuLab"
        >
          <span className="link-icon icofont-doctor-alt" />{" "}
          <span className="link-text">Lab</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuLab"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link
            to="#"
            className="item-link"
            data-toggle="modal"
            data-target="#add-user"
            onClick={() => setUserType("lab")}
          >
            <span className="link-text">Register Lab Technician</span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminAllLabTechnicians">
            <span
              className={
                pathname === "/AdminAllLabTechnicians"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Lab Technicians
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
