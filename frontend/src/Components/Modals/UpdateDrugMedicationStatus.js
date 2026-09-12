import React, { useState } from "react";
import Select from "react-select";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  updateDrugMedicationStatusUrl,
  updateServiceMedicationStatusUrl,
} from "../../api/URLs";
import { notification } from "../../utils/notification";

const $ = window.$;

const UpdateMedicationStatus = ({ medicationId, medicationType, mutate }) => {
  console.log(medicationId, "1212");
  const [status, setStatus] = useState();
  const handleChange = (status) => {
    setStatus(status);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { status: status.value, medicationId };
    try {
      const updateMedicationStatus =
        medicationType === "service"
          ? updateServiceMedicationStatusUrl()
          : updateDrugMedicationStatusUrl();
      const updateMedicationStatusConfig = fetchConfig({
        url: updateMedicationStatus,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(updateMedicationStatusConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $(`#update-medication-status-${medicationId}`).modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  const options = [
    { label: "Discontinue", value: "Discontinued" },
    { label: "Complete", value: "Completed" },
  ];
  return (
    <div
      className="modal fade"
      id={`update-medication-status-${medicationId}`}
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Set Medication Status</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Select a medication status</label>
                <Select
                  value={status}
                  isSearchable={false}
                  options={options}
                  onChange={handleChange}
                  placeholder="Search"
                />
              </div>
              <div className="row mx-0">
                <div className="col"></div>
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
  );
};

export { UpdateMedicationStatus };
