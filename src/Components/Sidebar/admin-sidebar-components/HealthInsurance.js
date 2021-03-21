import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HealthInsurance() {
  const { pathname } = useLocation();
  return (
    <div>
      <HealthInuranceSection />
      <NHIS pathname={pathname} />
      <HMO pathname={pathname} />
    </div>
  );
}

const HealthInuranceSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#menuHealthInsurance"
        aria-expanded="false"
        aria-controls="collapseHealthInsurance"
      >
        <span className="group-title">Health Insurance</span>
      </div>
    </li>
  );
};

const NHIS = ({ pathname }) => {
  return (
    <div className="collapse" id="menuHealthInsurance">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuNHIS"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">NHIS</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuNHIS"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminCreateNHIS" className="item-link">
            <span
              className={
                pathname === "/AdminCreateNHIS"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create NHIS
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageNHIS">
            <span
              className={
                pathname === "/AdminManageNHIS"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage NHIS
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const HMO = ({ pathname }) => {
  return (
    <div className="collapse" id="menuHealthInsurance">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuHMO"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">HMO</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuHMO"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminCreateHMO" className="item-link">
            <span
              className={
                pathname === "/AdminCreateHMO"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create HMO
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageHMO">
            <span
              className={
                pathname === "/AdminManageHMO"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage HMO
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
