import React from "react";
import { PageLoader, SelectableDropDown } from "../../Components";
import { Success } from '../../Components/Alerts'

const apiUrl = process.env.REACT_APP_API_URL;
const $ = window.$;
let selectId = Math.random();
selectId = selectId.toString().replace(".", "_");

class BookConsultation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      doctors: [],
      patients: [],
      doctorId: "",
      patientId: "",
      patientEmail: "",
      consultationTitle: "",
      reasonForConsultation: "",
      success: false
    };
  }

  async componentDidMount() {
    this.fetchDoctors();
    this.fetchPatients().then(() => {
      this.sync(selectId)
      this.sync(selectId + 1)
    });
  }

  sync = (selectId) => {
    var select = $(`#custom_select_${selectId}`);

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: '',
          styleBase: 'form-control',
          tickIcon: 'icofont-check-alt'
        });
      });
    }
  }

  renderPatientPicker() {
    var select = $(".custom-patient-picker");

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  // const { params } = this.props.match;
  renderDoctorPicker() {
    var select = $(".custom-doctor-picker");

    if (select.length) {
      select.each(function () {
        $(this).selectpicker({
          style: "",
          styleBase: "form-control",
          tickIcon: "icofont-check-alt",
        });
      });
    }
  }

  fetchPatients = async () => {
    let res = await fetch(apiUrl + "/Patient/GetPatients");
    const data = await res.json();
    const patientArray = [];

    data.patients.forEach((element) => {
      patientArray.push(element.patient);
    });
    console.log("dd");
    console.log(patientArray);
    this.setState({ patients: patientArray }, () => {
      this.renderPatientPicker();
    });
  };

  fetchDoctors = async () => {
    let res = await fetch(apiUrl + "/Doctor/GetDoctors");
    const data = await res.json();
    const doctorArray = [];

    data.doctors.forEach((element) => {
      doctorArray.push(element.doctor);
    });

    this.setState({ doctors: doctorArray }, () => {
      this.renderDoctorPicker();
    });
  };

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  async bookConsultation(e) {
    e.preventDefault();

    const {
      consultationTitle,
      reasonForConsultation,
      patientId,
      doctorId,
    } = this.state;

    let data = {
      consultationTitle,
      reasonForConsultation,
      patientId,
      doctorId
    };

    if (!doctorId) {
      delete data.doctorId;
    }

    try {
      const request = await fetch(`${apiUrl}/Admin/BookConsultation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!request.ok) {
        const error = await request.json();
        throw Error(error.message);
      }

      // const response = await request.json();
      // console.log(response);
      this.setState({ success: true })
      // this.setState({
      //   showSuccessMessage: true,
      //   successMessage: data.message,
      //   consultationTitle: "",
      //   reasonForConsultation: "",
      // });
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  render() {
    let {
      doctorId,
      patientId,
      consultationTitle,
      reasonForConsultation,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success ? (
            <Success
              history={this.props.history}
              message="Well done, you successfully booked a consultation"
              nextRoute="/AdminConsultations"
            />
          ) : null}
          <div className="main-content-wrap w-75">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4 p-5">
                        <h4 className="text-center">Book Consultation</h4>

                        <div className="form-group">
                          <label>Select A Patient</label>

                          <select
                            className="form-control"
                            value={patientId}
                            id={`custom_select_${selectId}`}
                            data-live-search="true"
                            onChange={(e) => this.handleChange("patientId", e)}
                          >
                            <option selected value="">
                              Select a Patient
                            </option>
                            {this.state.patients.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.id}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>
                            Select A Doctor ( If you want this consultation to be
                            assigned to a doctor )
                          </label>
                          {/* <SelectableDropDown
                            data={this.state.doctors}
                            itemKey={["id"]}
                          /> */}


                          <select
                            className="form-control"
                            value={doctorId}
                            id={`custom_select_${selectId + 1}`}
                            data-live-search="true"
                            onChange={(e) => this.handleChange("doctorId", e)}
                          >
                            <option selected value="">
                              Select a Doctor
                            </option>
                            {this.state.doctors.map((item, index) => {
                              return (
                                <option
                                  key={index}
                                  value={item.id}
                                >{`${item.firstName} ${item.lastName}`}</option>
                              );
                            })}
                          </select>
                        </div>

                        <div className="form-group">
                          <label>Title of Consultation</label>

                          <input
                            className="form-control"
                            placeholder="Consulation Title"
                            tabIndex={-98}
                            onChange={(e) =>
                              this.handleChange("consultationTitle", e)
                            }
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
                              this.handleChange("reasonForConsultation", e)
                            }
                            value={reasonForConsultation}
                          />
                        </div>
                        {/* {displayErrorMessage}
                        {displaySuccessMessage} */}
                        <div className="row mt-5">
                          <div className="col">
                          </div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => this.bookConsultation(e)}
                              disabled={
                                patientId === "" ||
                                  reasonForConsultation === "" ||
                                  consultationTitle === ""
                                  ? true
                                  : false
                              }
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
  }
}

export default BookConsultation;
