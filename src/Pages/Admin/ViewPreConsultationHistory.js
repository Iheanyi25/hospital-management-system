import React from "react";
import { PageLoader } from "../../Components";
import { PreConsultationHistory } from "../../Components/Clarking";
class ViewPreConsultationHistory extends React.Component {
  render() {
    console.log(this.props.history.location.state);
    const { firstName, lastName, id } = this.props.history.location.state;
    return (
      <>
        <PageLoader />
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <header>
                <h4 className="text-center">Patient’s pre-consultation health history</h4>
              </header>
              <div className="card border-light w-75 m-auto">
                <PreConsultationHistory
                  patientDetails={{ id, firstName, lastName }}
                />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ViewPreConsultationHistory;
