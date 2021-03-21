import React from "react";
import Select from "react-select";
import { PageLoader } from "../../../Components";

export default function AddDrugToNHIS() {
  const data = {
    drugs: [
      { drugName: "Mark", type: "Liquid", id: "12" },
      { drugName: "Jacob", type: "Liquid", id: "12" },
      { drugName: "Larry", type: "Liquid", id: "12" },
      { drugName: "Jacob", type: "Liquid", id: "12" },
      { drugName: "Mark", type: "Liquid", id: "12" },
    ],
  };
  let options = [];
  if (data.drugs.length > 0) {
    data.drugs.forEach(({ id, drugName }) => {
      options.push({ value: id, label: drugName });
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
            <h4 className="page-title mb-0">Add A Drug To Health plan name</h4>
          </header>
          <div className="page-content w-50 m-auto">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">Add Drug</h4>
                      <div className="form-group">
                        <label>Search & select drug(s)</label>
                        <Select
                          isSearchable
                          options={options}
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
