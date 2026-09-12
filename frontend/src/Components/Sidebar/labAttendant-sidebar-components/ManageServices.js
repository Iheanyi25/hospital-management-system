import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ManageServices() {
  const { pathname } = useLocation();
  return (
    <div>
      <ManageServicesSection />
      <Service pathname={pathname} />
    </div>
  );
}


const ManageServicesSection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuManageServices"
          aria-expanded="false"
          aria-controls="collapseManageServices"
        >
          <span className="group-title">Manage Services</span>
        </div>
      </li>
    );
  };

const Service = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuManageServices">
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
            <Link to="/LabCreateService" className="item-link">
              <span
                className={
                  pathname === "/LabCreateService"
                    ? "link-text text-primary"
                    : "link-text"
                }
              >
                Create a Service
              </span>
            </Link>
          </li>
          <li className="menu-item font-weight-normal">
            <Link to="/LabManageServices" className="item-link">
              <span
                className={
                  pathname === "/LabManageServices"
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
                <Link to="/LabServiceCategory" className="item-link">
                  <span
                    className={
                      pathname === "/LabServiceCategory"
                        ? "link-text text-primary"
                        : "link-text"
                    }
                  >
                    Create a Category
                  </span>
                </Link>
              </li>
              <li className="menu-item font-weight-normal">
                <Link to="/LabManageServiceCategory" className="item-link">
                  <span
                    className={
                      pathname === "/LabManageServiceCategory"
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
// <>
// <li className="menu-item">
// <Link className="item-link" to="#">
//   <span className="group-title">Manage Services</span>
// </Link>
// </li>
// <li className="menu-item has-sub">
// <Link className="item-link" to="#">
//   <span className="link-icon icofont-hard-disk" />
//   <span className="link-text">Service Category</span>{" "}
//   <span className="link-caret icofont-thin-right" />
// </Link>
// <ul className="sub">
//   <li className="menu-item">
//     <Link to="/LabServiceCategory" className="item-link">
//       <span className="link-text">Create a Category</span>
//     </Link>
//   </li>
//   <li className="menu-item">
//     <Link
//       to="/LabManageServiceCategory"
//       className="item-link"
//     >
//       <span className="link-text">Manage Categories</span>
//     </Link>
//   </li>
// </ul>
// </li>
// <li className="menu-item has-sub">
// <Link className="item-link" to="#">
//   <span className="link-icon icofont-cloud" />
//   <span className="link-text">Services</span>{" "}
//   <span className="link-caret icofont-thin-right" />
// </Link>
// <ul className="sub">
//   <li className="menu-item">
//     <Link to="/LabCreateService" className="item-link">
//       <span className="link-text">Create a Service</span>
//     </Link>
//   </li>
//   <li className="menu-item">
//     <Link to="/LabManageServices" className="item-link">
//       <span className="link-text">Manage Services</span>
//     </Link>
//   </li>
// </ul>
// </li>