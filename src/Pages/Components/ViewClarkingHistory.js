import React from "react";
import { PageLoader } from "../../Components";
import { ClarkingHistory } from "../../Components/Clarking";

let $ = window.$;
$.DataTables = require("datatables.net");

class ViewClarkingHistory extends React.Component {

  render() {
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
                <h4 className="text-center">Patient’s clarking history</h4>
              </header>
              <div className="card border-light w-75 m-auto">
                <ClarkingHistory
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

export default ViewClarkingHistory;
