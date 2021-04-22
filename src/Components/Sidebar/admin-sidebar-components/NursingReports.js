import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NursingReport() {
  const { pathname } = useLocation();
  return (
    <div>
      <NursingReportSection />
      <ManageReports pathname={pathname} />
    </div>
  );
}

const NursingReportSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#menuNursingReport"
        aria-expanded="false"
        aria-controls="collapsmenuNursingReport"
      >
        <span className="group-title">Nursing Report</span>
      </div>
    </li>
  );
};

const ManageReports = ({ pathname }) => {
  return (
    <div className="collapse" id="menuNursingReport">
      <li className="menu-item">
        <Link className="item-link" to="/AdminManageNursingReports">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminManageNursingReports"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Manage Reports
          </span>
        </Link>
      </li>
    </div>
  );
};
