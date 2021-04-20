import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NursingReport() {
  const { pathname } = useLocation();
  return (
    <div>
      <NursingReportSection />
      <CreateReport pathname={pathname} />
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

const CreateReport = ({ pathname }) => {
  return (
    <div className="collapse" id="menuNursingReport">
      <li className="menu-item">
        <Link className="item-link" to="/AdminCreateNursingReport">
          <span className="link-icon icofont-users" />{" "}
          <span
            className={
              pathname === "/AdminCreateNursingReport"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Create Report
          </span>
        </Link>
      </li>
    </div>
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

// const HMO = ({ pathname }) => {
//   return (
//     <div className="collapse" id="menuHealthInsurance">
//       <li className="menu-item">
//         <div
//           className="cursor item-link panel-heading collapsed  "
//           data-toggle="collapse"
//           data-target="#submenuHMO"
//         >
//           <span className="link-icon icofont-hospital" />{" "}
//           <span className="link-text">HMO</span>{" "}
//         </div>
//       </li>
//       <ul
//         className="collapse submenu-ul"
//         id="submenuHMO"
//         aria-expanded="false"
//         data-parent="#accordion"
//       >
//         <li className="menu-item font-weight-normal">
//           <Link to="/AdminCreateHMO" className="item-link">
//             <span
//               className={
//                 pathname === "/AdminCreateHMO"
//                   ? "link-text text-primary"
//                   : "link-text"
//               }
//             >
//               Create HMO
//             </span>
//           </Link>
//         </li>
//         <li className="menu-item font-weight-normal">
//           <Link className="item-link" to="/AdminManageHMO">
//             <span
//               className={
//                 pathname === "/AdminManageHMO"
//                   ? "link-text text-primary"
//                   : "link-text"
//               }
//             >
//               Manage HMO
//             </span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };
