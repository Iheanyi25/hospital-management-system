import React from "react";
import {   DoctorHeader, DoctorSidebar, Footer, PageLoader, TemplateSettings } from "../../Components";
// import Header from "../../Components/Header/DoctorHeader";
// import Sidebar from "../../Components/Sidebar/DoctorSidebar";
// import Footer from "../../Components/Footer";
// import TemplateSettings from "../../Components/TemplateSettings";
// import PageLoader from "../../Components/Loader/PageLoader";

class DoctorAvaliablity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      apiUrl: process.env.REACT_APP_API_URL,
      patientId: "",
      patient: null,
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
  }

  async componentDidMount() {
    const { apiUrl } = this.state;
    const { params } = this.props.match;
    await this.setState({ patientId: params.id });
    const response = await fetch(
      `${apiUrl}/Admin/GetPatient?id=${this.state.patientId}`
    );
    const data = await response.json();
    const response1 = await fetch(
      `${apiUrl}/Admin/GetPatientProfile?id=${this.state.patientId}`
    );
    const data1 = await response1.json();

    this.setState({
      patient: data,
      firstName: data.patientProfile.firstName,
      lastName: data.patientProfile.lastName,
      otherNames: data.patientProfile.otherNames,
      email: data.patientProfile.email,
    });
    if (data1.patientProfile != null) {
      console.log(data1.patientProfile.patientProfile);
      this.setState({
        dateOfBirth: data1.patientProfile.patientProfile.dateOfBirth,
        gender: data1.patientProfile.patientProfile.gender,
        phoneNumber:
          data1.patientProfile.patientProfile.applicationUser.phoneNumber,
        address: data1.patientProfile.patientProfile.address,
        state: data1.patientProfile.patientProfile.state,
        country: data1.patientProfile.patientProfile.country,
        bloodGroup: data1.patientProfile.patientProfile.bloodGroup,
        genoType: data1.patientProfile.patientProfile.genoType,
        diabetic: data1.patientProfile.patientProfile.diabetic,
        allergies: data1.patientProfile.patientProfile.allergies,
        disabilities: data1.patientProfile.patientProfile.disabilities,
      });
    }
  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  updateCoreDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        firstName,
        lastName,
        otherNames,
        dateOfBirth,
        gender,
        patientId,
      } = this.state;

      const request = await fetch(`${apiUrl}/Admin/UpdatePatientBasicInfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          patientId,
          firstName,
          lastName,
          otherNames,
          dateOfBirth,
          gender,
        }),
      });
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient profile successfully updated

    } catch (error) {
      console.log(error);
    }
  };

  updateContactDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        phoneNumber,
        email,
        address,
        state,
        country,
        patientId,
      } = this.state;

      const request = await fetch(
        `${apiUrl}/Admin/UpdatePatientContactDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            phoneNumber,
            email,
            address,
            state,
            country,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient contact details successfully updated

      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  updateHealthDetails = async (e) => {
    e.preventDefault();

    try {
      const {
        apiUrl,
        bloodGroup,
        genoType,
        diabetic,
        allergies,
        disabilities,
        patientId,
      } = this.state;

      const request = await fetch(
        `${apiUrl}/Admin/UpdatePatientHealthDetails`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId,
            bloodGroup,
            genoType,
            allergies,
            disabilities,
            diabetic,
          }),
        }
      );
      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      //patient contact details successfully updated

      const data = await request.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <>
        <PageLoader />
        <div className="page-box">
          <div className="app-container">
            {/* Horizontal navbar---Header */}
            <DoctorHeader />

            {/* Vertical navbar */}
            <DoctorSidebar />


            <main className="main-content">
              <div className="app-loader">
                <i className="icofont-spinner-alt-4 rotate" />
              </div>
              <div className="main-content-wrap">
                <header className="page-header">
                  <h3 className="page-title">My Avaliablity</h3>
                </header>
                <div className="page-content">
                  <div className="row justify-content-center">

                    <div className="col col-md-8">
                      <div class="card border-light">
                        <div class="card-body">
                          <form className="mb-4">
                            <h4>Configure Abaliablity</h4>
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Are you avalibale for consultation? </label>
                                  <div class="form-group">
                                    <div class="custom-control custom-radio mb-3">
                                      <input type="radio" class="custom-control-input" name="avaliable" id="avaliable" />
                                      <label class="custom-control-label" for="avaliable">Yes I am avaliable for consultation</label>
                                    </div>
                                    <div class="custom-control custom-radio mb-3">
                                      <input type="radio" class="custom-control-input" name="avaliable" id="not_avaliable" />
                                      <label class="custom-control-label" for="not_avaliable">No, I am not avaliable for consultation</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-12">
                                <div className="form-group">
                                  <label>Special Office Hours</label>
                                  <textarea
                                    className="form-control"
                                    placeholder="Write you special office hours for people who want special appointments with you"
                                    rows={4}
                                  />
                                </div>
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

            {/* Footer */}
            <Footer />
          </div>
        </div>

        <TemplateSettings />
      </>
    );
  }
}

export default DoctorAvaliablity;
