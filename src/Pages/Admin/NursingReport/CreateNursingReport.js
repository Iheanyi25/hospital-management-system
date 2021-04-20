import React, { Fragment } from "react";
import Select from "react-select";
import { PageLoader } from "../../../Components";
import NursingReportTabContent from "./nursing-report-components/NursingReportTabContent";
import NursingReportTabHeader from "./nursing-report-components/NursingReportTabHeader";

const CreateNursingReport = () => {
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <div className="row mx-0">
              <div className="col-12 col-md-6">
                <header className="page-header justify-content-between d-flex align-items-center mb-2">
                  <h4 className="page-title">Nursing report</h4>
                </header>
                <ShiftSelectionForm />
                <NursingReportTabHeader />
                <NursingReportTabContent />
              </div>
              <div className="col-12 col-md-6"></div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default CreateNursingReport;

const ShiftSelectionForm = () => {
  return (
    <form className="mb-4">
      <div className="form-row">
        <div className="form-group col-12 col-md-8">
          <label>Shift selection</label>
          <Select
            //   value={patient}
            isSearchable={false}
            options={[
              { value: "Morning", label: "Morning" },
              { value: "Evening", label: "Evening" },
            ]}
            //   onChange={handleChange}
            placeholder="Select shift"
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col-md-8">
          <label htmlFor="inputEmail4">Date</label>
          <input
            type="date"
            name="startYear"
            className="form-control"
            // onChange={handleChange}
            placeholder="eg. 1990"
          />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="inputPassword4">Time</label>
          <input
            type="time"
            name="endYear"
            className="form-control"
            // onChange={handleChange}
            placeholder="eg. 1990"
          />
        </div>
      </div>
    </form>
  );
};
