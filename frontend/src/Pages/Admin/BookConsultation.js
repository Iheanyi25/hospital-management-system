import React, { useState, useContext, useEffect } from "react";
import Select from "react-select";
import { observer } from "mobx-react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../api/fetcher";
import {
  getDoctorsUrl,
  getPatientsUrl,
  postBookConsultationUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";
import { useHistory } from "react-router";
import { isNotEmptyString } from "../../utils/validationUtils";

const BookConsultation = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const { push } = useHistory();
  const [state, setState] = useState({
    consultationTitle: "",
    reasonForConsultation: "",
  });
  const [emptyField, setEmptyField] = useState(true);
  const [patient, setPatient] = useState();
  const [doctor, setDoctor] = useState();
  useEffect(() => {
    const { consultationTitle, reasonForConsultation } = state;
    if (
      isNotEmptyString(consultationTitle) &&
      isNotEmptyString(reasonForConsultation)
    ) {
      setEmptyField(false);
    }
    else {
      setEmptyField(true)
    }
  }, [state, patient]);
  const getPatients = getPatientsUrl(1, 200);
  const getPatientsConfig = fetchConfig({
    url: getPatients,
    method: "get",
  });
  const { data: data1, error1 } = useRequest(getPatientsConfig, {
    revalidateOnFocus: false,
  });
  let patientOptions = [];
  if (data1?.patients.length > 0) {
    data1.patients.forEach(({ patientId: id, firstName, lastName }) => {
      patientOptions.push({ value: id, label: `${firstName} ${lastName}` });
    });
  }
  const getDoctors = getDoctorsUrl();
  const getDoctorsConfig = fetchConfig({
    url: getDoctors,
    method: "get",
  });
  const { data: data2, error2 } = useRequest(getDoctorsConfig, {
    revalidateOnFocus: false,
  });
  let doctorOptions = [{ value: "", label: "Unassigned" }];
  if (data2?.doctors.length > 0) {
    data2.doctors.forEach(({ doctorId: id, firstName, lastName }) => {
      doctorOptions.push({ value: id, label: `${firstName} ${lastName}` });
    });
  }
  const handleDoctor = (doctor) => {
    setDoctor(doctor);
  };
  const handlePatient = (patient) => {
    setPatient(patient);
  };

  const handleChange = (name, e) => {
    const value = e.target.value;
    setState({ ...state, [name]: value });
  };

  const bookConsultation = async (e) => {
    e.preventDefault();
    const nextRoute =
      userType === "Admin" ? "/AdminConsultations" : "/NurseConsultations";

    let data =
      doctor.value === ""
        ? {
            ...state,
            patientId: patient.value,
          }
        : {
            ...state,
            patientId: patient.value,
            doctorId: doctor.value,
          };

    try {
      const postBookConsultation = postBookConsultationUrl();
      const postBookConsultationConfig = fetchConfig({
        url: postBookConsultation,
        data,
        method: "post",
      });
      const res = await fetchWrapper(postBookConsultationConfig);

      notification.success({ message: res.data.message });
      push(nextRoute);
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };
  let { consultationTitle, reasonForConsultation } = state;
  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap w-75">
          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form className="mb-4 p-5">
                      <h4 className="text-center">Book Consultation</h4>

                      <div className="form-group">
                        <label>Search Patient with:</label>
                        <Select
                          value={patient}
                          isSearchable={true}
                          options={patientOptions}
                          onChange={handlePatient}
                          placeholder={
                            error1 ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Select A Doctor</label>
                        <Select
                          value={doctor}
                          isSearchable={true}
                          options={doctorOptions}
                          onChange={handleDoctor}
                          placeholder={
                            error2 ? "Sorry, unable to fetch. Retry" : "Search"
                          }
                        />
                      </div>

                      <div className="form-group">
                        <label>Title of Consultation</label>

                        <input
                          className="form-control"
                          placeholder="Consultation Title"
                          tabIndex={-98}
                          onChange={(e) => handleChange("consultationTitle", e)}
                          value={consultationTitle}
                        />
                      </div>
                      <div className="form-group">
                        <label>Reason for Consultation</label>{" "}
                        <textarea
                          className="form-control"
                          rows={4}
                          placeholder="Reason for Consultation"
                          onChange={(e) =>
                            handleChange("reasonForConsultation", e)
                          }
                          value={reasonForConsultation}
                        />
                      </div>
                      <div className="row mt-5">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={(e) => bookConsultation(e)}
                            disabled={emptyField ? true : false}
                          >
                            Book Now
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
});

export default BookConsultation;
