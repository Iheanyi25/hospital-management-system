import { observer } from "mobx-react";
import React from "react";
import { Link } from "react-router-dom";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import {
  postAdmitOrSendPatientHomeUrl,
  updatePatientClerkingUrl,
} from "../../api/URLs";
import { PageLoader } from "../../Components";
import AdmissionReferral from "../../Components/Modals/AdmissionReferral";
import SurgeryReferral from "../../Components/Modals/SurgeryReferral";
import { UserContext } from "../../mobx/UserState";
import { notification } from "../../utils/notification";
import { ClarkingTabContent, ClarkingTabHeader } from "./clarking-components";

class Clerking extends React.Component {
  static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      doctorQueue: null,
      canceledConsultations: [],
      completedConsultations: [],
      pendingConsultations: [],
      capturePatientHealthHistory: {},
      clarking: {},
      healthHistory: {},
      labHistory: {},
      message: "",
      success: false,
      reMount: true,
    };
  }

  handleSubmit = (type, key, e) => {
    e.preventDefault();

    let payload = [];
    key.forEach((element) => {
      let newPatch = this.formatJSONPATCH(
        "replace",
        `/${element}`,
        this.state[type][element]
      );
      payload.push(newPatch);
    });

    this.submitRequest(payload);
    this.setState({ reMount: !this.state.reMount });
  };

  componentDidMount() {
    this.props.location.state?.id ?? this.props.history.push("/");
  }

  submitRequest = async (payload) => {
    const {
      user: { id: userId },
    } = this.context;
    const { id, type, patient } = this.props.location.state;

    try {
      const updatePatientClerking = updatePatientClerkingUrl(
        id,
        type,
        userId,
        patient.id
      );
      const updatePatientClerkingConfig = fetchConfig({
        url: updatePatientClerking,
        data: JSON.stringify(payload),
        method: "patch",
      });
      const res = await fetchWrapper(updatePatientClerkingConfig);
      notification.success({ message: res.data.message });
    } catch (error) {
      notification.error({ message: error?.response?.data?.message });
    }
  };

  handleChange = (type, key, e) => {
    this.setState({ [type]: { ...this.state[type], [key]: e.target.value } });
  };

  formatJSONPATCH = (op, path, value) => {
    return {
      op,
      path,
      value,
    };
  };

  clearData = (type, key) => {
    this.setState({ [type]: { [key]: "" } });
  };

  finishClarking = async (e) => {
    e.preventDefault();

    const { id } = this.props.location.state;

    let payload = {
      id: id,
      isAdmitted: false,
      isSentHome: true,
      initiatorId: JSON.parse(localStorage.getItem("authenticatedUser")).id,
    };

    try {
      const postAdmitOrSendPatientHome = postAdmitOrSendPatientHomeUrl();
      const postAdmitOrSendPatientHomeConfig = fetchConfig({
        url: postAdmitOrSendPatientHome,
        data: payload,
        method: "post",
      });
      const res = await fetchWrapper(postAdmitOrSendPatientHomeConfig);
      if (res.status === 200) {
        notification.success({ message: res.data.message });
        this.props.history.push("/AdminDashboard");
      }
    } catch (error) {
      notification.error({ message: error?.response?.data.message });
    }
  };

  render() {
    console.log(this.props.location, 99999);
    const { firstName, lastName, id } = this.props.location.state.patient;
    const { capturePatientHealthHistory, clarking } = this.state;
    const { state: otherDetails } = this.props.location;
    return (
      <>
        <PageLoader />

        <main className="main-content mt-5">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <header className="page-header d-flex justify-content-between">
              <h3 className="page-title">
                Doctor Clerking:{" "}
                <font>
                  {lastName.toUpperCase() + " " + firstName.toUpperCase()}
                </font>
              </h3>
              <div>
                <div className="col"></div>
                <div className="col text-right">
                  <Link
                    to="#"
                    data-toggle="modal"
                    data-target="#surgery-referral"
                    className="btn btn-outline-primary mr-2 mb-2"
                  >
                    Surgery
                  </Link>
                  <Link
                    to="#"
                    data-toggle="modal"
                    data-target="#admission-referral"
                    className="btn btn-outline-primary mr-2 mb-2"
                  >
                    Admit
                  </Link>
                  <Link
                    onClick={(e) => this.finishClarking(e)}
                    className="btn btn-primary mr-2 mb-2"
                  >
                    Send Home
                  </Link>
                </div>
              </div>
            </header>
            <div className="page-content">
              <div className="row">
                <ClarkingTabHeader state={this.props.location.state} />
                <ClarkingTabContent
                  firstName={firstName}
                  lastName={lastName}
                  id={id}
                  capturePatientHealthHistory={capturePatientHealthHistory}
                  clarking={clarking}
                  reMount={this.reMount}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </div>
            </div>
          </div>
        </main>
        <AdmissionReferral id={this.props.location.state.id} />
        <SurgeryReferral
          id={otherDetails.id}
          idType={otherDetails?.type}
          patientId={otherDetails?.patient?.id}
        />
      </>
    );
  }
}

export default observer(Clerking);
