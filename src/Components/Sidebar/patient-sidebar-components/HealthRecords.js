import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function HealthRecordsMGT() {
  const { pathname } = useLocation();
  return (
    <div>
      <HealthRecordsSection />
      <HealthRecords pathname={pathname} />
      <MyDoctors pathname={pathname} />
    </div>
  );
}
const HealthRecordsSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuHealthRecMGT"
        aria-expanded="false"
        aria-controls="collapseHealthRecMGT"
      >
        <span className="group-title">Health Record MGT</span>
      </div>
    </li>
  );
};


const HealthRecords = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuHealthRecMGT">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuHealthRecords"
          aria-controls="collapseHealthRecords"
        >
          <span className="link-icon icofont-history" />{" "}
          <span className="link-text">Health Records</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuHealthRecords"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/PatientPreHealthRecordsHistory" className="item-link">
            <span
              className={
                pathname === "/PatientPreHealthRecordsHistory"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
             View Pre-Consultations
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/PatientClarkingHistory">
            <span
              className={
                pathname === "/PatientClarkingHistory"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
             View Clerking History
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/PatientHealthHistory">
            <span
              className={
                pathname === "/PatientHealthHistory"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
             View Health History
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

const MyDoctors = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuHealthRecMGT">
      <li className="menu-item">
        <Link className="item-link" to="/MyDoctors">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/MyDoctors"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            MyDoctorss
          </span>
        </Link>
      </li>
    </div>
  );
};

// <li className="menu-item">
// <span className="group-title">Health Records Mgt</span>
// </li>
// <li className="menu-item has-sub">
// <Link className="item-link" to="#">
//   <span className="link-icon icofont-history" />
//   <span className="link-text">Health Records</span>{" "}
//   <span className="link-caret icofont-thin-right" />
// </Link>
// <ul className="sub">
//   <li className="menu-item">
//     <Link
//       className="item-link"
//       to="/PatientPreHealthRecordsHistory"
//     >
//       <span className="link-text">
//         View Pre-HealthRecordss
//       </span>
//     </Link>
//   </li>
//   <li className="menu-item">
//     <Link className="item-link" to="/PatientClarkingHistory">
//       <span className="link-text">View Clerking History</span>
//     </Link>
//   </li>
//   <li className="menu-item">
//     <Link className="item-link" to="/PatientHealthHistory">
//       <span className="link-text">View Health History</span>
//     </Link>
//   </li>
