import { observer } from "mobx-react";
import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getDoctorsUrl, postPatientConsultationUrl } from "../../api/URLs";
import { PageLoader } from "../../Components";
import { Success } from "../../Components/Alerts";
import { UserContext } from "../../mobx/UserState";

class BookConsultation extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      doctor: "",
      doctorProfile: "",
      doctorId: "",
      consultationTitle: "",
      reasonForConsultation: "",
    };
  }

  async componentDidMount() {
    const { params } = this.props.match;

    //grab the logged in user
    this.setState({ doctorId: params.doctorId });

    const getDoctors = getDoctorsUrl();
    const getDoctorsConfig = fetchConfig({ url: getDoctors, method: "get" });
    const { data } = await fetchWrapper(getDoctorsConfig);

    this.setState({
      doctor: data.doctor,
      doctorProfile: data.doctor,
    });
  }

  handleChange(name, e) {
    const value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  async bookConsultation(e) {
    e.preventDefault();
    const { user: { id } } = this.context;

    const consultationDet = {
      consultationTitle: this.state.consultationTitle,
      reasonForConsultation: this.state.reasonForConsultation,
      doctorId: this.state.doctorId,
      patientId: id,
    };
    try {
      const postPatientConsultation = postPatientConsultationUrl();
      const postPatientConsultationConfig = fetchConfig({
        url: postPatientConsultation,
        data: consultationDet,
        method: "post",
      });
      const res = await fetchWrapper(postPatientConsultationConfig);
      const { data, error } = res;

      if (res.status !== 200) {
        throw Error(error.message);
      }
      this.setState({
        showSuccessMessage: true,
        successMessage: data.message,
        consultationTitle: "",
        reasonForConsultation: "",
      });
    } catch (err) {
      this.setState({ showErrorMessage: true, errorMessage: err.message });
    }
  }

  render() {
    let { consultationTitle, reasonForConsultation } = this.state;
    const { firstName, lastName } = this.props.location.state;

    let displayErrorMessage;
    let displaySuccessMessage;

    if (this.state.showErrorMessage) {
      displayErrorMessage = (
        <div className="alert alert-danger with-after-icon" role="alert">
          <div className="alert-content">{this.state.errorMessage}</div>
          <div className="alert-icon">
            <i className="icofont-alarm" />
          </div>
        </div>
      );
    }

    return (
      <>
        <PageLoader />
        {this.state.showSuccessMessage ? (
          <Success
            history={this.props.history}
            message={this.state.successMessage}
            nextRoute={"/PatientConsultations"}
          />
        ) : null}
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-md-12">
                  <div className="card border-light">
                    <div className="card-body">
                      <form className="mb-4">
                        <h4 className="text-center">
                          {`Consultation Form (${firstName} ${lastName}`})
                        </h4>
                        <div className="form-group">
                          <label>Title of Consultation</label>

                          <input
                            className="form-control"
                            placeholder="Consultation Title"
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
                            placeholder={"Reason for Consultation"}
                            onChange={(e) =>
                              this.handleChange("reasonForConsultation", e)
                            }
                            value={reasonForConsultation}
                          />
                        </div>
                        {displayErrorMessage}
                        {displaySuccessMessage}
                        <div className="row">
                          <div className="col"></div>
                          <div className="col text-right">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={(e) => this.bookConsultation(e)}
                              disabled={
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

export default observer(BookConsultation);
