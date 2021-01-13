import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import user from "../../assets/img/user.png";
import reset from "../../assets/img/reset.svg";
import email from "../../assets/img/email.svg";
import phone from "../../assets/img/phone.svg";
import edit from "../../assets/img/edit.svg";
import resetText from "../../assets/img/resetText.svg";
import { fetchWrapper } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { getPatientUrl } from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
class PatientProfile extends React.Component {
  static contextType = UserContext;
  state = {
    patientDetails: {},

    loading: true,
  };

  componentDidMount() {
    this.fetchPatientDetails();
  }

  fetchPatientDetails = async () => {
    try {
      const getPatient = getPatientUrl(this.props.patientId);
      const getPatientConfig = fetchConfig({ url: getPatient, method: "get" });
      const { data } = await fetchWrapper(getPatientConfig);

      this.setState({
        patientDetails: data.patientProfile,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { patientDetails, loading } = this.state;
    const { patientId, state } = this.props;
    const {
      user: { userType },
    } = this.context;
    return (
      <>
        {loading ? (
          <PageLoader />
        ) : (
            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <div className="page-content">
                  <div className="col col-md-12">
                    <div className="card border-light">
                      <div className="card-body d-flex justify-content-between">
                        <div className="d-flex justify-content-between">
                          <img
                            src={user}
                            style={{ height: "100px", width: "100px" }}
                            className="mr-3"
                            alt="user"
                          />
                          <div>
                            <h5 className="mb-2 mt-2 font-weight-bold">
                              {`${patientDetails?.patient?.firstName ?? ""} ${patientDetails?.patient?.lastName ?? ""}`}
                            </h5>
                            <p className="mb-2">Patient</p>
                            <Link to={{
                              pathname: "/changepassword",
                              query: { userType: "patient" },
                            }}
                            >

                              <img src={reset} alt="reset" className="mr-2" />
                              <img src={resetText} alt="reset" className="mr-2" />
                            </Link>
                          </div>
                        </div>
                        <div className="mt-2">
                          <div className="d-flex mb-3 mt-2">
                            <img src={email} alt="reset" className="mr-2 mb-2" />
                            <p>{`${patientDetails?.patient?.email.toLowerCase() ??
                              "N/A"
                              }`}</p>
                          </div>
                          <div className="d-flex pl-1">
                            <img src={phone} alt="reset" className="mr-3 mb-2" />
                            <p>{`${patientDetails?.patient?.phoneNumber ?? "N/A"
                              }`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mx-0">
                    <div className="col col-md-7">
                      <div className="card border-light p-4">
                        <div className="card-body">
                          <div className="d-flex justify-content-between border-bottom">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Health details
                          </h6>
                            {userType === "Admin" ? (
                              <Link
                                to={{
                                  pathname: `/AdminUpdatePatientProfile/${patientId}`,
                                  state: state,
                                }}
                              >
                                <img src={edit} alt="reset" className="mr-3 mb-2" />
                              </Link>) : null}
                          </div>
                          <div className="basic-info d-flex justify-content-between mt-4">
                            <div>
                              <p className="font-weight-bold">Blood group</p>
                              <p>{`${patientDetails?.bloodGroup ?? "N/A"}`}</p>
                            </div>
                            <div>
                              <p className="font-weight-bold">Genotype</p>
                              <p>{`${patientDetails?.genoType ?? "N/A"}`}</p>
                            </div>
                            <div>
                              <p className="font-weight-bold">Gender</p>
                              <p>{`${patientDetails?.gender ?? "N/A"}`}</p>
                            </div>
                            <div>
                              <p className="font-weight-bold">Diabetic</p>
                              <p>{`${patientDetails?.diabetic === true
                                ? "Yes"
                                : patientDetails?.diabetic === false
                                  ? "No"
                                  : null ?? ""
                                }`}</p>
                            </div>
                          </div>
                          <div className="allergies mt-4">
                            <h6 className="mb-1">Allergies</h6>
                            <p>{`${patientDetails?.allergies ?? "N/A"}`}</p>
                          </div>
                          <div className="Disabilities mt-4">
                            <h6 className="mb-1">Disabilities</h6>
                            <p>{`${patientDetails?.disabilities ?? "N/A"}`}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col col-md-5">
                      <div className="card border-light p-4">
                        <div className="card-body">
                          <div className="d-flex justify-content-between border-bottom mb-4">
                            <h6 className="card-title mt-0 font-weight-bold">
                              Contact Information
                          </h6>
                            {userType === "Admin" ? (
                              <Link
                                to={{
                                  pathname: `/AdminUpdatePatientProfile/${patientId}`,
                                  state: state,
                                }}
                              >
                                <img src={edit} alt="reset" className="mr-3 mb-2" />
                              </Link>) : null}

                          </div>
                          <div className="contact-info">
                            <div className="mb-4">
                              <p className="font-weight-bold mb-2">Mobile</p>
                              <p>{`${patientDetails?.patient?.phoneNumber ?? "N/A"
                                }`}</p>
                            </div>
                            <div className="mb-4">
                              <p className="font-weight-bold mb-2">Email</p>
                              <p>{`${patientDetails?.patient?.email.toLowerCase() ??
                                "N/A"
                                }`}</p>
                            </div>
                            <div className="mb-4">
                              <p className="font-weight-bold mb-2">Address</p>
                              <p>{`${patientDetails?.address ?? "N/A"}`}</p>
                            </div>
                            <div className="mb-4">
                              <p className="font-weight-bold mb-2">
                                State of origin
                            </p>
                              <p>{`${patientDetails?.state ?? "N/A"}`}</p>
                            </div>
                            <div className="mb-4">
                              <p className="font-weight-bold mb-2">Country</p>
                              <p>{`${patientDetails?.country ?? "N/A"}`}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
          )}
      </>
    );
  }
}

export { PatientProfile };
