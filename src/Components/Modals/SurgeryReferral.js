import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetchWrapper} from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createDoctorSurgeryUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import { formatInputDate } from "../../utils/formatInputDate";

const $ = window.$;
const SurgeryReferral = observer(({ id, idType, patientId, mutate }) => {
  console.log(idType, patientId, 1111);
  let history = useHistory();
  const {
    user: { id: initiatorId, userType },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    id,
    referralNote: "",
    initiatorId,
    idType,
    patientId,
    dateOfSurgery: "",
    timeOfSurgery: "",
  });
  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const finishClarking = async (e, key) => {
    e.preventDefault();
    console.log(payload, 8888);
    try {
      const createDoctorSurgery = createDoctorSurgeryUrl();
      const createDoctorSurgeryConfig = fetchConfig({
        url: createDoctorSurgery,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createDoctorSurgeryConfig);
      if (res.status === 200) {
        $("#surgery-referral").modal("hide");
        setpayload({ dateOfSurgery:"", referralNote:"", timeOfSurgery:""})
        notification.success({ message: res.data.message });
        mutate();
        if (userType === "Admin") {
          history.push("/AdminManageSurgeries");
        } else {
          history.push("/");
        }
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  const { dateOfSurgery, timeOfSurgery } = payload;

  return (
    <>
      <div
        className="modal fade"
        id="surgery-referral"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <h5>Please enter surgery note</h5>
              <form className="" onSubmit={finishClarking}>
                <div className="form-group">
                  <div className="pb-3">
                    <textarea
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      placeholder="Enter surgery notes"
                      name="referralNote"
                      multiple="true"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="row">
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>Surgery Date
                        <small className="text-danger">*</small>
                        </label>
                        <input
                          type="date"
                          min={formatInputDate()}
                          className="form-control"
                          tabIndex={-98}
                          placeholder="Date of surgery"
                          onChange={handleChange}
                          value={dateOfSurgery}
                          name="dateOfSurgery"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-6">
                      <div className="form-group">
                        <label>
                          Surgery Time
                          <small className="text-danger">*</small>
                        </label>

                        <input
                          type="time"
                          className="form-control"
                          tabIndex={-98}
                          placeholder="time of surgery"
                          onChange={handleChange}
                          value={timeOfSurgery}
                          name="timeOfSurgery"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row mt-4 mx-0 p-0">
                    <div className="col"></div>
                    <div className="col text-right">
                      <button
                        type="submit"
                        onSubmit={finishClarking}
                        className="btn btn-primary"
                      >
                        Send to surgery
                        <small className="text-danger">*</small>
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
export default SurgeryReferral;
