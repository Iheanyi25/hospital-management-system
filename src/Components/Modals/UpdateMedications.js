import React, { useState, useContext } from "react";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createMedicationUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";

const $ = window.$;

const UpdateMedications = observer(({ admissionId, mutate }) => {
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    medication: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    status: "",
    initiatorId,
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
    console.log(payload);
    try {
      const createMedication = createMedicationUrl();
      const createMedicationConfig = fetchConfig({
        url: createMedication,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(createMedicationConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#doctors-note").modal("hide");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  return (
    <div
      className="modal fade"
      id="update-medication"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Update medications</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Medication Title</label>
                    <input
                      className="form-control"
                      name="medication"
                      type="text"
                      tabIndex={-98}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Administration Instructions</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      placeholder="Enter administration instructions"
                      name="medication"
                      required
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Dosage</label>
                      <input
                        type="text"
                        className="form-control"
                        name="dosage"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>-</label>
                      <select
                        className="form-control"
                        name="workDays"
                        onChange={handleChange}
                      >
                        <option value="Monday">G</option>
                        <option value="Tuesday">H</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Frequency</label>
                      <input
                        type="text"
                        className="form-control"
                        name="frequency"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>-</label>
                      <select
                        className="form-control"
                        name="workDays"
                        onChange={handleChange}
                      >
                        <option value="Monday">G</option>
                        <option value="Tuesday">H</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label>Commencement Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="startDate"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label>Stop Date</label>
                      <input
                        type="date"
                        className="form-control"
                        name="endDate"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col"></div>
                  <div className="col text-right">
                    <button
                      className="btn btn-outline-danger mr-3"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save
                    </button>
                  </div>
                </div>
                <div className="col-12 col-md-6">2nd col</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default UpdateMedications;
