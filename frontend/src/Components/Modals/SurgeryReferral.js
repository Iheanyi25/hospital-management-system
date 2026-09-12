import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createDoctorSurgeryUrl, getPatientsUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import { formatInputDate } from "../../utils/formatInputDate";
import Select from "react-select";

const $ = window.$;
const SurgeryReferral = observer(
  ({ id, idType, patientId, mutate, emergency }) => {
    let history = useHistory();
    const {
      user: { id: initiatorId, userType },
    } = useContext(UserContext);
    const [payload, setpayload] = useState({
      id,
      referralNote: "",
      initiatorId,
      idType: idType || "",
      patientId,
      dateOfSurgery: "",
      timeOfSurgery: "",
    });
    const [patient, setPatient] = useState();
    const getPatients = getPatientsUrl(1, 200);
    const getPatientsConfig = fetchConfig({
      url: getPatients,
      method: "get",
    });
    const { data, error } = useRequest(getPatientsConfig, {
      revalidateOnFocus: false,
    });
    let options = [];
    if (data?.patients.length > 0) {
      data.patients.forEach(({ patientId: id, firstName, lastName }) => {
        options.push({ value: id, label: `${firstName} ${lastName}` });
      });
    }
    const handleSelect = (patient) => {
      setPatient(patient);
    };
    const handleChange = (e) => {
      setpayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
    };
    const finishClarking = async (e, key) => {
      e.preventDefault();
      const data = emergency
        ? { ...payload, patientId: patient.value }
        : { ...payload, patientId };
      try {
        const createDoctorSurgery = createDoctorSurgeryUrl();
        const createDoctorSurgeryConfig = fetchConfig({
          url: createDoctorSurgery,
          data: data,
          method: "post",
        });
        const res = await fetchWrapper(createDoctorSurgeryConfig);
        if (res.status === 200) {
          $("#surgery-referral").modal("hide");
          setpayload({
            dateOfSurgery: "",
            referralNote: "",
            timeOfSurgery: "",
          });
          notification.success({ message: res.data.message });
          if (emergency) {
            mutate();
          } else if (userType === "Admin") {
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
                    {emergency ? (
                      <div className="form-group">
                        <label>Search Patient with:</label>
                        <Select
                          value={patient}
                          isSearchable={true}
                          options={options}
                          onChange={handleSelect}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
                    ) : null}
                    <div className="row">
                      <div className="col-12 col-sm-6">
                        <div className="form-group">
                          <label>
                            Surgery Date
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
  }
);
export default SurgeryReferral;
