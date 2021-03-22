import React from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getAllHealthPlansUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";

export default function CreateHMO() {
  const getAllHealthPlans = getAllHealthPlansUrl(1, 200);
  const getAllHealthPlansConfig = fetchConfig({
    url: getAllHealthPlans,
    method: "get",
  });
  const { data, error } = useRequest(getAllHealthPlansConfig, {
    revalidateOnFocus: false,
  });
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
                      <h4 className="text-center">Create HMO Account</h4>
                      <div className="form-group">
                        <label>HMO Name</label>
                        <input
                          className="form-control"
                          type="text"
                          tabIndex={-98}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Account Email</label>
                        <input
                          className="form-control"
                          type="email"
                          tabIndex={-98}
                          name="name"
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Select Health Plan Type</label>
                        <select className="form-control">
                          <option value="" selected="true" disabled>
                            {data?.healthPlans.length > 0
                              ? "Select health plan"
                              : error
                              ? "No healthplans loaded"
                              : "Loading..."}
                            {/** added loading state to the form */}
                          </option>
                          {data?.healthPlans.length > 0 &&
                            data?.healthPlans.map(({ name, id }, index) => (
                              <option
                                key={index}
                                value={`${name.toLowerCase()}#${id}`}
                              >
                                {name}
                              </option>
                            ))}
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
                            Create Account
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
