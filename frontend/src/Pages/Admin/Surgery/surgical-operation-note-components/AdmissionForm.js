import React from "react";
import { Card } from "../../../../Components/reusable-css-in-js-components";

export default function AdmissionForm({ admission, setAdmission }) {

  const handleChange = (e, checkBoxOrRadio) => {
    console.log(e.taret, checkBoxOrRadio,88888);
    if (checkBoxOrRadio) {
      setAdmission({
        ...admission,
        [checkBoxOrRadio]: !admission[checkBoxOrRadio],
      });
    } else {
      setAdmission({ ...admission, [e.target.name]: e.target.value });
    }
  };

  const {
    hospitalistService,
    medSurgService,
    icu,
    tele,
    surgeryAndDiagnosis,
    secondaryDiagnosis,
    allergies,
    // onChat,
    // completedByPCPCall,
  } = admission;

  console.log(admission, 1111);

  return (
    <div>
      <Card>
        <h4>Admission Information</h4>
        <div className="d-md-flex">
          <div className="custom-control custom-checkbox mb-3 mt-2 pt-3">
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, "hospitalistService")}
              value={hospitalistService}
              name="hospitalistService"
              className="custom-control-input"
              id={`hospitalistService`}
              checked={hospitalistService}
            />{" "}
            <label className="custom-control-label" for={`hospitalistService`}>
              Hospitalist Service
            </label>
          </div>
          <div className="d-flex">
            <div
              className="text-center mt-md-4 px-md-3 pr-2 mt-3"
              // style={{ width:"60px"}}
              // for={`hospitalistService`}
            >
              Dr.
            </div>
            <input
              className="form-control "
              type="text"
              tabIndex={-98}
              // placeholder="Name of the health plan"
              // value={healthPlanData.name}
              name="name"
              // onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="custom-control custom-checkbox mb-1 pt-3">
          <input
            type="checkbox"
            onChange={(e) => handleChange(e, "medSurgService")}
            value={medSurgService}
            name="medSurgService"
            className="custom-control-input"
            id={`metSurg`}
            checked={medSurgService}
          />{" "}
          <label className="custom-control-label" for={`metSurg`}>
            Met/Surg Service
          </label>
        </div>
        <div className="custom-control custom-checkbox mb-1 pt-3">
          <input
            type="checkbox"
            onChange={(e) => handleChange(e, "icu")}
            value={icu}
            name="icu"
            className="custom-control-input"
            id={`icu`}
            checked={icu}
          />{" "}
          <label className="custom-control-label" for={`icu`}>
            ICU (see also ICU standard orders)
          </label>
        </div>
        <div className="custom-control custom-checkbox mb-1 pt-3">
          <input
            type="checkbox"
            onChange={(e) => handleChange(e, "tele")}
            value={tele}
            name="tele"
            className="custom-control-input"
            id={`tele`}
            checked={tele}
          />{" "}
          <label className="custom-control-label" for={`tele`}>
            TELE (see also tele standard orders)
          </label>
        </div>
        <div className="mt-3 w-75">
          <label>Surgery/Diagnosis</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            value={surgeryAndDiagnosis}
            name="surgeryAndDiagnosis"
            tabIndex={-98}
            placeholder="Name of the health plan"
          />
        </div>
        <div className="mt-3 w-75">
          <label>Secondary diagnosis</label>
          <input
            className="form-control"
            type="text"
            onChange={handleChange}
            value={secondaryDiagnosis}
            name="secondaryDiagnosis"
            tabIndex={-98}
            placeholder="Name of the health plan"
           
          />
        </div>
        <div className="custom-control custom-checkbox mb-1 pt-3">
          <input
            type="checkbox"
            onChange={(e) => handleChange(e, "allergies")}
            value={allergies}
            name="allergies"
            className="custom-control-input"
            id={`allergies`}
            checked={allergies}
          />{" "}
          <label className="custom-control-label" for={`allergies`}>
            Allergies (see medical history)
          </label>
        </div>
        <div className="my-3 font-weight-bold">
          <div className="mb-2">Advanced Directives</div>
          <div className="d-md-flex">
            <div className="custom-control custom-radio mb-3">
              <input
                type="radio"
                className="custom-control-input"
                // onChange={(e) => handleChange(e, "onChat")}
                // value={onChat}
                // name="onChat"
                // checked={onChat}
                id="onChat"
              />{" "}
              <label className="custom-control-label" for="onChat">
                On Chat
              </label>
            </div>

            <div className="d-md-flex custom-control custom-radio mb-3 mx-md-3">
              <input
                type="radio"
                className="custom-control-input  "
                name="completedByPCPCall"
                id="completedByPCPCall"
                onChange={(e) => handleChange(e, "completedByPCPCall")}
                // value={completedByPCPCall}
                // checked={completedByPCPCall}
              />{" "}
              <label className="custom-control-label" for="completedByPCPCall">
                Completed by PCP call
              </label>
              <input
                className="form-control w-75"
                type="text"
                tabIndex={-98}
                //   value={healthPlanData.name}
                name="name"
                //   onChange={handleChange}
                required
              />
            </div>
            <div className="custom-control custom-radio mb-3">
              <input
                type="radio"
                className="custom-control-input"
                name="unknown"
                id="unknown"
                // value={drugType}
                // onChange={handleChange}
                // checked={drugType === "tabs" && "checked"}
              />{" "}
              <label className="custom-control-label" for="unknown">
                Unknown
              </label>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
