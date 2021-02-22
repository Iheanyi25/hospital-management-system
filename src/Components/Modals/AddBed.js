import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorEducationUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;

const AddBed = ({ doctorId, doctorEmail, updatePatientDetails }) => {
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
    // if (Object.values(details).includes("")) {
    //   return;
    // }
    // try {
    //   const postDoctorEducation = postDoctorEducationUrl();
    //   const postDoctorEducationConfig = fetchConfig({
    //     url: postDoctorEducation,
    //     data: JSON.stringify([details]),
    //     method: "post",
    //   });
    //   const res = await fetchWrapper(postDoctorEducationConfig);

    //   if (res.status === 200) {
    //     notification.success({ message: res.data.message });
    //     updatePatientDetails();
    //     $("#add-education").modal("hide");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   const errMessage = error?.response?.data?.message || "An error occurred";
    //   notification.error({ message: errMessage });
    // }
  };

  return (
    <div
      className="modal fade"
      id="add-bed"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Add Bed</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  id="name"
                  name="institution"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Name of bed"
                />
              </div>
              <div className="col"></div>
              <div className="col text-right">
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AddBed };
