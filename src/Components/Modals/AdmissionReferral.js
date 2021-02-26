import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { postAdmitOrSendPatientHomeUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
const AdmissionReferral = observer(({ id }) => {
  let history = useHistory();
  const {
    user: { id: initiatorId, userType },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    id,
    isAdmitted: true,
    isSentHome: false,
    admissionNote: "",
    initiatorId,
  });
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const finishClarking = async (e, key) => {
    e.preventDefault();
    try {
      const postAdmitOrSendPatientHome = postAdmitOrSendPatientHomeUrl();
      const postAdmitOrSendPatientHomeConfig = fetchConfig({
        url: postAdmitOrSendPatientHome,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postAdmitOrSendPatientHomeConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        if (userType === "Admin") {
          history.push("/AdminViewReferredPatients");
        } else {
          history.push("/");
        }
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  return (
    <>
      <div
        className="modal fade"
        id="admission-referral"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Please enter admission note</h5>
              <form className="" onSubmit={finishClarking}>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    type="text"
                    tabIndex={-98}
                    placeholder="Enter admission notes"
                    name="admissionNote"
                    multiple="true"
                    onChange={handleChange}
                    required
                  />
                  <div className="row mt-4 mx-0 p-0">
                    <div className="col"></div>
                    <div className="col text-right">
                      <button
                        type="submit"
                        onSubmit={finishClarking}
                        className="btn btn-primary"
                      >
                        Send to admission
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
});
export default AdmissionReferral;
