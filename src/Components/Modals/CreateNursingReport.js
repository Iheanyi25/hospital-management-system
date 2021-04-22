import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { createNurseReportUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;

const CreateNursingReport = ({ nurseId, mutate }) => {
  const [shift, setShift] = useState();
  const handleChange = (shift) => {
    setShift(shift);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { nurseId, shift: shift.value };
    const createNurseReport = createNurseReportUrl();
    const createNurseReportConfig = fetchConfig({
      url: createNurseReport,
      method: "post",
      data: payload,
    });
    try {
      const res = await fetchWrapper(createNurseReportConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        $("#create-nursing-report").modal("hide");
        mutate();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  return (
    <div
      className="modal fade"
      id="create-nursing-report"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Create Report</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Shift selection</label>
                <Select
                  value={shift}
                  isSearchable={false}
                  options={[
                    { value: "Morning", label: "Morning" },
                    { value: "Evening", label: "Evening" },
                  ]}
                  onChange={handleChange}
                  placeholder="Select a shift"
                />
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col text-right">
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Create report
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateNursingReport };
