import React from "react";

export default function NursingFormPartTwo({
  nursingPartTwo,
  setNursingPartTwo,
}) {
  const handleChange = (e, checkBoxOrRadio) => {
    console.log(e.taret, checkBoxOrRadio, 88888);
    if (checkBoxOrRadio) {
      setNursingPartTwo({
        ...nursingPartTwo,
        [checkBoxOrRadio]: !nursingPartTwo[checkBoxOrRadio],
      });
    } else {
      setNursingPartTwo({ ...nursingPartTwo, [e.target.name]: e.target.value });
    }
  };


  const {
    hrLowerLimit,
    hrUpperLimit,
    rpLowerLimit,
    rpUpperLimit,
    sbpLowerLimit,
    sbpUpperLimit,
    dpbLowerLimit,
    dpbUpperLimit,
    spO2LowerLimit,
    spO2UpperLimit,
    temperatureLowerLimit,
    temperatureUpperLimit,
    urineOutput,
    haemoglobin,
    unusualWoundDrainage
  } = nursingPartTwo;

  return (
    <>
      <div className="  mt-3">
        <div className="mb-2">Notify physician If:</div>
        <div className="d-md-flex align-items-center  mb-3">
          <div className="d-flex align-items-center mb-2">
            <span className="mr-2">HR</span>
            <span>&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="hrLowerLimit"
              value={hrLowerLimit}
              onChange={handleChange}
            />

            <span className="mr-2">&gt;</span>

            <input
              className="form-control w-75 ml-2"
              type="text"
              tabIndex={-98}
              name="hrUpperLimit"
              value={hrUpperLimit}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="ml-md-2">RP</span>
            <span className="mx-2">&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="rpLowerLimit"
              value={rpLowerLimit}
              onChange={handleChange}
            />

            <span>&gt;</span>

            <input
              className="form-control w-75 ml-3 mr-2"
              type="text"
              tabIndex={-98}
              name="rpUpperLimit"
              value={rpUpperLimit}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-md-flex align-items-center  mb-3">
          <div className="d-flex align-items-center mb-2">
            <span className="mr-2">SBP</span>
            <span>&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="sbpLowerLimit"
              value={sbpLowerLimit}
              onChange={handleChange}
            />

            <span className="mr-2">&gt;</span>

            <input
              className="form-control w-75 ml-2"
              type="text"
              tabIndex={-98}
              name="sbpUpperLimit"
              value={sbpUpperLimit}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="ml-md-2">Temp</span>
            <span className="mx-2">&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="temperatureLowerLimit"
              value={temperatureLowerLimit}
              onChange={handleChange}
            />

            <span>&gt;</span>

            <input
              className="form-control w-75 ml-3 mr-2"
              type="text"
              tabIndex={-98}
              name="sbpUpperLimit"
              value={temperatureUpperLimit}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="d-md-flex align-items-center  mb-3">
          <div className="d-flex align-items-center mb-2">
            <span className="mr-2">DBP</span>
            <span>&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="dpbLowerLimit"
              value={dpbLowerLimit}
              onChange={handleChange}
            />

            <span className="mr-2">&gt;</span>

            <input
              className="form-control w-75 ml-2"
              type="text"
              tabIndex={-98}
              name="dpbUpperLimit"
              value={dpbUpperLimit}
              onChange={handleChange}
            />
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="ml-md-2">SPO2</span>
            <span className="mx-2">&lt;</span>

            <input
              className="form-control w-75 mx-2"
              type="text"
              tabIndex={-98}
              name="spO2LowerLimit"
              value={spO2LowerLimit}
              onChange={handleChange}
            />

            <span>&gt;</span>

            <input
              className="form-control w-75 ml-2"
              type="text"
              tabIndex={-98}
              name="spO2UpperLimit"
              value={spO2UpperLimit}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="custom-control custom-checkbox mb-1 pt-1">
        <input type="checkbox"  className="custom-control-input"
            name="urineOutput"
            id="urineOutput"
            value={urineOutput}
            onChange={(e) => handleChange(e, "urineOutput")}
            checked={urineOutput}
             />{" "}
        <label className="custom-control-label" for={`urineOutput`}>
          Urine output &lt; 20 ml/hr
        </label>
      </div>
      <div className="d-md-flex align-items-center mt-3">
        <div className="d-flex align-items-center custom-control custom-checkbox mb-3 mr-3">
          <input
            type="checkbox"
            className="custom-control-input  "
            // name="haemoglobin"
            // value={haemoglobin}
            // onChange={handleChange}
          />{" "}
          <label className="custom-control-label mr-3" for="haemoglobin">
            Hemoglobin
          </label>
          <span className="mr-3">&lt;</span>
          <span>
            <input
              className="form-control w-75 mr-0"
              type="text"
              tabIndex={-98}
              name="haemoglobin"
              value={haemoglobin}
              onChange={handleChange}
            />
          </span>
          <span className="mr-md-3">%</span>
        </div>

        <div className="custom-control  custom-checkbox mb-3">
          <input
            type="checkbox"
            className="custom-control-input"
            name="unusualWoundDrainage"
            id="unusualWoundDrainage"
            value={unusualWoundDrainage}
            onChange={(e) => handleChange(e, "unusualWoundDrainage")}
            checked={unusualWoundDrainage}
          />{" "}
          <label className="custom-control-label" for="unusualWoundDrainage">
            Unusual wound drainage
          </label>
        </div>
      </div>
    </>
  );
}
