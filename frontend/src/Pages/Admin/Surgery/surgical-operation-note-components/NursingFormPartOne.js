import React from "react";

export default function NursingFormPartOne({
  nursingPartOne,
  setNursingPartOne,
}) {
  console.log(nursingPartOne, 3333);
  const handleChange = (e, checkBoxOrRadio) => {
    console.log(e.taret, checkBoxOrRadio, 88888);
    if (checkBoxOrRadio) {
      setNursingPartOne({
        ...nursingPartOne,
        [checkBoxOrRadio]: !nursingPartOne[checkBoxOrRadio],
      });
    } else {
      setNursingPartOne({ ...nursingPartOne, [e.target.name]: e.target.value });
    }
  };

  const {
    vsEveryEightHours,
    vsEveryFourHours,
    vsPerUnitProtocol,
    iAndDWeightDaily,
    bedRest,
    oobToChain,
    ambAsTol,
    managementPerPDHPolicy,
    jacksonPratt,
    hamovac,
    penrose,
    dressing,
  } = nursingPartOne;

  console.log(nursingPartOne, 1111);
  return (
    <>
      <div className="d-md-flex">
        <div className="custom-control custom-radio mb-1 pt-3 mr-md-3">
          <input
            type="radio"
            onChange={(e) => handleChange(e, "vsEveryFourHours")}
            value={vsEveryFourHours}
            name="vsEveryFourHours"
            className="custom-control-input"
            id={`vsEveryFourHours`}
            // checked={hospitalistService}
          />{" "}
          <label className="custom-control-label" for={`vsEveryFourHours`}>
            VS every 4 hours
          </label>
        </div>
        <div className="custom-control custom-radio mb-1 pt-3 mr-md-3">
          <input
            type="radio"
            onChange={(e) => handleChange(e, "vsEveryEightHours")}
            value={vsEveryEightHours}
            name="vsEveryEightHours"
            className="custom-control-input"
            id={`vsEveryEightHours`}
          />{" "}
          <label className="custom-control-label" for={`vsEveryEightHours`}>
            VS every 8 hours
          </label>
        </div>
        <div className="custom-control custom-radio mb-1 pt-3">
          <input
            type="radio"
            onChange={(e) => handleChange(e, "vsPerUnitProtocol")}
            value={vsPerUnitProtocol}
            name="vsPerUnitProtocol"
            className="custom-control-input"
            id={`vsPerUnitProtocol`}
          />{" "}
          <label className="custom-control-label" for={`vsPerUnitProtocol`}>
            VS per unit protocol
          </label>
        </div>
      </div>
      <div className="custom-control custom-checkbox mb-1 pt-3">
        <input
          type="checkbox"
          onChange={(e) => handleChange(e, "iAndDWeightDaily")}
          value={iAndDWeightDaily}
          name="iAndDWeightDaily"
          className="custom-control-input"
          id={`iAndDWeightDaily`}
          checked={iAndDWeightDaily}
        />{" "}
        <label className="custom-control-label" for={`iAndDWeightDaily`}>
          1 and 0 weight Daily
        </label>
      </div>
      <div className="my-3 font-weight-bold">
        <div className="mb-2">Activity</div>
        <div className="d-md-flex">
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, "bedRest")}
              value={bedRest}
              name="bedRest"
              className="custom-control-input"
              id={`bedRest`}
              checked={bedRest}
            />{" "}
            <label className="custom-control-label" for="bedRest">
              Bed rest
            </label>
          </div>
          <div className="d-md-flex custom-control custom-checkbox mb-3 mx-md-3">
            <input
              type="checkbox"
              onChange={(e) => handleChange(e, "oobToChain")}
              className="custom-control-input  "
              name="drugType"
              id="oobToChain"
              value={oobToChain}
              checked={oobToChain}
            />{" "}
            <label className="custom-control-label" for="oobToChain">
              OOB to chain
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              name="ambAsTol"
              id="ambAsTol"
              value={ambAsTol}
              onChange={(e) => handleChange(e, "ambAsTol")}
              checked={ambAsTol}
            />{" "}
            <label className="custom-control-label" for="ambAsTol">
              Amb As tol
            </label>
          </div>
        </div>
      </div>
      <div className="my-3 font-weight-bold">
        <div>Drains</div>
        <div className="d-md-flex align-items-center custom-control custom-checkbox mb-3 mr-3">
          <input
            type="checkbox"
            className="custom-control-input  "
            name="managementPerPDHPolicy"
            id="managementPerPDHPolicy"
            value={managementPerPDHPolicy}
            onChange={(e) => handleChange(e, "managementPerPDHPolicy")}
            checked={managementPerPDHPolicy}
          />{" "}
          <label className="custom-control-label" for="managementPerPDHPolicy">
            Management per PDH policy
            <span className="ml-3">oR</span>
          </label>
          <input
            className="form-control w-50 ml-md-2"
            type="text"
            tabIndex={-98}
            //   placeholder="Name of the health plan"
            //   value={healthPlanData.name}
            name="name"
            //   onChange={handleChange}
            required
          />
        </div>
        <div className="d-md-flex">
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              name="drugType"
              id="jacksonPratt"
              value={jacksonPratt}
              onChange={(e) => handleChange(e, "jacksonPratt")}
              checked={jacksonPratt}
            />{" "}
            <label className="custom-control-label" for="jacksonPratt">
              Jackson pratt
            </label>
          </div>
          <div className="d-md-flex custom-control custom-checkbox mb-3 mx-md-3">
            <input
              type="checkbox"
              className="custom-control-input  "
              name="hamovac"
              id="hamovac"
              value={hamovac}
              onChange={handleChange}
              checked={hamovac}
            />{" "}
            <label className="custom-control-label" for="tabs">
              Hamovac
            </label>
          </div>
          <div className="custom-control custom-checkbox mb-3">
            <input
              type="checkbox"
              className="custom-control-input"
              name="penrose"
              id="penrose"
              value={penrose}
              onChange={(e) => handleChange(e, "penrose")}
              checked={penrose}
            />{" "}
            <label className="custom-control-label" for="tabs">
              Penrose
            </label>
          </div>
        </div>
      </div>
      <div>
        <div className="font-weight-bold mb-2">Dressing</div>
        <textarea
          className="form-control"
          placeholder="dressing"
          rows={12}
          name="dressing"
          id="dressing"
          value={dressing}
          onChange={handleChange}
          checked={dressing}
        />
      </div>
    </>
  );
}
