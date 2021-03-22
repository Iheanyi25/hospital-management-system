import React, { useState, useContext, useEffect } from "react";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { createMedicationUrl, getAllDrugsUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { observer } from "mobx-react";
import { UserContext } from "../../mobx/UserState";
import Select from "react-select";
import removeIcon from "../../assets/img/remove.svg";

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
            <form className="p-3" onSubmit={handleSubmit}>
              <div className="d-block d-md-flex justify-content-between">
                <div style={{ width: "48%" }}><UpdateMedicationForm handleChange={handleChange}/></div>
                <div style={{ width: "48%" }} className="card border-light">
                  <MedicationDrugs drugs={data?.drugs} />
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

const UpdateMedicationForm = ({handleChange}) => {
  return (
    <>
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

const MedicationDrugs = ({ drugs }) => {
  const [drugList, setDrugList] = useState([]);
  const [preventAddingDrug, setPreventAddingDrug] = useState("");
  const options = [];

  if (drugs?.length > 0) {
    drugs.forEach(({ id, name }) => {
      options.push({ value: id, label: name });
    });
  }

  useEffect(() => {
    setTimeout(() => setPreventAddingDrug(""), 450);
  }, [preventAddingDrug]);

  const handleClick = (newDrug) => {
    const checkDrug = drugList.find((drug) => drug.label === newDrug.label);
    if (!checkDrug) {
      setDrugList([...drugList, newDrug]);
    } else {
      setPreventAddingDrug(newDrug.label);
    }
  };

  const removeFromList = (index) => {
    setDrugList([...drugList.slice(0, index), ...drugList.slice(index + 1)]);
  };

  return (
    <div className="card-body">
      <Select options={options} onChange={handleClick} />
      <div className="py-4">
        {drugList.map(({ value: id, label }, index) => (
          <div
            className="d-flex justify-content-between py-3"
            key={id}
            style={{
              background: preventAddingDrug === label ? "#E8F1FE" : "",
            }}
          >
            <div className="text-bold">{label}</div>
            <div onClick={() => removeFromList(index)} className="cursor">
              <img src={removeIcon} alt="delete" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
