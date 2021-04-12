import React, { useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDoctorRejectAppointmentUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;

const RejectAppointment = ({ appointmentId, mutate }) => {
  const [rejectionNote, setRejectionNote] = useState("");
  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const data = { appointmentId, rejectionNote };
    try {
      const postDoctorRejectAppointment = postDoctorRejectAppointmentUrl();
      const postDoctorRejectAppointmentConfig = fetchConfig({
        url: postDoctorRejectAppointment,
        method: "post",
        data,
      });
      const res = await fetchWrapper(postDoctorRejectAppointmentConfig);
      console.log(res, 777);
      if (res.status === 200) {
        notification.success({ message: "Appointment rejected successfully" });
        await mutate();
        $("#reject-appointment").modal("hide");
      }
    } catch (err) {
      notification.error({ message: "Operation failed" });
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="reject-appointment"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Please enter a reason for rejection</h5>
              <form className="" onSubmit={handleSubmit}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    tabIndex={-98}
                    placeholder="Enter rejection notes"
                    name="rejectionNote"
                    multiple="true"
                    onChange={(e) => setRejectionNote(e.target.value)}
                    required
                  />
                  <div className="row mt-4 mx-0 p-0">
                    <div className="col"></div>
                    <div className="col text-right">
                      <button type="submit" className="btn btn-primary">
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { RejectAppointment };
