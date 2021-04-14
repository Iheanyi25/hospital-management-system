import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Admission({admissionUrl}) {
  const { pathname } = useLocation();
  return (
    <div>
      <AdmissionSection />
      {/* <ManageAdmissions pathname={pathname} admissionUrl={admissionUrl} /> */}
    </div>
  );
}

const AdmissionSection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuAdmission"
          aria-expanded="false"
          aria-controls="collapseAdmission"
        >
          <span className="group-title">ADMISSION</span>
        </div>
      </li>
    );
  };


// const ManageAdmissions = ({ pathname, admissionUrl }) => {
//     return (
//       <div className="collapse" id="subMenuAdmission">
//         <li className="menu-item">
//           <Link className="item-link" to={`${admissionUrl}` }>
//             <span className="link-icon icofont-users" />{" "}
//             <span
//               className={
//                 pathname === `${admissionUrl}` 
//                   ? "link-text text-primary"
//                   : "link-text"
//               }
//             >
//               Manage Admissions
//             </span>
//           </Link>
//         </li>
//       </div>
//     );
//   };
