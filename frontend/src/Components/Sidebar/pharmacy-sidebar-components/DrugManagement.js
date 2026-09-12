import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function DrugsMGT() {
  const { pathname } = useLocation();
  return (
    <div>
      <DrugsMGTSection />
      <Drugs pathname={pathname} />
    </div>
  );
}
const DrugsMGTSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuDrugsMGT"
        aria-expanded="false"
        aria-controls="collapseDrugsMGT"
      >
        <span className="group-title">Drugs Management</span>
      </div>
    </li>
  );
};

const Drugs = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuDrugsMGT">
      <li className="menu-item">
        <div
          className="cursor item-link  panel-heading collapsed mark-active"
          data-toggle="collapse"
          data-target="#submenuDrug"
          aria-controls="collapseDrug"
        >
          <span className="link-icon icofont-drug" />{" "}
          <span className="link-text">Drugs</span>{" "}
          {/* <span className="link-caret icofont-thin-right" /> */}
        </div>
      </li>
      <ul
        className="collapse submenu-ul"
        id="submenuDrug"
        aria-expanded="false"
        data-parent="#accordion"
      >
        <li className="menu-item font-weight-normal">
          <Link to="/PharmacyRegisterDrug" className="item-link">
            <span
              className={
                pathname === "/PharmacyRegisterDrug"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
                Register a drug
            </span>
          </Link>
        </li>
        <li className="menu-item font-weight-normal">
          <Link className="item-link" to="/PharmacyViewDrugs">
            <span
              className={
                pathname === "/PharmacyViewDrugs"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
               Manage drugs
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};
