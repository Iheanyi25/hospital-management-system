import React from "react";
import { isNotEmptyString, isValidPositiveInteger } from "../../../../../utils/validationUtils";
import Inhalers from "./registerdrug-components/Inhalers";
import Liquid from "./registerdrug-components/Liquid";
import Powder from "./registerdrug-components/Powder";
import Tablets from "./registerdrug-components/Tablets";

const DrugType = ({ prevStep, setPayload, handleSubmit, drugTypeDetails, submitting }) => {

  const handleChange = (e) => {
    if (e.target.name === "drugType") {
      setPayload(e.target.name, e.target.id);
    }else {
      setPayload(e.target.name, e.target.value);
    }
  };

  const checkValidity = () => {
    const {quantityPerContainer,containersPerCarton,measurment,costPricePerContainer, drugType } = drugTypeDetails;
    return (
      isNotEmptyString(drugType) &&
      isValidPositiveInteger(quantityPerContainer) &&
      isValidPositiveInteger(containersPerCarton) &&
      isNotEmptyString(measurment) &&
      isValidPositiveInteger(costPricePerContainer) 
    );
  }
  const { drugType } = drugTypeDetails;

  const drugAttrs = {
    tabs : <Tablets handleChange={handleChange} drugTypeDetails={drugTypeDetails} />,
    liquid: <Liquid handleChange={handleChange}  drugTypeDetails={drugTypeDetails} />,
    inhalers: <Inhalers handleChange={handleChange}  drugTypeDetails={drugTypeDetails} />,
    powder: <Powder handleChange={handleChange}  drugTypeDetails={drugTypeDetails} />
  }

  return (
    <form className="mb-4 p-5 needs-validation" noValidate onSubmit={handleSubmit}>
      <h4 className="text-center">Register a drug</h4>
      <div className="form-group">
        <label>Drug Type</label>
        <div className="custom-control custom-radio mb-3">
          <input
            type="radio"
            className="custom-control-input"
            name="drugType"
            id="tabs"
            value={drugType}
            onChange={handleChange}
            checked={drugType === "tabs" && "checked"}
          />{" "}
          <label className="custom-control-label" for="tabs">
            Tablets, capsules or suppository
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            type="radio"
            className="custom-control-input"
            name="drugType"
            id="liquid"
            value={drugType}
            onChange={handleChange}
            checked={drugType === "liquid" && "checked"}
          />{" "}
          <label className="custom-control-label" for="liquid">
            Liquid, gel or paste
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            type="radio"
            className="custom-control-input"
            name="drugType"
            id="inhalers"
            value={drugType}
            onChange={handleChange}
            checked={drugType === "inhalers" && "checked"}
          />{" "}
          <label className="custom-control-label" for="inhalers">
            Inhalers
          </label>
        </div>
        <div className="custom-control custom-radio mb-3">
          <input
            type="radio"
            className="custom-control-input"
            name="drugType"
            id="powder"
            value={drugType}
            onChange={handleChange}
            checked={drugType === "powder" && "checked"}
          />{" "}
          <label className="custom-control-label" for="powder">
            Powder
          </label>
        </div>
      </div>
     {drugAttrs[drugType]}
      <div className="row">
        <div className="col">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={prevStep}
          >
            Back
          </button>
        </div>
        <div className="col text-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!checkValidity() || submitting}
          >
            {submitting ? "Registering..." : "Register drug"}
            
          </button>
        </div>
      </div>
      </form>
  );
};

export { DrugType };
