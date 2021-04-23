import React, { useEffect, useState } from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { createAntenatalRecordUrl } from "../../api/URLs";
import { notification } from "../../utils/notification";
import { isNotEmptyString } from "../../utils/validationUtils";

const $ = window.$;

const CreateAnteNatalRecord = ({ antenatalId, initiatorId, mutate }) => {
  const [details, setDetails] = useState({
    fundalHeight: "",
    present: "",
    lie: "",
    feotalHeartRate: "",
    urineAIBumin: "",
    urineSugar: "",
    bloodPressure: "",
    weight: "",
    hb: "",
    odema: "",
    remarks: "",
    dateOfReturn: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const {
      fundalHeight,
      present,
      lie,
      feotalHeartRate,
      urineAIBumin,
      urineSugar,
      bloodPressure,
      weight,
      hb,
      odema,
      remarks,
      dateOfReturn,
    } = details;
    if (
      isNotEmptyString(fundalHeight) &&
      isNotEmptyString(present) &&
      isNotEmptyString(lie) &&
      isNotEmptyString(feotalHeartRate) &&
      isNotEmptyString(urineAIBumin) &&
      isNotEmptyString(urineSugar) &&
      isNotEmptyString(bloodPressure) &&
      isNotEmptyString(weight) &&
      isNotEmptyString(hb) &&
      isNotEmptyString(odema) &&
      isNotEmptyString(remarks) &&
      isNotEmptyString(dateOfReturn)
    ) {
      setEmptyField(false);
    } else {
      setEmptyField(true);
    }
  }, [details]);
  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...details, antenatalId, initiatorId };
    const createAntenatalRecord = createAntenatalRecordUrl();
    const createAntenatalRecordConfig = fetchConfig({
      url: createAntenatalRecord,
      method: "post",
      data: payload,
    });
    try {
      const res = await fetchWrapper(createAntenatalRecordConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        $("#create-antenatal-record").modal("hide");
        mutate();
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };
  return (
    <div
      className="modal fade"
      id="create-antenatal-record"
      tabIndex="-1"
      role="dialog"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h5 className="text-center">Routine care</h5>
            <form className="p-5" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Fundal Height</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="fundalHeight"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>LIE</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="lie"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Urine AI Bumin</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="urineAIBumin"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Blood Pressure</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="bloodPressure"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>H, B</label>
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="hb"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Remarks</label>{" "}
                    <textarea
                      className="form-control"
                      name="remarks"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="form-group">
                    <label>Present</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="present"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Feotal Heart Rate</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="feotalHeartRate"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Urine Sugar</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="urineSugar"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Weight</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="weight"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Odema</label>{" "}
                    <input
                      className="form-control"
                      type="text"
                      tabIndex={-98}
                      name="odema"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Date of Return</label>
                    <input
                      className="form-control"
                      type="date"
                      tabIndex={-98}
                      name="dateOfReturn"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col"></div>
                <div className="col text-right">
                  <button
                    type="submit"
                    disabled={emptyField ? true : false}
                    className="btn btn-primary"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CreateAnteNatalRecord };
