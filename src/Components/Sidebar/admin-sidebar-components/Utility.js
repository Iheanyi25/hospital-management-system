import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Utility() {
  const { pathname } = useLocation();
  return (
    <div>
      <UtilitySection />
      <ServiceRequests pathname={pathname} />
      <Service pathname={pathname} />
      <HealthPlans pathname={pathname} />
    </div>
  );
}

const UtilitySection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuUtility"
        aria-expanded="false"
        aria-controls="collapseUtility"
      >
        <span className="group-title">Utility</span>
      </div>
    </li>
  );
};

const ServiceRequests = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuUtility">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuServiceRequests"
        >
          <span className="link-icon icofont-architecture-alt" />{" "}
          <span className="link-text">Service Requests</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuServiceRequests"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminServiceRequests" className="item-link">
            <span
              className={
                pathname === "/AdminServiceRequests"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Request Service
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageServiceRequests">
            <span
              className={
                pathname === "/AdminManageServiceRequests"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Services
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const Service = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuUtility">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuService"
        >
          <span className="link-icon icofont-brand-myspace" />{" "}
          <span className="link-text">Services</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="subMenuService"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminCreateService" className="item-link">
            <span
              className={
                pathname === "/AdminCreateService"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create a Service
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link to="/AdminManageServices" className="item-link">
            <span
              className={
                pathname === "/AdminManageServices"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Services
            </span>
          </Link>
        </li>

        <li className="menu-item font-weight-normal">
          <div
            className="cursor item-link panel-heading collapsed"
            data-toggle="collapse"
            data-target="#subMenuServiceCategory"
          >
            <span className="link-text">Services Categories</span>{" "}
          </div>
        </li>
        <div>
          <ul
            className="collapse submenu-ul"
            id="subMenuServiceCategory"
            aria-expanded="false"
            //   data-parent="#accordion"
          >
            <li className="menu-item font-weight-normal">
              <Link to="/AdminServiceCategory" className="item-link">
                <span
                  className={
                    pathname === "/AdminServiceCategory"
                      ? "link-text text-primary"
                      : "link-text"
                  }
                >
                  Create a Category
                </span>
              </Link>
            </li>
            <li className="menu-item font-weight-normal">
              <Link to="/AdminManageServiceCategory" className="item-link">
                <span
                  className={
                    pathname === "/AdminManageServiceCategory"
                      ? "link-text text-primary"
                      : "link-text"
                  }
                >
                  Manage Categories
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </ul>
    </div>
  );
};

const HealthPlans = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuUtility">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuHealthPlans"
        >
          <span className="link-icon icofont-package" />{" "}
          <span className="link-text">Health Plans</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuHealthPlans"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminCreateHealthPlan" className="item-link">
            <span
              className={
                pathname === "/AdminCreateHealthPlan"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              {" "}
              Create a Health Plan
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageHealthPlans">
            <span
              className={
                pathname === "/AdminManageHealthPlans"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Health Plans
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
