import React, { useState } from "react";
import Select from "react-select";
import { fetchConfig } from "../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../api/fetcher";
import { createAntenatalUrl, getPatientsUrl } from "../../../../api/URLs";
import { notification } from "../../../../utils/notification";

const RecordForm = () => {
  const [payload, setPayload] = useState({
    patientId: "",
    firstTimePregnancy: false,
    previousSurgeries: "",
    numberOfDeadChildren: "",
    numberOfLivingChildren: "",
    causeOfDeath: "",
    lastPregnancyComplication: false,
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
    if (e.target.name === "firstTimePregnancy") {
      setPayload({
        ...payload,
        firstTimePregnancy: !payload.firstTimePregnancy,
      });
    } else {
      setPayload({
        ...payload,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, patientId: patient.value };
    try {
      const createAntenatal = createAntenatalUrl();
      const createAntenatalConfig = fetchConfig({
        url: createAntenatal,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createAntenatalConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        // history.push("/AdminManageHMO");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
  };
  return (
    <div className="card">
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Search Patient with:</label>
            <Select
              value={patient}
              isSearchable={true}
              options={options}
              onChange={handleSelect}
              placeholder={error ? "Sorry, unable to fetch. Retry" : "Search"}
            />
          </div>
          <div className="custom-control custom-radio mb-3">
            <input
              type="radio"
              className="custom-control-input"
              name="firstTimePregnancy"
              id="firstTimePregnancy"
              onChange={handleChange}
            //   value={payload?.firstTimePregnancy}
            />
            <label className="custom-control-label" for="firstTimePregnancy">
              First time pregnancy
            </label>
          </div>
          {/* <div className="form-group">
            <label>Previous Surgeries</label>
            <textarea
              className="form-control"
              placeholder="Previous surgeries"
              onChange={handleChange}
              name="previousSurgeries"
            />
          </div> */}
          <div className="row mb-2">
            <div className="col-4">
              <label>Any dead child</label>
              <input
                className="form-control w-75"
                type="text"
                tabIndex={-98}
                name="numberOfDeadChildren"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-4">
              <label>Any living child</label>
              <input
                className="form-control w-75"
                type="text"
                tabIndex={-98}
                onChange={handleChange}
                name="numberOfLivingChildren"
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Specify cause of death if known</label>
            <textarea
              className="form-control"
              placeholder="Specify cause of death if known"
              onChange={handleChange}
              name="causeOfDeath"
            />
          </div>
          <div className="row mb-2">
            <div className="col-4">
              <label>Any complication on last pregnancy</label>
              <input
                className="form-control w-75"
                type="text"
                tabIndex={-98}
                name="lastPregnancyComplication"
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label>Previous Surgeries</label>
            <textarea
              className="form-control"
              placeholder="Previous surgeries"
              onChange={handleChange}
              name="previousSurgeries"
            />
          </div>
          <div className="row">
            <div className="col"></div>
            <div className="col text-right">
              <button type="submit" className="btn btn-primary">
                Create report
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default RecordForm;
