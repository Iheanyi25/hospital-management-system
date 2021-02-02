import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorEducationUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;

const AddEducation = ({
  doctorId,
  doctorEmail,
  updatePatientDetails,
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
    if (Object.values(details).includes("")) {
      return;
    }
    try {
      const postDoctorEducation = postDoctorEducationUrl()
      const postDoctorEducationConfig = fetchConfig({url : postDoctorEducation, data:JSON.stringify([details]), method : 'post'})
      const res = await fetchWrapper(postDoctorEducationConfig)

      if (res.status === 200) {
        notification.success({ message: res.data.message });
        updatePatientDetails();
        $("#add-education").modal("hide");
      }
    } catch (error) {
      console.log(error);
      const errMessage = error?.response?.data?.message || "An error occurred";
      notification.error({ message: errMessage });
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
                    Select a category
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
