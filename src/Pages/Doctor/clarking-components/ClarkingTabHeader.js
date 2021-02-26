import React from "react";
import { NavLink } from "react-router-dom";

const ClarkingTabHeader = ({ state }) => {
  return (
    <div
      className="nav flex-column nav-tabs col-md-3"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="vertical"
    >
      <a
        className="nav-link active"
        id="v-pills-home-tab"
        data-toggle="pill"
        href="#v-pills-home"
        role="tab"
        aria-controls="v-pills-home"
        aria-selected="true"
      >
        Capture Patient Health History
      </a>
      <a
        className="nav-link"
        id="v-pills-profile-tab"
        data-toggle="pill"
        href="#v-pills-profile"
        role="tab"
        aria-controls="v-pills-profile"
        aria-selected="false"
      >
        Clarking
      </a>
      <a
        className="nav-link"
        id="v-pills-health-history-tab"
        data-toggle="pill"
        href="#v-pills-health-history"
        role="tab"
        aria-controls="v-pills-health-history"
        aria-selected="false"
      >
        Health History
      </a>
      <a
        className="nav-link"
        id="v-pills-settings-tab"
        data-toggle="pill"
        href="#v-pills-settings"
        role="tab"
        aria-controls="v-pills-settings"
        aria-selected="false"
      >
        Lab History and Service Prescription
      </a>
      <NavLink
        to={{
          pathname: "/AdminServiceRequests",
          state: state,
        }}
        className="nav-link"
        aria-selected="false"
      >
        Request new service
      </NavLink>
    </div>
  );
};

export { ClarkingTabHeader };
