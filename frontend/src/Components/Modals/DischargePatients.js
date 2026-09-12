import { observer } from "mobx-react";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postDischargePatientUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;
const DischargePatients = observer(({ admissionId }) => {
  const { goBack } = useHistory();
  const [payload, setpayload] = useState({
    dischargeNote: "",
    admissionId,
  });
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postDischargePatient = postDischargePatientUrl();
    const postDischargePatientConfig = fetchConfig({
      url: postDischargePatient,
      method: "post",
      data: payload,
    });
    try {
      let res = await fetchWrapper(postDischargePatientConfig);
      if (res.status === 200) {
        $("#discharge-patient").modal("hide");
        notification.success({ message: res?.data?.message });
        goBack();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="discharge-patient"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">Discharge Patient</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Discharge Notes</label>{" "}
                  <textarea
                    className="form-control"
                    placeholder="Enter discharge note"
                    name="dischargeNote"
                    rows={3}
                    required
                    onChange={handleChange}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col text-left">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col text-right">
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export { DischargePatients };
