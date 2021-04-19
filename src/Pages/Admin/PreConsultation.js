import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import {
  getPatientUrl,
  updatePatientPreConsultationVitalsUrl,
  updatePatientPreConsultationBMIUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { notification } from "../../utils/notification";
import { isValidPositiveInteger } from "../../utils/validationUtils";

const PreConsultation = () => {
  const { id } = useParams();
  const getPatient = getPatientUrl(id);
  const getPatientConfig = fetchConfig({ url: getPatient, method: "get" });
  const { data, error } = useRequest(getPatientConfig, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  return (
    <>
      <PageLoader />

      {data && (
        <main className="main-content mt-5">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header">
              <h3 className="page-title">
                {`Patient Preconsultation (${data?.patient?.firstName} ${data?.patient?.lastName})`}
              </h3>
            </header>
            <div className="page-content">
              <div className="row justify-content-center">
                <UpdatePatientVitalsForm patientId={id} />
                <UpdatePatientBMIForm patientId={id} />
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PreConsultation;

const UpdatePatientVitalsForm = ({ patientId }) => {
  const [details, setDetails] = useState({
    systolic: "",
    diastolic: "",
    respiration: "",
    pulse: "",
    spo2: "",
    temperature: "",
  });
  const handleChange = async (name, e) => {
    const value = e.target.value;
    setDetails({ ...details, [name]: value });
  };
  const updatePatientVitals = async (e) => {
    const {
      systolic,
      diastolic,
      respiration,
      pulse,
      spo2,
      temperature,
    } = details;
    e.preventDefault();

    try {
      const payload = {
        bloodPressure: `${systolic}/${diastolic}`,
        respiration,
        pulse,
        spo2,
        temperature,
        patientId,
      };
      console.log(payload, "I got here");
      const updatePatientPreConsultationVitals = updatePatientPreConsultationVitalsUrl();
      const getPatientConfig = fetchConfig({
        url: updatePatientPreConsultationVitals,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(getPatientConfig);
      notification.success({ message: res.data.message });
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  const {
    systolic,
    diastolic,
    respiration,
    pulse,
    spo2,
    temperature,
  } = details;
  return (
    <div className="col-md-6">
      <div className="card border-light">
        <div className="card-body">
          <form className="mb-4">
            <h4>Patient Vitals</h4>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Blood Pressure (mmHg)</label>
                  <div className="row">
                    <div className="col-12 col-sm-5">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          value={systolic ? systolic : ""}
                          required
                          onChange={(e) => handleChange("systolic", e)}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-sm-2">
                      <p style={{ fontSize: "30px" }}>/</p>
                    </div>
                    <div className="col-12 col-sm-5">
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="number"
                          min="0"
                          value={diastolic ? diastolic : ""}
                          onChange={(e) => handleChange("diastolic", e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Respiration (bpm)</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={respiration ? respiration : ""}
                    onChange={(e) => handleChange("respiration", e)}
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Pulse (bpm)</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={pulse ? pulse : ""}
                    onChange={(e) => handleChange("pulse", e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>SpO2 (%)</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={spo2 ? spo2 : ""}
                    onChange={(e) => handleChange("spo2", e)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Temperature (Celsius)</label>
              <input
                className="form-control"
                type="number"
                min="0"
                value={temperature ? temperature : ""}
                onChange={(e) => handleChange("temperature", e)}
              />
            </div>

            <div className="row justify-content-end mt-5">
              <div className="col text-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => updatePatientVitals(e)}
                >
                  Save Patient Vitals
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UpdatePatientBMIForm = ({ patientId }) => {
  const [details, setDetails] = useState({
    weight: "",
    height: "",
    calculatedBMI: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  useEffect(() => {
    const { weight, height, calculatedBMI } = details;
    if (
      isValidPositiveInteger(weight) &&
      isValidPositiveInteger(height) &&
      isValidPositiveInteger(calculatedBMI)
    ) {
      setEmptyField(false);
    } else {
      setEmptyField(true);
    }
  }, [details]);
  const handleChange = (name, e) => {
    const value = e.target.value;
    console.log(name, value, details.calculatedBMI);
    setDetails({
      ...details,
      [name]: value,
      calculatedBMI: parseFloat(
        details.weight / Math.pow(details.height, 2)
      ).toFixed(2),
    });
  };
  const updatePatientBMI = async (e) => {
    e.preventDefault();

    try {
      const payload = { weight, height, calculatedBMI, patientId };
      const updatePatientPreConsultationBMI = updatePatientPreConsultationBMIUrl();
      const updatePatientPreConsultationBMIConfig = fetchConfig({
        url: updatePatientPreConsultationBMI,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(updatePatientPreConsultationBMIConfig);
      notification.success({ message: res.data.message });
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data.message });
    }
  };
  const { weight, height, calculatedBMI } = details;
  return (
    <div className="col col-md-6">
      <div className="card border-light">
        <div className="card-body">
          <form className="mb-4">
            <h4>Patient BMI</h4>
            <div className="row">
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Weigth (Kg)</label>
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={weight}
                    onChange={(e) => handleChange("weight", e)}
                  />
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <div className="form-group">
                  <label>Height (M)</label>{" "}
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    value={height}
                    onChange={(e) => handleChange("height", e)}
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label>Calculated BMI</label>{" "}
              <input
                className="form-control"
                type="number"
                value={calculatedBMI}
                onChange={(e) => handleChange("calculatedBMI", e)}
                disabled
              />
            </div>

            <div className="row mt-5 justify-content-end">
              <div className="col text-right">
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={emptyField ? true : false}
                  onClick={(e) => updatePatientBMI(e)}
                >
                  Save Patient BMI
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
