import React, { useState, useContext } from "react";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createDrugMedicationUrl, getAllDrugsUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import Select from "react-select";

const $ = window.$;
const UpdateMedications = observer(({ admissionId, mutate }) => {
  const {
    user: { id: initiatorId },
  } = useContext(UserContext);
  const [payload, setpayload] = useState({
    administrationInstruction: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
    status: "In progress",
    initiatorId,
  });
  const [drugDetails, setDrugDetails] = useState();
  const getDrugsUrl = getAllDrugsUrl(1, 200);
  const getDrugConfig = fetchConfig({
    url: getDrugsUrl,
    method: "get",
  });
  const { data } = useRequest(getDrugConfig, {
    revalidateOnFocus: false,
  });

  const handleChange = (e) => {
    setpayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (drugDetails) => {
    setDrugDetails(drugDetails);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, drugId: drugDetails.value, admissionId };

    try {
      const createMedication = createDrugMedicationUrl();
      const createMedicationConfig = fetchConfig({
        url: createMedication,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createMedicationConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        mutate();
        $("#update-medication").modal("hide");
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
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Update medications</h5>
            <form className="p-3" onSubmit={handleSubmit}>
              <div className="d-block d-md-flex justify-content-between">
                <div style={{ flex: "1" }} className="mr-md-4">
                  <UpdateMedicationForm
                    handleChange={handleChange}
                    handleClick={handleClick}
                    drugDetails={drugDetails}
                    drugs={data?.drugs}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
});
export default UpdateMedications;

const UpdateMedicationForm = ({
  handleChange,
  drugs,
  handleClick,
  drugDetails,
}) => {
  const options = [];

  if (drugs?.length > 0) {
    drugs.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }
  return (
    <>
      <div className="form-group">
        <label>Administration Instructions</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter administration instructions"
          onChange={handleChange}
          name="administrationInstruction"
          required
        />
      </div>
      <div className="form-group">
        <label>Dosage</label>
        <input
          type="text"
          className="form-control"
          name="dosage"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Frequency</label>
        <input
          type="text"
          className="form-control"
          name="frequency"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Commencement Date</label>
        <input
          type="date"
          className="form-control"
          name="startDate"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Stop Date</label>
        <input
          type="date"
          className="form-control"
          name="endDate"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Medication</label>
        <Select options={options} value={drugDetails} onChange={handleClick} />
      </div>
      <div className="col"></div>
      <div className="d-flex justify-content-between">
        <button className="btn btn-outline-danger mr-3" data-dismiss="modal">
          Close
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </>
  );
};
