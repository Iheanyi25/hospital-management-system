import React from "react";
import { AllDrugs, DrugsByDrugType } from "../drug-categories";

const DrugTabContent = ({ userType }) => {
    // const tabContent = [
    //     {
    //         drugType: "all",
    //         id: "pills-all"
    //     },
    //     {
    //         drugType: "tabs",
    //         id: "pills-tab"
    //     },
    //     {
    //         drugType: "liquid",
    //         id: "pills-liquid"
    //     },
    //     {
    //         drugType: "inhalers",
    //         id: "pills-inhaler"
    //     },
    //     {
    //         drugType: "powder",
    //         id: "pills-powder"
    //     },
    // ]
  return (
    <div className="tab-content" id="pills-tabContent">
      <div
        className="tab-pane show fade active"
        id="pills-all"
        role="tabpanel"
        aria-labelledby="pills-all-tab"
      >
        <AllDrugs userType={userType} category="allDrugs" />
      </div>
      <div
        className="tab-pane fade"
        id="pills-tabs"
        role="tabpanel"
        aria-labelledby="pills-tabs-tab"
      >
        <DrugsByDrugType
          drugType="tabs"
          userType={userType}
          category="tabDrugs"
        />
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
