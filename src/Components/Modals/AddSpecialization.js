import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;

const AddSpecialization = ({ doctorId, updatePatientDetails }) => {

  const [details, setDetails] = useState({
    specialization: "",
    doctorProfileId: doctorId,
  });

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(details).includes("")) {
      return;
    }
    try {
      let res = await fetch(`${apiUrl}/Doctor/AddDoctorSpecialization`, {
        headers: { 'Content-Type': 'application/json-patch+json' },
        method: 'POST',
        body: JSON.stringify([details]),
        redirect: 'follow',
      });
      console.log(res);
      if (res.status === 200) {
        updatePatientDetails()
        $('#add-specialization').modal('hide')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-specialization"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add specialization</h5>
            <form className="p-5" onSubmit={handleSubmit} >
              <div className="form-group">
                <label>Specialization</label>
                <input
                  id="name"
                  name="specialization"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Specialization"
                />
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

export { AddSpecialization };
