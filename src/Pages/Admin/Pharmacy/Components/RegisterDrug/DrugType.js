import React, { useState } from "react";

const DrugType = ({ prevStep, setPayload, handleSubmit }) => {
  const [drugType, setDrugType] = useState("");

  const handleChange = (e) => {
    setPayload(e.target.name, e.target.value);
    if (e.target.name === "drugType") setDrugType(e.target.value);
  };

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
            value="tabs"
            onChange={handleChange}
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
            value="liquid"
            onChange={handleChange}
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
            value="inhalers"
            onChange={handleChange}
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
            value="powder"
            onChange={handleChange}
          />{" "}
          <label className="custom-control-label" for="powder">
            Powder
          </label>
        </div>
      </div>
      {drugType === "tabs" ? (
        <>
          <div className="form-group">
            <label>Number of pills in a packet/container</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="quantityPerContainer"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Number of packets in a carton</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="containersPerCarton"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Price per parcket/container (NGN)</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="name"
              disabled
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
        </>
      ) : drugType === "liquid" ? (
        <>
          <div className="form-group">
            <label>Volume (ml) per bottle/tube</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="quantityPerContainer"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Number of bottles/tubes in a carton</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="containersPerCarton"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Price per bottle/tube (NGN)</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="name"
              disabled
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
        </>
      ) : drugType === "inhalers" ? (
        <>
          <div className="form-group">
            <label>Volume (metered acutations)</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="quantityPerContainer"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Number of cannisters in a carton</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="containersPerCarton"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Price per cannister (NGN)</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="name"
              disabled
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
        </>
      ) : drugType === "powder" ? (
        <>
          <div className="form-group">
            <label>Volume (grams) per can</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="quantityPerContainer"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Number of cans in a carton</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="containersPerCarton"
              onChange={handleChange}
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
          <div className="form-group">
            <label>Price per can (NGN)</label>
            <input
              className="form-control"
              type="number"
              tabIndex={-98}
              name="name"
              disabled
              required
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please provide a valid name.</div>
          </div>
        </>
      ) : null}
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
        <div className="col number-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={drugType === "" ? true : false}
          >
            Register drug
          </button>
        </div>
      </div>
      </form>
  );
};

export { DrugType };
