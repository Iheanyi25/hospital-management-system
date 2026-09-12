import React from "react";
import { AllDrugs, Tablets, Liquid, Powder, Inhaler } from "../drug-categories";

const DrugTabContent = ({ userType }) => {
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane show fade active"
        id="pills-all"
        role="tabpanel"
        aria-labelledby="pills-all-tab"
      >
        <AllDrugs userType={userType} />
      </div>
      <div
        className="tab-pane fade"
        id="pills-tabs"
        role="tabpanel"
        aria-labelledby="pills-tabs-tab"
      >
        <Tablets userType={userType} />
      </div>
      <div
        className="tab-pane fade"
        id="pills-liquid"
        role="tabpanel"
        aria-labelledby="pills-liquid-tab"
      >
        <Liquid userType={userType} />
      </div>
      <div
        className="tab-pane fade"
        id="pills-inhaler"
        role="tabpanel"
        aria-labelledby="pills-inhaler-tab"
      >
        <Inhaler userType={userType} />
      </div>
      <div
        className="tab-pane fade"
        id="pills-powder"
        role="tabpanel"
        aria-labelledby="pills-powder-tab"
      >
        <Powder userType={userType} />
      </div>
    </div>
  );
};

export { DrugTabContent };
