import React from "react";
import { PageLoader } from "../../../Components";

export default function CreateInsurance() {
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap w-75">
          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">
                        Create Government NHIS Type
                      </h4>
                      <div className="form-group">
                        <label>Plan Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Percentage to be paid by patient (%)</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Amount to be paid by Government</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Select Health Plan Type</label>
                        <select className="form-control" name="workDays">
                          <option value="">A</option>
                          <option value="Monday">B</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <textarea
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          required
                        />
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Submit
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
