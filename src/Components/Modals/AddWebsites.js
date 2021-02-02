import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorSocialUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
const $ = window.$;

const AddWebsites = ({
  doctorId,
  doctorEmail,
  updatePatientDetails,
}) => {
  const [details, setDetails] = useState({
    website: "",
    url: "",
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
      const postDoctorSocial = postDoctorSocialUrl()
      const postDoctorSocialConfig = fetchConfig({url : postDoctorSocial, data:JSON.stringify([details]), method : 'post'})
      const res = await fetchWrapper(postDoctorSocialConfig)

      if (res.status === 200) {
        notification.success({ message: res.data.message});
        updatePatientDetails();
        $("#add-websites").modal("hide");
      }
    } catch (error) {
      console.log(error);
      notification.error({ message:  error?.response?.data?.message});
    }
  };

  return (
    <div
      className="modal fade"
      id="add-websites"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Edit Socials</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Socials</label>
                <select className="form-control" name="website" onChange={handleChange}>
                  <option value="" selected disabled>
                    Select a social network
                  </option>
                  <option value="LinkedIn">LinkedIn</option>
                  <option value="Facebook">Facebook</option>
                  <option value="Twitter">Twitter</option>
                </select>
              </div>
              <div className="form-group">
                <label>url</label>
                <input
                  name="url"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="url"
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

export { AddWebsites };
