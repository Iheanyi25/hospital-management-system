import React from "react";
import { PageLoader } from "../../Components";
import { LabResults } from "../../Components/Clarking";
class ViewServiceRequests extends React.Component {
  render() {
    console.log(this.props.history.location.state);
    const { firstName, lastName, patientId } = this.props.history.location.state;
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
                <h4 className="text-center">{`${firstName} ${lastName}`}</h4>
              </header>
              <div className="card border-light w-75 m-auto">
                <LabResults patientId={patientId} />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

export default ViewServiceRequests;
