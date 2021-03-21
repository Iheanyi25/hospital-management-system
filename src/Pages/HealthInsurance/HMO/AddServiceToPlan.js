import React, { useState } from "react";
import Select from "react-select";
import { PageLoader } from "../../../Components";

export default function AddServiceToNHIS() {
  const [catgeoryId, setcatgeoryId] = useState("");
  const data = {
    categories: [
      { name: "Mark", category: "Liquid", id: "dwo" },
      { name: "Jacob", category: "Liquid", id: "dwo" },
      { name: "Larry", category: "Liquid", id: "dwo" },
      { name: "Jacob", category: "Liquid", id: "dwo" },
      { name: "Mark", category: "Liquid", id: "dwo" },
    ],
    services: [
      { name: "Mark", category: "Liquid", id: "dwo" },
      { name: "Jacob", category: "Liquid", id: "dwo" },
      { name: "Larry", category: "Liquid", id: "dwo" },
      { name: "Jacob", category: "Liquid", id: "dwo" },
      { name: "Mark", category: "Liquid", id: "dwo" },
    ],
  };
  let categoryOptions = [];
  if (data.categories.length > 0) {
    data.categories.forEach(({ id, name }) => {
      categoryOptions.push({ value: id, label: name });
    });
  }
  let serviceOptions = [];
  if (data.services.length > 0) {
    data.services.forEach(({ id, name }) => {
      serviceOptions.push({ value: id, label: name });
    });
  }
  const handleChange = (catgeoryId) => {
    setcatgeoryId(catgeoryId);
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
            <h4 className="page-title mb-0">Add Service To Health plan name</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">Add Service</h4>
                      <div className="form-group">
                        <label>Select Health Plan Category</label>
                        <Select
                          isSearchable
                          value={catgeoryId}
                          options={categoryOptions}
                          placeholder="Search"
                          onChange={handleChange}
                        />
                      </div>
                      {catgeoryId === "" ? null : (
                        <div className="form-group">
                          <label>Select Service</label>
                          <Select
                            isSearchable
                            options={categoryOptions}
                            placeholder="Search"
                          />
                        </div>
                      )}
                      <div className="form-group">
                        <label>Amount</label>
                        <input
                          className="form-control"
                          type="number"
                          tabIndex={-98}
                          name="name"
                          required
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
