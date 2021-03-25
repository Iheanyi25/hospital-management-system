import React from 'react'
import { Link, useLocation } from "react-router-dom";

export default function Surgery() {
    const { pathname } = useLocation();
    return (
        <div>
            <SurgerySection  />
            <ManageSurgeries pathname={pathname} />
        </div>
    )
}

const SurgerySection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#menuSurgery"
          aria-expanded="false"
          aria-controls="surgeryAdmission"
        >
          <span className="group-title">Surgery</span>
        </div>
      </li>
    );
  };

  const ManageSurgeries = ({ pathname }) => {
    return (
      <div className="collapse" id="menuSurgery">
        <li className="menu-item">
          <Link className="item-link" to="/AdminManageSurgeries">
            <span className="link-icon icofont-users" />{" "}
            <span
              className={
                pathname === "/AdminManageSurgeries"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Surgeries
            </span>
          </Link>
        </li>
      </div>
    );
  };
  