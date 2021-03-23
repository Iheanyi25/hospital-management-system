import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  assignPatientToHMOHealthPlanUrl,
  getPatientsUrl,
} from "../../../api/URLs";
import add from "../../../assets/img/add.svg";
import { PageLoader } from "../../../Components";
import { notification } from "../../../utils/notification";

export default function AddUserToPlan() {
  const {
    push,
    location: { state: healthPlanName },
  } = useHistory();
  const { id: hmoHealthPlanId } = useParams();
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
    data.patients.forEach(({ patient: { id, firstName, lastName } }) => {
      options.push({ value: id, label: `${firstName} ${lastName}` });
    });
  }
  const handleChange = (patient) => {
    setPatient(patient);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { patientId: patient.value, hmoHealthPlanId };
    try {
      const assignPatientToHMOHealthPlan = assignPatientToHMOHealthPlanUrl();
      const assignPatientToHMOHealthPlanConfig = fetchConfig({
        url: assignPatientToHMOHealthPlan,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(assignPatientToHMOHealthPlanConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        push({
          pathname: `/AddUserToPlan/${hmoHealthPlanId}`,
          state: healthPlanName,
        });
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
    console.log(payload);
  };
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">{`Add A Patient To ${healthPlanName}`}</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5" onSubmit={handleSubmit}>
                      <h4 className="text-center">Add User</h4>
                      <div className="form-group">
                        <label>Search Patient with:</label>
                        <Select
                          value={patient}
                          isSearchable={true}
                          options={options}
                          onChange={handleChange}
                          placeholder={
                            error ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>
                      <div className="d-flex mt-3 mb-3">
                        <Link to="/AdminAddPatients">
                          <img
                            src={add}
                            alt="reset"
                            className="mr-2 mb-2"
                            style={{ cursor: "pointer" }}
                          />
                        </Link>
                        <p className="">Add a new patient</p>
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Add to health plan
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
