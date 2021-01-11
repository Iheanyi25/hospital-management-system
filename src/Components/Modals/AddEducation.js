import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;

const AddEducation = ({
  doctorId,
  doctorEmail,
  updatePatientDetails,
  displaySuccess,
}) => {
  const [details, setDetails] = useState({
    degree: "",
    institution: "",
    startYear: "",
    endYear: "",
    doctorProfileId: doctorId,
    createdBy: doctorEmail,
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${apiUrl}/Doctor/AddDoctorEducation`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify([details]),
        redirect: "follow",
      });
      console.log(res);
      if (res.status === 200) {
        displaySuccess(res.message);
        updatePatientDetails();
        $("#add-education").modal("hide");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-education"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Education</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Institution</label>
                <input
                  id="name"
                  name="institution"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Institution"
                />
              </div>
              <div className="form-group">
                <label>Certification</label>
                <select
                  className="form-control"
                  name="degree"
                  onChange={handleChange}
                >
                  <option value="" selected disabled>
                    Select a certificate
                  </option>
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                </select>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputEmail4">Start</label>
                  <input
                    type="number"
                    name="startYear"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="eg. 1990"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPassword4">End</label>
                  <input
                    type="number"
                    name="endYear"
                    className="form-control"
                    onChange={handleChange}
                    placeholder="eg. 1990"
                  />
                </div>
              </div>
              <div className="col"></div>
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

export { AddEducation };
