
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Profile() {
  const { pathname } = useLocation();
  return (
    <div>
      <ProfileSection />
      <ProfileDetails pathname={pathname} />
    </div>
  );
}

const ProfileSection = () => {
    return (
      <li className="cursor pt-2 nav-item">
        <div
          className="cursor menu-item nav-link panel-heading collapsed"
          data-toggle="collapse"
          data-target="#subMenuProfile"
          aria-expanded="false"
          aria-controls="collapseProfile"
        >
          <span className="group-title">Profile</span>
        </div>
      </li>
    );
  };

  
const ProfileDetails = ({ pathname }) => {
    return (
      <div className="collapse" id="subMenuProfile">
        <li className="menu-item">
          <Link className="item-link" to="/AccountantProfile">
            <span className="link-icon icofont-user-suited" />{" "}
            <span
              className={
                pathname === "/AccountantProfile"
                  ? "link-text text-primary"
                  : "link-text"
              }
            >
              My Profile
            </span>
          </Link>
        </li>
      </div>
    );
  };
