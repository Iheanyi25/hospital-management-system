import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  deleteConsultationUrl,
  getPatientConsultationCountUrl,
  getPatientConsultationsUrl,
  getPatientsAttentedToCountUrl,
  getPatientsUnattentedToCountUrl,
  getPatientsUrl
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import { Success } from "../../Components/Alerts";
import { ReAssign } from "../../Components/Modals/ReAssignModal";
import AttendedPatients from "./consultation-components/AttendedPatients";
import ConsultationSummary from "./consultation-components/ConsultationSummary";
import ConsultationTabHeader from "./consultation-components/ConsultationTabHeader";
import PatientAttachedToDoctors from "./consultation-components/PatientAttachedToDoctors";
import PatientsOnOpenList from "./consultation-components/PatientsOnOpenList";

const $ = require("jquery");
$.Datatable = require("datatables.net");

class Consultations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      patientsOnOpenList: [],
      patientsOnOpenListCount: 0,
      patientsAttachedToDoctors: [],
      patientsAttachedToDoctorsCount: 0,
      patientsAttendedTo: [],
      patientsAttendedToCount: 0,
      success: { show: false, message: "", delError: false },
    };
  }

  async componentDidMount() {
    await this.getAllConsultations();
  }

  deleteConsultation = async (e, id) => {
    e.preventDefault();
    console.log("deleting...");
    try {
      const deleteConsultation = deleteConsultationUrl()
      const deleteConsultationConfig = fetchConfig({ url: deleteConsultation, data: { consultationId: id }, method: 'post' })
      const res = await fetchWrapper(deleteConsultationConfig)

      console.log(res, 5555);

      if (res.status === 200) {
        this.getAllConsultations();
        this.setState((state) => ({
          ...state,
          success: { show: true, message: res.message, delError: false },
        }));
      } else {
        throw res.message;
      }
    } catch (error) {
      console.log(error);
      this.setState((state) => ({
        ...state,
        success: { show: true, message: error, delError: true },
      }));
    }
  };

  sync() {
    this.$el = $(this.el);
    this.$el.DataTable();
    this.$em = $(this.em);
    this.$em.DataTable();
    this.$en = $(this.en);
    this.$en.DataTable();
  }
  resetShowState = () =>
    this.setState((state) => ({
      ...state,
      success: { message: "", delError: false, show: false },
    }));
  async getAllConsultations() {
    const patientsOnOpenList = [];
    const patientsAttachedToDoctors = [];
    const patientsAttendedTo = [];

    const getPatientConsultations = getPatientConsultationsUrl();
    const getPatientConsultationsConfig = fetchConfig({
      url: getPatientConsultations,
      method: "get",
    });
    const { data } = await fetchWrapper(getPatientConsultationsConfig);

    const getPatientConsultationsCount = getPatientConsultationCountUrl();
    const getPatientConsultationsCountConfig = fetchConfig({
      url: getPatientConsultationsCount,
      method: "get",
    });
    const { data: data1 } = await fetchWrapper(
      getPatientConsultationsCountConfig
    );

    const getPatientsUnattentedToCount = getPatientsUnattentedToCountUrl();
    const getPatientsUnattentedToCountConfig = fetchConfig({
      url: getPatientsUnattentedToCount,
      method: "get",
    });
    const { data: data2 } = await fetchWrapper(
      getPatientsUnattentedToCountConfig
    );

    const getPatientsAttentedToCount = getPatientsAttentedToCountUrl();
    const getPatientsAttentedToCountConfig = fetchConfig({
      url: getPatientsAttentedToCount,
      method: "get",
    });
    const { data: data3 } = await fetchWrapper(
      getPatientsAttentedToCountConfig
    );

    this.setState({ consultations: data.patientConsultations });

    data.consultations.forEach((consultation) => {
      if (consultation.isCompleted === true) {
        patientsAttendedTo.push(consultation);
      } else if (!consultation.doctorId) {
        patientsOnOpenList.push(consultation);
      } else if (consultation.doctorId) {
        patientsAttachedToDoctors.push(consultation);
      }
    });

    this.setState({
      patientsOnOpenList: patientsOnOpenList,
      patientsOnOpenListCount: data1.consultationCount,
      patientsAttachedToDoctors: patientsAttachedToDoctors,
      patientsAttachedToDoctorsCount: data2.consultationCount,
      patientsAttendedTo: patientsAttendedTo,
      patientsAttendedToCount: data3.consultationCount,
    });
  }

  setConsultationId = (id) => {
    this.setState({ activeConsultation: id });
  };

  render() {
    const {
      patientsOnOpenList,
      patientsOnOpenListCount,
      patientsAttachedToDoctors,
      patientsAttachedToDoctorsCount,
      patientsAttendedTo,
      patientsAttendedToCount,
    } = this.state;

    return (
      <>
        <PageLoader />

        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          {this.state.success.show ? (
            <Success
              history={this.props.history}
              message={this.state.success.message}
              callback={this.resetShowState}
              isError={this.state.success.delError}
            />
          ) : null}
          <div className="main-content-wrap">
            <ConsultationSummary
              patientsOnOpenListCount={patientsOnOpenListCount}
              patientsAttachedToDoctorsCount={patientsAttachedToDoctorsCount}
              patientsAttendedToCount={patientsAttendedToCount}
            />
            <header className="page-header">
              <h4 className="page-title">Consultation List</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="card mb-0">
                <div className="card-body">
                  <div>
                    <ConsultationTabHeader />
                    <div className="tab-content" id="pills-tabContent">
                      <div
                        className="tab-pane fade show active"
                        id="pills-active"
                        role="tabpanel"
                        aria-labelledby="pills-active-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(el) => (this.el = el)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <PatientsOnOpenList
                              patientsOnOpenList={patientsOnOpenList}
                              setConsultationId={this.setConsultationId}
                              deleteConsultation={this.deleteConsultation}
                            />
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-accepted"
                        role="tabpanel"
                        aria-labelledby="pills-accepted-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(em) => (this.em = em)}
                            className="table table-striped"
                            data-paging="true"
                            data-info="true"
                          >
                            <PatientAttachedToDoctors
                              patientsAttachedToDoctors={
                                patientsAttachedToDoctors
                              }
                              setConsultationId={this.setConsultationId}
                              deleteConsultation={this.deleteConsultation}
                            />
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="pills-completed"
                        role="tabpanel"
                        aria-labelledby="pills-completed-tab"
                      >
                        <div className="table-responsive">
                          <table
                            ref={(en) => (this.en = en)}
                            className="table"
                            data-paging="true"
                            data-info="true"
                          >
                            <AttendedPatients
                              patientsAttendedTo={patientsAttendedTo}
                            />
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        <ReAssign
          consultationId={this.state.activeConsultation}
          route={"ReassignConsultation"}
        />
      </>
    );
  }
}

export default Consultations;
