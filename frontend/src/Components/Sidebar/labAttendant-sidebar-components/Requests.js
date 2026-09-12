
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Requests() {
  const { pathname } = useLocation();
  return (
    <div>
      <RequestsSection />
      <ServiceRequests pathname={pathname} />
    </div>
  );
}

const RequestsSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuRequests"
        aria-expanded="false"
        aria-controls="collapseRequests"
      >
        <span className="group-title">Requests</span>
      </div>
    </li>
  );
};

const ServiceRequests = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuRequests">
        <li className="menu-item">
          <div
            className="cursor item-link   panel-heading collapsed  "
            data-toggle="collapse"
            data-target="#submenuServiceRequests"
          >
            <span className="link-icon icofont-binoculars" />{" "}
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
            <Link to="/LabServiceRequests" className="item-link">
              <span
                className={
                  pathname === "/LabServiceRequests"
                    ? "link-text text-primary"
                    : "link-text"
                }
              >
                Request Service
              </span>
            </Link>
          </li>
          <li className="menu-item font-weight-normal">
            <Link className="item-link" to="/LabManageServiceRequests">
              <span
                className={
                  pathname === "/LabManageServiceRequests"
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
  