import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { formatInputDate } from '../../../../../utils/formatInputDate';
import { isNotEmptyString } from '../../../../../utils/validationUtils';

const FetchReportForm = ({
  startDate,
  endDate,
  handleChange,
  fetchReport,
  hmo,
  optionTitle,
  options,
  handleHMOChange,
  patient,
  hmOOptions,
  handleOptionChange,
}) => {
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    if (isNotEmptyString(startDate) && isNotEmptyString(endDate)) {
      setEmptyField(false);
    }
  }, [startDate, endDate]);
  return (
    <div className="card border-light p-4">
      <form className="mb-4" onSubmit={fetchReport}>
        <div className="row">
          <div className="col-12 col-sm-2">
            <div className="form-group">
              <label>
                Start Date<small className="text-danger">*</small>
              </label>

              <input
                type="date"
                className="form-control"
                tabIndex={-98}
                onChange={handleChange}
                name="startDate"
                max={formatInputDate()}
                placeholder="Start Date"
              />
            </div>
          </div>

          <div className="col-12 col-sm-2">
            <div className="form-group">
              <label>
                End Date<small className="text-danger">*</small>
              </label>

              <input
                type="date"
                className="form-control"
                tabIndex={-98}
                min={startDate}
                onChange={handleChange}
                name="endDate"
                max={formatInputDate()}
                placeholder="End Date"
              />
            </div>
          </div>

          <div className="col-12 col-sm-3">
            <div className="form-group">
              <label>Select HMO</label>
              <Select
                value={hmo}
                isSearchable={true}
                options={hmOOptions}
                onChange={handleHMOChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-sm-3">
            <div className="form-group">
              <label>{optionTitle}</label>
              <Select
                value={patient}
                isSearchable={true}
                options={options}
                onChange={handleOptionChange}
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-12 col-sm-2">
            <div className="form-group mt-4 text-center">
              <button
                type="submit"
                className="btn btn-primary mt-2"
                disabled={emptyField ? true : false}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export { FetchReportForm };
