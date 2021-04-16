import React, { useState, useEffect, useCallback } from "react";
import { PageLoader } from "../../Components";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  getPatientRegistrationInvoiceUrl,
  getPatientUrl,
  updatePatientBasicInfoUrl,
  updatePatientContactDetailsUrl,
  updatePatientHealthDetailsUrl,
} from "../../api/URLs";
import CountryRegionDropdown from "../../Components/Select/CountryRegionSelectableDropdown";
import PatientAndAdminImage from "../../assets/img/PatientAndAdminIcon.svg";
import { notification } from "../../utils/notification";
import { validatePhoneNumber } from "../../utils/validationUtils";

function UpdatePatientProfile(props) {
  const initialState = {
    patientId: "",
    patient: {},
    firstName: "",
    lastName: "",
    otherNames: "",
    dateOfBirth: "",
    gender: "",

    phoneNumber: "",
    email: "",
    address: "",
    state: "",
    country: "",

    bloodGroup: "",
    genoType: "",
    diabetic: false,
    allergies: "",
    disabilities: "",
  };

  const [IsValidPhone, setIsValidPhoneSate] = useState(true);

  const [state, setState] = useState(initialState);
  const { params } = props.match;

  const getRegistrationStatus = useCallback(async () => {
    try {
      const getPatientRegistrationInvoice = getPatientRegistrationInvoiceUrl(
        state.patientId
      );
      const getPatientRegistrationInvoiceConfig = fetchConfig({
        url: getPatientRegistrationInvoice,
        method: "get",
      });
      const { data } = await fetchWrapper(getPatientRegistrationInvoiceConfig);
      console.log(data, 1111);
      setState((state) => ({
        ...state,
        paymentStatus: data.patientRegistrationInvoice.paymentStatus,
      }));
    } catch (error) {
      console.log(error);
    }
  }, [state.patientId]);

  const fetchPatientDetails = useCallback(
    async (id) => {
      console.log(id);

      const getPatient = getPatientUrl(id);
      const getPatientConfig = fetchConfig({ url: getPatient, method: "get" });
      const { data } = await fetchWrapper(getPatientConfig);

      setState({
        firstName: data.patient.firstName,
        lastName: data.patient.lastName,
        otherNames: data.patient.otherNames,
        email: data.patient.email,
        patient: data.patient,
        dateOfBirth: data.dateOfBirth,
        gender: data.gender,
        phoneNumber: data.patient?.phoneNumber,
        address: data.address,
        state: data.state,
        country: data.country,
        bloodGroup: data.bloodGroup,
        genoType: data.genoType,
        diabetic: data.diabetic,
        allergies: data.allergies,
        disabilities: data.disabilities,
        patientId: id,
      });
      const isValid = validatePhoneNumber(data.patient?.phoneNumber)
      setIsValidPhoneSate(isValid)
      await getRegistrationStatus();
    },
    [getRegistrationStatus]
  );

  useEffect(() => {
    if (params.id) {
      fetchPatientDetails(params.id);
      return;
    }
  }, [fetchPatientDetails, params.id]);

  const handleChange = (name, e) => {
    const value = e.target.value;
    setState((state) => ({
      ...state,
      [name]: value,
    }));
    if (name === "phoneNumber") {
      const isValid = validatePhoneNumber(e.target.value)
      setIsValidPhoneSate(isValid);
    }
  };

  const saveLocation = (name, value) => {
    setState((state) => ({ ...state, [name]: value }));
  };

  const updateCoreDetails = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        firstName: state.firstName,
        lastName: state.lastName,
        otherNames: state.otherNames,
        dateOfBirth: state.dateOfBirth,
        gender: state.gender,
        patientId: state.patientId,
      };

      const updatePatientBasicInfo = updatePatientBasicInfoUrl();
      const updatePatientBasicInfoConfig = fetchConfig({
        url: updatePatientBasicInfo,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(updatePatientBasicInfoConfig);

      if (res.status === 200) {
        setState((sate) => ({ ...state, success: true }));
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const updateContactDetails = async (e) => {
    e.preventDefault();
    const allowSubmission =
      state.phoneNumber === "" ? true : validatePhoneNumber(state.phoneNumber);
    if (allowSubmission) {
      try {
        const payload = {
          phoneNumber: state.phoneNumber,
          email: state.email,
          address: state.address,
          state: state.state,
          country: state.country,
          patientId: state.patientId,
        };

        const updatePatientContactDetails = updatePatientContactDetailsUrl();
        const updatePatientContactDetailsConfig = fetchConfig({
          url: updatePatientContactDetails,
          data: payload,
          method: "post",
        });
        const res = await fetchWrapper(updatePatientContactDetailsConfig);
        if (res.status === 200) {
          notification.success({ message: res.data.message });
        }
      } catch (error) {
        console.log(error);
        notification.error({ message: error?.response?.data?.message });
      }
    } else {
      setIsValidPhoneSate(true);
    }
  };

  const updateHealthDetails = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        bloodGroup: state.bloodGroup,
        genoType: state.genoType,
        diabetic: state.diabetic,
        allergies: state.allergies,
        disabilities: state.disabilities,
        patientId: state.patientId,
      };

      // );
      const UpdatePatientHealthDetails = updatePatientHealthDetailsUrl();
      const UpdatePatientHealthDetailsConfig = fetchConfig({
        url: UpdatePatientHealthDetails,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(UpdatePatientHealthDetailsConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
  };

  const {
    lastName,
    otherNames,
    email,
    dateOfBirth,
    gender,
    phoneNumber,
    firstName,
    address,
    bloodGroup,
    genoType,
    diabetic,
    allergies,
    disabilities,
    paymentStatus,
    patient,
    patientId,
  } = state;

  console.log(IsValidPhone,999)
  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          {paymentStatus === "Paid" ? null : paymentStatus === "Not Paid" ? (
            <div className="card">
              <div className="card-body bg-warning p-4">
                <div className="d-flex justify-content-between">
                  <div className="">
                    <h6 className="m-0 p-0 text-left">{`${firstName} ${lastName} is yet to pay for a hospital card. To have access to the services click, the pay now button to complete registration`}</h6>{" "}
                  </div>
                  <div className="">
                    <Link
                      className="btn btn-sm btn-primary"
                      to={{
                        pathname: `/AdminPatientRegistration/${patientId}`,
                        state: {
                          patientId,
                          email: email,
                          cost: patient?.account?.healthPlan?.cost,
                          name: `${firstName} ${lastName}`,
                        },
                      }}
                    >
                      Pay Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
          <header className="page-header">
            <h3 className="page-title">Update Patient Profile</h3>
          </header>

          <div className="page-content">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div className="card border-light">
                  <div className="card-body">
                    <label>Photo</label>
                    <div className="form-group avatar-box d-flex align-items-center">
                      <img
                        src={PatientAndAdminImage}
                        width={100}
                        height={100}
                        alt="user avatar"
                        className="rounded-500 mr-4"
                      />
                      <button className="btn btn-outline-primary" type="button">
                        Change Photo
                        <span className="btn-icon icofont-ui-user ml-2" />
                      </button>
                    </div>
                    <form onSubmit={(e) => updateCoreDetails(e)}>
                      <h4>Core Details</h4>
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>First name</label>{" "}
                            <input
                              required
                              className="form-control"
                              type="text"
                              onChange={(e) => handleChange("firstName", e)}
                              placeholder="First name"
                              value={firstName}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Last name</label>{" "}
                            <input
                              required
                              className="form-control"
                              type="text"
                              onChange={(e) => handleChange("lastName", e)}
                              value={lastName}
                              placeholder="Last name"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Other Name</label>{" "}
                        <input
                          className="form-control"
                          type="text"
                          value={otherNames}
                          onChange={(e) => handleChange("otherNames", e)}
                          placeholder="Other Name"
                        />
                      </div>

                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Date of Birth</label>{" "}
                            <input
                              required
                              className="form-control"
                              type="date"
                              onChange={(e) => handleChange("dateOfBirth", e)}
                              placeholder="date of birth"
                              value={dateOfBirth}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Gender</label>

                            <select
                              className="form-control"
                              title="Gender"
                              required
                              value={gender ? gender : ""}
                              onChange={(e) => handleChange("gender", e)}
                              tabIndex={-98}
                            >
                              <option disabled value="">
                                Select gender
                              </option>
                              <option>Male</option>
                              <option>Female</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Save Core Details
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col col-md-6">
                <div className="card border-light">
                  <div className="card-body">
                    <form
                      className="mb-4"
                      onSubmit={(e) => updateContactDetails(e)}
                    >
                      <h4>Contact Details</h4>

                      <div className="form-group">
                        <label>Phone Number</label>{" "}
                        <input
                          required
                          className="form-control"
                          type="text" 
                          pattern="\d*" 
                          maxLength={phoneNumber[0] === "0" ? 11 : 14}
                          placeholder="Phone Number"
                          value={phoneNumber}
                          onChange={(e) => handleChange("phoneNumber", e)}
                        />
                        {!IsValidPhone && (
                          <div className="text-danger mt-1">
                            Invalid phone number
                          </div>
                        )}
                      </div>
                      <div className="form-group">
                        <label>Email Address</label>{" "}
                        <input
                          required
                          className="form-control"
                          type="email"
                          placeholder="Email Address"
                          value={email}
                          disabled
                        />
                      </div>
                      <div className="form-group">
                        <label>Address</label>{" "}
                        <textarea
                          required
                          className="form-control"
                          placeholder="Address"
                          rows={3}
                          onChange={(e) => handleChange("address", e)}
                          value={address ? address : ""}
                        />
                      </div>
                      {email && (
                        <CountryRegionDropdown
                          setLocation={saveLocation}
                          country={state.country}
                          state={state.state}
                        />
                      )}
                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button type="submit" className="btn btn-primary">
                            Save Contact Details
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col col-md-12">
                <div className="card border-light">
                  <div className="card-body">
                    <form
                      className="mb-4"
                      onSubmit={(e) => updateHealthDetails(e)}
                    >
                      <h4>Basic Health Details</h4>
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Blood Group</label>

                            <select
                              required
                              className="form-control"
                              title="bloodGroup"
                              tabIndex={-98}
                              value={bloodGroup ? bloodGroup : ""}
                              onChange={(e) => handleChange("bloodGroup", e)}
                            >
                              <option disabled value="">
                                Select Blood Group
                              </option>
                              <option>O+</option>
                              <option>O-</option>
                              <option>A+</option>
                              <option>A-</option>
                              <option>B+</option>
                              <option>B-</option>
                              <option>AB+</option>
                              <option>AB-</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Genotype</label>

                            <select
                              className="form-control"
                              title="genoType"
                              required
                              value={genoType ? genoType : ""}
                              tabIndex={-98}
                              onChange={(e) => handleChange("genoType", e)}
                            >
                              <option disabled value="">
                                Select Genotype
                              </option>
                              <option value="aa">AA</option>
                              <option value="as">AS</option>
                              <option value="ss">SS</option>
                              <option value="sc">SC</option>
                              <option value="ac">AC</option>
                              <option value="cc">CC</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Diabetic</label>

                        <select
                          className="form-control"
                          title="diabetic"
                          required
                          tabIndex={-98}
                          value={diabetic ? diabetic : ""}
                          onChange={(e) => handleChange("diabetic", e)}
                        >
                          <option disabled value="">
                            Diabetic?
                          </option>

                          <option value={true}>True</option>
                          <option value={false}>False</option>
                        </select>
                      </div>
                      <div className="row">
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Allergies</label>{" "}
                            <textarea
                              required
                              className="form-control"
                              placeholder="Allergies"
                              rows={3}
                              value={allergies ? allergies : ""}
                              onChange={(e) => handleChange("allergies", e)}
                            />
                          </div>
                        </div>
                        <div className="col-12 col-sm-6">
                          <div className="form-group">
                            <label>Disabilities </label>{" "}
                            <textarea
                              required
                              className="form-control"
                              placeholder="Disabilities"
                              rows={3}
                              value={disabilities ? disabilities : ""}
                              onChange={(e) => handleChange("disabilities", e)}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col"></div>
                        <div className="col text-right">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            // onClick={}
                          >
                            Save Health Details
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
}

export default UpdatePatientProfile;
