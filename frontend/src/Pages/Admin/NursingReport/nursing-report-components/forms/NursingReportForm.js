import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../../api/fetcher";
import { updateNursingReportUrl } from "../../../../../api/URLs";
import { notification } from "../../../../../utils/notification";
import { isNotEmptyString } from "../../../../../utils/validationUtils";

const NursingReportForm = ({ nurseId, id }) => {
  const [payload, setPayload] = useState({
    nursingAssessment: "",
    nursingDiagnosis: "",
    nursingObjectives: "",
    nursingActions: "",
    nursingEvaluation: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const {
      nursingAssessment,
      nursingDiagnosis,
      nursingObjectives,
      nursingActions,
      nursingEvaluation,
    } = payload;
    if (
      isNotEmptyString(nursingAssessment) &&
      isNotEmptyString(nursingDiagnosis) &&
      isNotEmptyString(nursingObjectives) &&
      isNotEmptyString(nursingActions) &&
      isNotEmptyString(nursingEvaluation)
    ) {
      setEmptyField(false);
    } else {
      setEmptyField(true);
    }
  }, [payload]);
  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, nurseId, id };
    try {
      const updateNursingReport = updateNursingReportUrl();
      const updateNursingReportConfig = fetchConfig({
        url: updateNursingReport,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateNursingReportConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        // history.push("/AdminManageHMO");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  return (
    <div className="card border-light p-4 w-50 m-auto">
      <div className="card-body">
        <form className="mb-4" onSubmit={handleSubmit}>
          <h5 className="text-center">Nursing Report</h5>
          <div className="form-group">
            <label>Nursing assessment</label>{" "}
            <textarea
              className="form-control"
              name="nursingAssessment"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nursing diagnosis</label>{" "}
            <textarea
              className="form-control"
              name="nursingDiagnosis"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nursing objectives</label>{" "}
            <textarea
              className="form-control"
              name="nursingObjectives"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nursing actions</label>{" "}
            <textarea
              className="form-control"
              name="nursingActions"
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Nursing evaluation</label>{" "}
            <textarea
              className="form-control"
              name="nursingEvaluation"
              onChange={handleChange}
            />
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button
                type="submit"
                disabled={emptyField ? true : false}
                className="btn btn-primary"
              >
                Save report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NursingReportForm };
