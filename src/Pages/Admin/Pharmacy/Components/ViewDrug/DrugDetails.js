import React from "react";
import { UpdateDrug } from "../../../../.././Components/Modals";
import formatAmount from "../../../../../utils/formatAmount";
import formatDate from "../../../../../utils/formatDate";
import edit from "../../../../../assets/img/edit.svg";

const DrugDetails = ({ drug, update }) => {
  return (
    <div className="card border-light p-4 w-75 m-auto">
      <div className="card-body">
        <div className="d-flex justify-content-between border-bottom">
          <h6 className="font-weight-bold">{drug.name}</h6>
          <div className="d-flex">
            <p className="mt-4">
              <span className="font-weight-bold text-info">
                {formatAmount(drug.quantityInStock)}{" "}
              </span>
              <span className="text-secondary">
                {drug.drugType === "tabs"
                  ? "tablets in stock"
                  : drug.drugType === "liquid"
                  ? "bottles in stock"
                  : drug.drugType === "powder"
                  ? "caans in stock"
                  : "cannisters in stock"}
              </span>
            </p>
            <img
              src={edit}
              data-toggle="modal"
              data-target="#update-drug"
              alt="reset"
              className="ml-3"
              style={{ cursor: "pointer" }}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-6">
            <div>
              <h6 className="mb-2">Drug Name</h6>
              <p>{drug.name}</p>
            </div>
            <div>
              <h6 className="mb-2">Generic Name</h6>
              <p>{drug.genericName}</p>
            </div>
            <div>
              <h6 className="mb-2">Manufacturer</h6>
              <p>{drug.manufacturer}</p>
            </div>
            <div>
              <h6 className="mb-2">Drug Type</h6>
              <p>{drug.drugType}</p>
            </div>
            <div>
              <h6 className="mb-2">Expiry Date</h6>
              <p>{formatDate(drug.expiryDate)}</p>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div>
              <h6 className="mb-2">Measurement</h6>
              <p>{drug.measurment}</p>
            </div>
            <div>
              <h6 className="mb-2">Number of packets in a carton</h6>
              <p>{drug.containersPerCarton}</p>
            </div>
            <div>
              <h6 className="mb-2">Number of pills in a packet/container</h6>
              <p>{drug.quantityPerContainer}</p>
            </div>
            <div>
              <h6 className="mb-2">Price per parcket/container (NGN)</h6>
              <p>{formatAmount(drug.costPricePerContainer) ?? "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      <UpdateDrug drug={drug} id={drug.id} update={update} />
    </div>
  );
};

export { DrugDetails };
