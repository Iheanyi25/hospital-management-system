import React from "react";

const DrugTabHeader = () => {
  return (
    <ul className="nav nav-tabs mb-3" id="pills-tab" role="tablist">
      <li className="nav-item">
        <a
          className="nav-link active show"
          id="pills-all-tab"
          data-toggle="pill"
          href="#pills-all"
          role="tab"
          aria-controls="pills-all"
          aria-selected="false"
        >
          All
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-tabs-tab"
          data-toggle="pill"
          href="#pills-tabs"
          role="tab"
          aria-controls="pills-tabs"
          aria-selected="false"
        >
          Tablets/Capsules
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-liquid-tab"
          data-toggle="pill"
          href="#pills-liquid"
          role="tab"
          aria-controls="pills-liquid"
          aria-selected="false"
        >
          Liquid/Syrup
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-inhaler-tab"
          data-toggle="pill"
          href="#pills-inhaler"
          role="tab"
          aria-controls="pills-inhaler"
          aria-selected="false"
        >
          Inhaler
        </a>
      </li>
      <li className="nav-item">
        <a
          className="nav-link"
          id="pills-powder-tab"
          data-toggle="pill"
          href="#pills-powder"
          role="tab"
          aria-controls="pills-powder"
          aria-selected="false"
        >
          Powder
        </a>
      </li>
    </ul>
  );
};

export { DrugTabHeader };
