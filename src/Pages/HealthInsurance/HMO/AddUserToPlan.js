import React from "react";
import Select from "react-select";
import add from "../../../assets/img/add.svg";
import { PageLoader } from "../../../Components";

export default function AddUserToPlan() {
  const data = {
    patients: [
      { user: "Mark", id: "0292" },
      { user: "Jacob", id: "0292" },
      { user: "Larry", id: "0292" },
      { user: "Jacob", id: "0292" },
      { user: "Mark", id: "0292" },
    ],
    plans: [
      { type: "Mark", id: "0292" },
      { type: "Jacob", id: "0292" },
      { type: "Larry", id: "0292" },
      { type: "Jacob", id: "0292" },
      { type: "Mark", id: "0292" },
    ],
  };
  let patientOptions = [];
  if (data.patients.length > 0) {
    data.patients.forEach(({ id, user }) => {
      patientOptions.push({ value: id, label: user });
    });
  }
  let planOptions = [];
  if (data.plans.length > 0) {
    data.plans.forEach(({ id, type }) => {
      planOptions.push({ value: id, label: type });
    });
  }
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title mb-0">Add A Patient To HMO Plan</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">Add User</h4>
                      <div className="form-group">
                        <label>Search Patient with:</label>
                        <Select
                          isSearchable
                          options={patientOptions}
                          placeholder="Email, Name or Username"
                        />
                      </div>
                      <div className="d-flex mt-3 mb-3">
                        <img
                          src={add}
                          alt="reset"
                          className="mr-2 mb-2"
                          style={{ cursor: "pointer" }}
                        />
                        <p className="">Add a new patient</p>
                      </div>
                      <div className="form-group">
                        <label>Select Health Plan</label>
                        <Select
                          isSearchable
                          options={patientOptions}
                          placeholder="Search"
                        />
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
