import React from "react";
import { fetchConfig } from "../../api/fetchConfig";
import { fetchWrapper } from "../../api/fetcher";
import { getPatientPreConsultationUrl } from "../../api/URLs";
import formatDate from "../../utils/formatDate";
import { PageLoader } from "../Loader";

let $ = window.$;
$.DataTables = require("datatables.net");

class PreConsultationHistory extends React.Component {
  state = {
    patientPreConsultations: [],
    loading: true,
  };

  componentDidMount() {
    console.log(this.props.patientDetails);
    this.fetchServiceCategories();
  }

  fetchServiceCategories = async () => {
    const { id } = this.props.patientDetails;

    try {
      const getPatientPreConsultation = getPatientPreConsultationUrl(id);
      const getPatientPreConsultationConfig = fetchConfig({
        url: getPatientPreConsultation,
        method: "GET",
      });
      const { data, status } = await fetchWrapper(
        getPatientPreConsultationConfig
      );

      this.setState({
        patientPreConsultations: data.patientPreConsultation,
      });
      if (status === 200) {
        this.setState({ ...this.state, loading: false });
      }
      if (this.props.setCount)
        this.props.setCount(this.state.patientPreConsultations.length);
    } catch (error) {
      console.log(error);
      this.setState({ loading: false });
    }
  };

  render() {
    const { patientPreConsultations, loading } = this.state;
    const { firstName, lastName } = this.props.patientDetails;

    return (
      <>
        <div className="card-body">
          {this.props.user ? null : (
            <h4 className="text-center mb-4">{`${firstName} ${lastName}`}</h4>
          )}
          <div id="accordion" className="mb-3">
            {loading ? (
              <PageLoader />
            ) : patientPreConsultations.length === 0 ? (
              <div className="d-flex justify-content-center my-4">
                <img
                  src={require("../../assets/img/emptyData.svg")}
                  alt="empty states"
                />
              </div>
            ) : (
              patientPreConsultations.map((patientPreConsultation, index) => (
                <div className="card mb-0">
                  <div className="card-header" id={`heading${index + 1}`}>
                    <h5 className="mb-0">
                      <button
                        className="btn btn-outline-primary btn-block"
                        data-toggle="collapse"
                        data-target={`#collapse${index + 1}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index + 1}`}
                      >
                        {`Captured on ${
                          formatDate(patientPreConsultation?.date) ?? ""
                        }`}
                      </button>
                    </h5>
                  </div>
                  <div
                    id={`collapse${index + 1}`}
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body w-50">
                      <div className="pl-5">
                        <h6 className="font-weight-bold">Patient Vitals</h6>
                        <div className="border-bottom pb-3">
                          <p className="mb-0">Blood pressure</p>
                          <small className="text-info">
                            {patientPreConsultation?.bloodPressure}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">Respiration</p>
                          <small className="text-info">
                            {patientPreConsultation?.respiration}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">Pulse</p>
                          <small className="text-info">
                            {patientPreConsultation?.pulse}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">SPO2</p>
                          <small className="text-info">
                            {patientPreConsultation?.spO2}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">Tempreture (celcius)</p>
                          <small className="text-info">
                            {patientPreConsultation?.temperature}
                          </small>
                        </div>
                      </div>
                      <div className="pl-5 mt-4">
                        <h6 className="font-weight-bold">Patient BMI</h6>
                        <div className="border-bottom pb-3">
                          <p className="mb-0">Weight (kg)</p>
                          <small className="text-info">
                            {patientPreConsultation?.weight}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">Height (m)</p>
                          <small className="text-info">
                            {patientPreConsultation?.height}
                          </small>
                        </div>
                        <div className="border-bottom pb-3">
                          <p className="mb-0 mt-2">Calculated BMI</p>
                          <small className="text-info">
                            {patientPreConsultation?.calculatedBMI}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )) ?? null
            )}
          </div>
        </div>
      </>
    );
  }
}

export { PreConsultationHistory };
