import React from "react";

const DrugDescription = ({ nextStep, firstStepDone, setPayload, data }) => {
  const handleChange = (e) => {
    setPayload(e.target.name, e.target.value);
  };
  console.log(firstStepDone);
  const { sku, name, genericName, manufacturer, expiryDate } = data;
  console.log(name);
  return (
    <form className="mb-4 p-5 needs-validation" noValidate>
      <h4 className="text-center">Register a drug</h4>
      <div className="form-group">
        <label>SKU</label>
        <input
          className="form-control"
          type="text"
          tabIndex={-98}
          placeholder="SKU"
          name="sku"
          onChange={handleChange}
          value={sku}
          autoFocus
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid text.</div>
      </div>
      <div className="form-group">
        <label>Drug Name</label>

        <input
          className="form-control"
          type="text"
          tabIndex={-98}
          placeholder="Drug Name"
          name="name"
          onChange={handleChange}
          value={name}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid text.</div>
      </div>
      <div className="form-group">
        <label>Generic Name</label>{" "}
        <input
          className="form-control"
          type="text"
          tabIndex={-98}
          placeholder="Generic Name"
          name="genericName"
          onChange={handleChange}
          value={genericName}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid text.</div>
      </div>
      <div className="form-group">
        <label>Manufacturer</label>{" "}
        <input
          className="form-control"
          type="text"
          tabIndex={-98}
          placeholder="Manufacturer"
          name="manufacturer"
          onChange={handleChange}
          value={manufacturer}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid text.</div>
      </div>
      <div className="form-group">
        <label>Expiry Date</label>{" "}
        <input
          className="form-control"
          type="date"
          tabIndex={-98}
          placeholder="Expiry Date"
          name="expiryDate"
          onChange={handleChange}
          value={expiryDate}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid text.</div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col text-right">
          <button
            type="button"
            className="btn btn-primary"
            onClick={nextStep}
            disabled={firstStepDone ? false : true}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export { DrugDescription };
