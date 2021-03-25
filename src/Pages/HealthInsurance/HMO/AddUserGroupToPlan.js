import React from "react";
import Select from "react-select";
import { PageLoader } from "../../../Components";

export default function AddUserGroupToPlan() {
  const data = {
    patients: [
      { user: "Mark", id: "0292" },
      { user: "Jacob", id: "0292" },
      { user: "Larry", id: "0292" },
      { user: "Jacob", id: "0292" },
      { user: "Mark", id: "0292" },
    ],
  };
  let patientOptions = [];
  if (data.patients.length > 0) {
    data.patients.forEach(({ id, user }) => {
      patientOptions.push({ value: id, label: user });
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
            <h4 className="page-title mb-0">Add User Sub Groups To HMO Plan</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">Add User Sub Groups</h4>
                      <div className="form-group">
                        <label>Search User Group:</label>
                        <Select
                          isSearchable
                          options={patientOptions}
                          placeholder="Search "
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Add user group
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
