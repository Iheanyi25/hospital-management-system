import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NatalHealth() {
  const { pathname } = useLocation();
  return (
    <div>
      <NatalHealthSection />
      <AnteNatal pathname={pathname} />
      {/* <PostNatal pathname={pathname} /> */}
    </div>
  );
}

const NatalHealthSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#menuNatalHealth"
        aria-expanded="false"
        aria-controls="collapseNatalHealth"
      >
        <span className="group-title">Natal Care</span>
      </div>
    </li>
  );
};

const AnteNatal = ({ pathname }) => {
  return (
    <div className="collapse" id="menuNatalHealth">
      <li className="menu-item">
        <div
          className="cursor item-link panel-heading collapsed  "
          data-toggle="collapse"
          data-target="#submenuAnteNatal"
        >
          <span className="link-icon icofont-hospital" />{" "}
          <span className="link-text">Antenatal</span>{" "}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuAnteNatal"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/AdminRegisterAnteNatal" className="item-link">
            <span
              className={
                pathname === "/AdminRegisterAnteNatal"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Register for Antenatal
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/AdminManageAnteNatal">
            <span
              className={
                pathname === "/AdminManageAnteNatal"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              Manage Antenatal
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

// const PostNatal = ({ pathname }) => {
//   return (
//     <div className="collapse" id="menuNatalHealth">
//       <li className="menu-item">
//         <div
//           className="cursor item-link panel-heading collapsed  "
//           data-toggle="collapse"
//           data-target="#submenuHMO"
//         >
//           <span className="link-icon icofont-hospital" />{" "}
//           <span className="link-text">PostNatal</span>{" "}
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
//               Register PostNatal
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
//               Manage PostNatal
//             </span>
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };
