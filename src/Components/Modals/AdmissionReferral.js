import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { postDoctorAdmitOrSendPatientHomeUrl } from "../../api/urlCategories/doctorUrls";
import {
  postAdmitOrSendPatientHomeUrl,
  updatePatientClerkingUrl,
} from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
const AdmissionReferral = observer(({ id }) => {
  const {
    user: { id: initiatorId },
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
//  const handleSubmit = async (e) => {
//     e.preventDefault();
 
//   };

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
            //this.props.history.push("/AdminViewReferredPatients");
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
            <div className="modal-body p-5 shadow-lg d-flex justify-content-center align-item-center">
              <div className="w-75 text-center">
                <h5 className="text-center m-4">Please enter admission note</h5>
                {/* <Link to="/AdminDoctorsNotes" className="col-3">Wardround</Link> */}
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
                    {/* <
                      name="admissionNote"
                      placeholder="Enter admission notes"
                      classname="form-control text-muted"
                      onChange={handleChange}
                      id=""
                      style={{ width: "100%", height: "96px" }}
                    /> */}
                    <div className="row mt-4 mx-0 p-0">
                      {/* <div className="col"> */}
                      <button
                        className="btn col-3 mr-2 btn-outline-danger"
                        data-dismiss="modal"
                      >
                        Cancel
                      </button>
                      <Link to="/AdminWardRoundNotes" className="col-3">
                        Wardround
                      </Link>
                      <button
                        type="submit"
                        onSubmit={finishClarking}
                        className="btn btn-primary col-5 px-5 ml-3"
                      >
                        Send to admission
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
export default AdmissionReferral;
