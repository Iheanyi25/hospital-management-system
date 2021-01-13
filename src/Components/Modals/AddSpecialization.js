import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorSpecializationUrl } from "../../api/URLs";

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
      const postDoctorSpecialization = postDoctorSpecializationUrl()
      const postDoctorSpecializationConfig = fetchConfig({url : postDoctorSpecialization, data:JSON.stringify([details]), method : 'post'})
      const res = await fetchWrapper(postDoctorSpecializationConfig)

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
