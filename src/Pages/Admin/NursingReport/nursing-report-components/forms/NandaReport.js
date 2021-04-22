import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { fetchWrapper } from "../../../../../api/fetcher";
import { updateNANDAReportUrl } from "../../../../../api/URLs";
import { notification } from "../../../../../utils/notification";
import { isNotEmptyString } from "../../../../../utils/validationUtils";

const NandaReport = ({ nurseId, id }) => {
  const [payload, setPayload] = useState({
    nandaReport: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { nandaReport } = payload;
    if (isNotEmptyString(nandaReport)) {
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
      const updateNANDAReport = updateNANDAReportUrl();
      const updateNANDAReportConfig = fetchConfig({
        url: updateNANDAReport,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(updateNANDAReportConfig);
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
          <h5 className="text-center">NANDA Report</h5>
          <div className="form-group">
            <label>Report description</label>{" "}
            <textarea
              className="form-control"
              name="nandaReport"
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

export { NandaReport };
