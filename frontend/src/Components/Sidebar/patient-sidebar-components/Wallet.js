import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Wallet() {
  const { pathname } = useLocation();
  return (
    <div>
      <WalletSection />
      <Account pathname={pathname} />
      <FundViaLink pathname={pathname} />
    </div>
  );
}
const WalletSection = () => {
  return (
    <li className="cursor pt-2 nav-item">
      <div
        className="cursor menu-item nav-link panel-heading collapsed"
        data-toggle="collapse"
        data-target="#subMenuWallet"
        aria-expanded="false"
        aria-controls="collapseWallet"
      >
        <span className="group-title">Wallet</span>
      </div>
    </li>
  );
};


const Account = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuWallet">
        <li className="menu-item">
          <Link className="item-link" to="/PatientAccount">
            <span className="link-icon icofont-wallet" />{" "}
            <span
              className={
                pathname === "/AdminManageAccounts"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              My Account
            </span>
          </Link>
        </li>
      </div>
    );
  };

const FundViaLink = ({ pathname }) => {
  return (
    <div className="collapse" id="subMenuWallet">
      <li className="menu-item">
        <Link className="item-link" to="/ThirdPartyFunding">
          <span className="link-icon icofont-wallet" />{" "}
          <span
            className={
              pathname === "/ThirdPartyFunding"
                ? "link-text text-primary"
                : "link-text"
            }
          >
            Fund Via Link
          </span>
        </Link>
      </li>
    </div>
  );
};

