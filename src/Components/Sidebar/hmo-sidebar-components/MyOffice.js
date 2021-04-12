import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyOffice() {
  const { pathname } = useLocation();
  return (
    <div>
      <MyOfficeSection />
      <Dashboard pathname={pathname} />
      <HealthPlans pathname={pathname} />
      <UserGroups pathname={pathname} />
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
        <Link className="item-link" to="/PharmacyDashboard">
          <span className="link-icon icofont-dashboard-web" />{" "}
          <span
            className={
              pathname === "/PharmacyDashboard"
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

const HealthPlans = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuHealthPlans"
          aria-controls="collapseHealthPlans"
        >
          <span className="link-icon icofont-contact-add" />{" "}
          <span className="link-text">Health Plans</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuHealthPlans"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/CreateHealthPlan" className="item-link">
            <span
              className={
                pathname === "/CreateHealthPlan"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create Health Plan
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/ManageHealthPlans">
            <span
              className={
                pathname === "/ManageHealthPlans"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
             Manage Health Plan
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const UserGroups = ({ pathname }) => {           

  return (
    <div className="collapse" id="subMenuMyOffice">
      <li className="menu-item">
        <div
          className="cursor item-link   panel-heading collapsed  mark-active"
          data-toggle="collapse"
          data-target="#submenuUserGroup"
          aria-controls="collapseUserGroup"
        >
          <span className="link-icon icofont-contact-add" />{" "}
          <span className="link-text">User Groups</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuUserGroup"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/CreateUserGroup" className="item-link">
            <span
              className={
                pathname === "/CreateUserGroup"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Create User Group
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/ManageUserGroups">
            <span className={
                pathname === "/ManageUserGroups"
                  ? "link-text text-primary"
                  : "link-text"
              }>Manage User Group</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};