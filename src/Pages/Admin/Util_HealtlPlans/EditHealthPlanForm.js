import React from "react";

export default function EditHealthPlanForm({
  loading,
  handleChange,
  healthPlanData,
  handleSubmit,
  isDisabled,
}) {
  return (
    <form
      className="mb-4 p-5 needs-validation"
      onSubmit={handleSubmit}
      noValidate
    >
      <h4 className="text-center">Edit a health plan</h4>
      <div className="form-group">
        <label>Name</label>
        <input
          className="form-control"
          type="text"
          tabIndex={-98}
          placeholder="Name of the health plan"
          value={healthPlanData.name}
          name="name"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Please provide a valid name.</div>
      </div>
      <div className="form-group">
        <label>Cost</label>
        <input
          className="form-control"
          type="number"
          tabIndex={-98}
          value={healthPlanData.cost}
          placeholder="Price of the health plan"
          name="cost"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Oops! should be numbers only.</div>
      </div>
      <div className="form-group">
        <label>Renewal Cost</label>
        <input
          className="form-control"
          type="number"
          value={healthPlanData.renewal}
          tabIndex={-98}
          placeholder="Cost of annual renewal of card"
          name="renewal"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Oops! should be numbers only.</div>
      </div>
      <div className="form-group">
        <label>Patients Per Folder</label>
        <input
          className="form-control"
          type="number"
          tabIndex={-98}
          value={healthPlanData.noOfPatients}
          placeholder="Number of patient per folder"
          name="noOfPatients"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Oops! should be numbers only.</div>
      </div>
      <div className="form-group">
        <label>Accounts Per Health Plan</label>
        <input
          className="form-control"
          type="number"
          value={healthPlanData.noOfAccounts}
          tabIndex={-98}
          placeholder="Accounts Per health plan"
          name="noOfAccounts"
          onChange={handleChange}
          required
        />
        <div className="valid-feedback">Looks good!</div>
        <div className="invalid-feedback">Oops! should be numbers only.</div>
      </div>
      <div className="form-group">
        <div className="custom-control custom-switch mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            id="control2"
            checked={healthPlanData.instantBilling ? "checked" : ""}
            name="instantBilling"
            onChange={handleChange}
          />{" "}
          <label className="custom-control-label" for="control2">
            Instant Billing
          </label>
        </div>
      </div>
      <div className="row">
        <div className="col"></div>
        <div className="col text-right">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || isDisabled}
          >
            {loading ? "Submitting..." : "submit"}
          </button>
        </div>
      </div>
    </form>
  );
}
