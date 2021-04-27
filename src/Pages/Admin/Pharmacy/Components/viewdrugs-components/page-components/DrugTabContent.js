import React from "react";
import { AllDrugs, DrugsByDrugType, Tablets } from "../drug-categories";

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
        <DrugsByDrugType
          drugType="liquid"
          userType={userType}
          category="liquidDrugs"
        />
      </div>
      <div
        className="tab-pane fade"
        id="pills-inhaler"
        role="tabpanel"
        aria-labelledby="pills-inhaler-tab"
      >
        <DrugsByDrugType
          drugType="inhalers"
          userType={userType}
          category="inhalersDrugs"
        />
      </div>
      <div
        className="tab-pane fade"
        id="pills-powder"
        role="tabpanel"
        aria-labelledby="pills-powder-tab"
      >
        <DrugsByDrugType
          drugType="powder"
          userType={userType}
          category="powderDrugs"
        />
      </div>
    </div>
  );
};

export { DrugTabContent };
