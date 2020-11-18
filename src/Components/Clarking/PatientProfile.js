import React from "react";
import { Link } from "react-router-dom";
import { PageLoader } from "../../Components";
import user from "../../assets/img/user.png";
import reset from "../../assets/img/reset.svg";
import email from "../../assets/img/email.svg";
import phone from "../../assets/img/phone.svg";
import edit from "../../assets/img/edit.svg";
import resetText from "../../assets/img/resetText.svg";

const apiUrl = process.env.REACT_APP_API_URL;
class PatientProfile extends React.Component {
  state = {
    patientDetails: {},
  };

  componentDidMount() {
    this.fetchPatientDetails();
  }

  fetchPatientDetails = async () => {
    try {
      let res = await fetch(
        `${apiUrl}/Patient/GetPatient?id=${this.props.patientId}`,
        {
          headers: { "Content-Type": "application/json-patch+json" },
          method: "GET",
          redirect: "follow",
        }
      );
      const data = await res.text();
      console.log(JSON.parse(data).patientProfile);
      this.setState({
        patientDetails: JSON.parse(data).patientProfile,
      });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { patientDetails } = this.state;
    return (
      <>
        <PageLoader />

        {/* <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap"> */}
        {/* <div className="page-content"> */}
        {/* <header className="page-header">
                <h3 className="page-title">
                  {" "}
                  {`${patientDetails?.fullName ?? ""}'s profile`}
                </h3>
              </header> */}
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
                    {`${patientDetails?.fullName ?? ""} `}
                  </h5>
                  <p className="mb-2">Patient</p>
                </div>
              </div>
              <div className="mt-2">
                <div className="d-flex mb-3 mt-2">
                  <img src={email} alt="reset" className="mr-2 mb-2" />
                  <p>{`${
                    patientDetails?.patient?.email.toLowerCase() ?? "N/A"
                  }`}</p>
                </div>
                <div className="d-flex pl-1">
                  <img src={phone} alt="reset" className="mr-3 mb-2" />
                  <p>{`${patientDetails?.patient?.phoneNumber ?? "N/A"}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-0">
          <div className="col col-md-12">
            <div className="card border-light p-4">
              <div className="card-body">
                <div className="d-flex justify-content-between border-bottom">
                  <h6 className="card-title mt-0 font-weight-bold">
                    Health details
                  </h6>
                  {/* <Link
                    to={{
                      pathname: `/AdminUpdatePatientProfile/${this.props.location.state.id}`,
                      state: this.props.location.state,
                    }}
                  > */}
                    {/* <img src={edit} alt="reset" className="mr-3 mb-2" /> */}
                  {/* </Link> */}
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
                    <p>{`${
                      patientDetails?.diabetic === true
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
        </div>
        {/* </div>
          </div>
        </main> */}
      </>
    );
  }
}

export { PatientProfile };
