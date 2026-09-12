import React, { useState } from "react";
import { Fragment } from "react";
import Select from "react-select";
import { fetchConfig } from "../../../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../../../api/fetcher";
import { createPostnatalUrl, getPatientsUrl } from "../../../../../api/URLs";
import { notification } from "../../../../../utils/notification";

const RecordForm = () => {
  const [payload, setPayload] = useState({
    deliveryDate: "",
    deliveryTime: "",
    deliveryMethod: "",
    deliveryNote: "",
    durationOfLabour: "",
    placenta: "",
    oxytocin: "",
    apgarScoreAtOneMinute: "",
    apgarScoreAtFiveMinutes: "",
    height: "",
    weight: "",
    remarks: "",
  });
  const [patient, setPatient] = useState();
  const [baby, setBaby] = useState();
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
  const handlePatient = (patient) => {
    setPatient(patient);
  };
  const handleBaby = (baby) => {
    setBaby(baby);
  };

  const handleChange = (e) => {
    setPayload({
      ...payload,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...payload, deliveredById: patient.value, gender: baby.value };
    try {
      const createPostnatal = createPostnatalUrl();
      const createPostnatalConfig = fetchConfig({
        url: createPostnatal,
        data: data,
        method: "post",
      });
      const res = await fetchWrapper(createPostnatalConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(data);
  };
  return (
    <Fragment>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="form-row">
              <div className="form-group col-md-8">
                <label htmlFor="inputEmail4">Delivery Date</label>
                <input
                  type="date"
                  name="deliveryDate"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="eg. 1990"
                />
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Delivery Time</label>
                <input
                  type="time"
                  name="deliveryTime"
                  className="form-control"
                  onChange={handleChange}
                  placeholder="eg. 1990"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Duration of Labour</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="durationOfLabour"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Delivery Method</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="deliveryMethod"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Placenta</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="placenta"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Oxytocin</label>
                <input
                  className="form-control"
                  type="text"
                  tabIndex={-98}
                  name="oxytocin"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Baby</label>
                <Select
                  value={baby}
                  isSearchable={true}
                  options={[
                    { label: "Boy", value: "Boy" },
                    { label: "Girl", value: "Girl" },
                  ]}
                  onChange={handleBaby}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>APGAR Score At 1 Min</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="apgarScoreAtOneMinute"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>APGAR Score At 5 Min</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="apgarScoreAtFiveMinutes"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Height</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="height"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-md-4">
                <label>Weight</label>
                <input
                  className="form-control"
                  type="number"
                  tabIndex={-98}
                  name="weight"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Delivery By</label>
                <Select
                  value={patient}
                  isSearchable={true}
                  options={options}
                  onChange={handlePatient}
                  placeholder={
                    error ? "Sorry, unable to fetch. Retry" : "Search"
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-8">
                <label>Comment</label>
                <textarea
                  className="form-control"
                  placeholder="Specify cause of death if known"
                  onChange={handleChange}
                  name="remarks"
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="card border-light">
              <div className="card-body">
                <div className="form-group">
                  <label>Delivery Note</label>
                  <textarea
                    className="form-control"
                    placeholder="Delivery Note"
                    onChange={handleChange}
                    name="deliveryNote"
                  />
                </div>
                <div className="row">
                  <div className="col"></div>
                  <div className="col text-right">
                    <button type="submit" className="btn btn-primary">
                      Post delivery note
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </Fragment>
  );
};
export { RecordForm };
