import React from "react";
import Select from "react-select";

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
    </form>
  );
};

export { ShiftSelectionForm };
