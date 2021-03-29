import React from "react";

const WardRoundTabHeader = () => {
  return (
    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active"
          id="pills-home-tab"
          data-toggle="pill"
          href="#pills-home"
          role="tab"
          aria-controls="pills-home"
          aria-selected="true"
        >
          Doctors Notes
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-profile-tab"
          data-toggle="pill"
          href="#pills-profile"
          role="tab"
          aria-controls="pills-profile"
          aria-selected="false"
        >
          Medications
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-serviceMed-tab"
          data-toggle="pill"
          href="#pills-serviceMed"
          role="tab"
          aria-controls="pills-serviceMed"
          aria-selected="false"
        >
          Service Medications
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-contact-tab"
          data-toggle="pill"
          href="#pills-contact"
          role="tab"
          aria-controls="pills-contact"
          aria-selected="false"
        >
          Observation Chart
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-drug-tab"
          data-toggle="pill"
          href="#pills-drug"
          role="tab"
          aria-controls="pills-drug"
          aria-selected="false"
        >
          Drugs administered
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-services-tab"
          data-toggle="pill"
          href="#pills-services"
          role="tab"
          aria-controls="pills-services"
          aria-selected="false"
        >
          Services administered
        </a>
      </li>
    </ul>
  );
};

export default WardRoundTabHeader;
