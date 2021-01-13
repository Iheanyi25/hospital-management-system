import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorExperienceUrl } from "../../api/URLs";

const $ = window.$;

const AddExperience = ({
  doctorId,
  doctorEmail,
  updatePatientDetails,
  displaySuccess,
}) => {
  const [details, setDetails] = useState({
    role: "",
    company: "",
    startYear: "",
    endYear: "",
    doctorProfileId: doctorId,
    createdBy: doctorEmail,
  });

  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    if (e.target.checked) {
      setDetails({ ...details, endYear: "till date" });
      setChecked(e.target.checked);
    } else {
      setDetails({
        ...details,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.values(details).includes("")) {
      return;
    }

    try {
      const postDoctorExperience = postDoctorExperienceUrl()
      const postDoctorExperienceConfig = fetchConfig({url : postDoctorExperience, data:JSON.stringify([details]), method : 'post'})
      const res = await fetchWrapper(postDoctorExperienceConfig)
      
      if (res.status === 200) {
        displaySuccess();
        updatePatientDetails();
        $("#add-experience").modal("hide");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-experience"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Experience</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Company</label>
                <input
                  name="company"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Company"
                />
              </div>
              <div className="form-group">
                <label>Role</label>
                <input
                  name="role"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Role"
                />
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
                    disabled={checked ? true : false}
                  />
                </div>
              </div>
              <div className="custom-control custom-checkbox mb-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                  onChange={handleChange}
                />{" "}
                <label className="custom-control-label" for="customCheck1">
                  Currently working here?
                </label>
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

export { AddExperience };
