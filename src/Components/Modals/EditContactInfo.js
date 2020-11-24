import React, { useState } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;

const EditContactInfo = ({
  doctor,
  doctorId,
  doctorEmail,
  updatePatientDetails,
  displaySuccess
}) => {

  const [details, setDetails] = useState({
    phoneNumber: doctor.doctor.phoneNumber,
    city: doctor.city,
    state: doctor.state,
    country: doctor.country,
    email: doctor.doctor.email,
    doctorId: doctorId,
    createdBy: doctorEmail,
  });

  const handleChange = (e) => {
    console.log(details);
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch(`${apiUrl}/Doctor/UpdateDoctorContactDetails`, {
        headers: { "Content-Type": "application/json-patch+json" },
        method: "POST",
        body: JSON.stringify(details),
        redirect: "follow",
      });
      console.log(res);
      if (res.status === 200) {
        displaySuccess(res.message);
        updatePatientDetails();
        $("#add-contact-info").modal("hide");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="modal fade"
      id="add-contact-info"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Edit contact information</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Email</label>
                <input
                  id="name"
                  name="name"
                  className="form-control"
                  type="text"
                  placeholder="Phone Number"
                  value={doctor.doctor.email}
                  disabled
                />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input
                  name="phoneNumber"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Phone Number"
                  value={details.phoneNumber}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  name="city"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="City"
                  value={details.city}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  name="state"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="State"
                  value={details.state}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  name="country"
                  className="form-control"
                  type="text"
                  onChange={handleChange}
                  placeholder="Country"
                  value={details.country}
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

export { EditContactInfo };
