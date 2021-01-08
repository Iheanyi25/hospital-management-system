import React, { useState } from "react";

const $ = window.$;

const AddPrescriptionQuantity = ({ drug, setSubmit }) => {
  const [details, setDetails] = useState({
    numberOfUnits: "",
    numberOfContainers: "",
    numberOfCartons: "",
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let drugData = drug;
    drugData["numberOfContainers"] = details.numberOfContainers;
    drugData["numberOfUnits"] = details.numberOfUnits;
    drugData["numberOfCartons"] = details.numberOfCartons;

    // validation to make sure that something was parsed
    if (Object.values(details).includes("")) return;

    await setSubmit(drugData);
    setDetails({ numberOfContainers: "", numberOfUnits: "" });
    $("#add-prescription-quantity").modal("hide");
  };

  return (
    <div
      className="modal fade"
      id="add-prescription-quantity"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Select amount prescribed</h5>
            <p className="text-center">
              You can select number of packets, or cartons
            </p>

            <form className="p-2" onSubmit={handleSubmit}>
              <label className="text-center w-100 mb-4">
                {drug && drug.name}
              </label>
              <div className="form-group mr-2">
                <label>No of packs</label>
                <input
                  name="numberOfContainers"
                  type="number"
                  placeholder={"00"}
                  className="form-control"
                  value={details.numberOfContainers}
                  onChange={handleChange}
                />
              </div>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group ml-2">
                    <label>No of tablets</label>
                    <input
                      name="numberOfUnits"
                      className="form-control"
                      type="number"
                      onChange={handleChange}
                      placeholder="00"
                      value={details.numberOfUnits}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group mr-2">
                    <label>No of cartons</label>
                    <input
                      name="numberOfCartons"
                      type="number"
                      placeholder={"00"}
                      className="form-control"
                      value={details.numberOfCartons}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="col text-right">
                <button
                  className="btn btn-outline-danger mr-3"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddPrescriptionQuantity };
