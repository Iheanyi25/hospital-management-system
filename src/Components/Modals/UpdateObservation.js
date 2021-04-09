import { observer } from "mobx-react";
import React, { useContext, useEffect, useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { postObservationChartUrl } from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";
import { isNotEmptyString } from "../../utils/validationUtils";

const $ = window.$;
const UpdateObservationChart = observer(({ admissionId, mutate }) => {
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);
  const [details, setDetails] = useState({
    admissionId,
    bloodPressure: "",
    respiration: "",
    pulse: "",
    spO2: "",
    temperature: "",
    remarks: "",
    initiatorId,
  });
  const [emptyField, setEmptyField] = useState(true);

  useEffect(() => {
    const {
      bloodPressure,
      respiration,
      pulse,
      spO2,
      temperature,
      remarks,
    } = details;
    if (
      isNotEmptyString(bloodPressure) &&
      isNotEmptyString(respiration) &&
      isNotEmptyString(pulse) &&
      isNotEmptyString(spO2) &&
      isNotEmptyString(temperature) &&
      isNotEmptyString(remarks)
    ) {
      setEmptyField(false);
    } else {
      setEmptyField(true);
    }
  }, [details]);
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postObservationChart = postObservationChartUrl();
    const postObservationChartConfig = fetchConfig({
      url: postObservationChart,
      method: "post",
      data: details,
    });
    try {
      let res = await fetchWrapper(postObservationChartConfig);
      console.log(res, 2021);
      if (res.status === 200) {
        mutate();
        $("#update-observation").modal("hide");
        notification.success({ message: res?.data?.message });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="update-observation"
        tabIndex={-1}
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <h5 className="text-center">Observation Chart</h5>
              <form className="p-5" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Blood Pressure</label>
                    <input
                      className="form-control"
                      type="text"
                      name="bloodPressure"
                      onChange={handleChange}
                      value={details?.bloodPressure}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Temperature</label>
                    <input
                      className="form-control"
                      type="text"
                      name="temperature"
                      onChange={handleChange}
                      value={details?.temperature}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label>Pulse</label>
                    <input
                      className="form-control"
                      type="text"
                      name="pulse"
                      onChange={handleChange}
                      value={details?.pulse}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Respiration</label>
                    <input
                      className="form-control"
                      type="text"
                      name="respiration"
                      onChange={handleChange}
                      value={details?.respiration}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>SpO2</label>
                  <input
                    className="form-control"
                    type="text"
                    name="spO2"
                    onChange={handleChange}
                    value={details?.spO2}
                  />
                </div>
                <div className="form-group">
                  <label>Remarks</label>{" "}
                  <textarea
                    className="form-control"
                    placeholder="Enter Result"
                    rows={3}
                    name="remarks"
                    onChange={handleChange}
                    value={details?.remarks}
                  />
                </div>

                <div className="row mt-4">
                  <div className="col text-left">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-dismiss="modal"
                      onClick={() =>
                        setDetails({
                          bloodPressure: "",
                          respiration: "",
                          pulse: "",
                          spO2: "",
                          temperature: "",
                          remarks: "",
                        })
                      }
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="col text-right">
                    <button
                      type="submit"
                      disabled={emptyField ? true : false}
                      className="btn btn-primary"
                    >
                      {" "}
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

export { UpdateObservationChart };
