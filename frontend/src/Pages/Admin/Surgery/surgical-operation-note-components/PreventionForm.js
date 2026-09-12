import React from "react";
import { Card } from "../../../../Components/reusable-css-in-js-components";

export default function PreventionForm({prevention, setPrevention}) {

  const handleChange = (e, checkBoxOrRadio) => {
    if (checkBoxOrRadio) {
      setPrevention({
        ...prevention,
        [checkBoxOrRadio]: !prevention[checkBoxOrRadio],
      });
    } else {
      setPrevention({ ...prevention, [e.target.name]: e.target.value });
    }
  };
  const { pantoprazole, famotidine, infectionPrevention } = prevention;
  return (
    <div className="d-md-flex flex-column mr-md-3" style={{ flex: "1" }}>
      <Card>
        <h4>Peptic Ulcer Prevention</h4>
        <div className="d-md-flex">
          <div className="custom-control custom-checkbox mb-1 pt-3 mr-md-3">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={(e) => handleChange(e, "pantoprazole")}
              value={pantoprazole}
              name="pantoprazole"
              id={`pantoprazole`}
              checked={pantoprazole}
            />{" "}
            <label className="custom-control-label" for={`pantoprazole`}>
            Pantoprazole (Protonix)
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-1 pt-3">
            <input
              type="checkbox"
              className="custom-control-input"
              onChange={(e) => handleChange(e, "famotidine")}
              value={famotidine}
              name="famotidine"
              id={`famotidine`}
              checked={famotidine}
            />{" "}
            <label className="custom-control-label" for={`famotidine`}>
            Famotidine (Pepcid)
            </label>
          </div>
        </div>
      </Card>

      <Card>
        <h4>Infection Prevention</h4>
        <textarea
          className="form-control"
          placeholder="Respiratory care"
          rows={10}
          type="text"
            onChange={handleChange}
            value={infectionPrevention}
            name="infectionPrevention"
        />
      </Card>
    </div>
  );
}
