import React from "react";
import { PageLoader } from "../../Components";
import AppointmentSummary from "./appointment-components/AppointmentSummary";
import AppointmentTabHeader from "./appointment-components/AppointmentTabHeader";
import AppointmentTabContent from "./appointment-components/AppointmentTabContent";

const Appointments = () => {
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <AppointmentSummary />
          <header className="page-header">
            <h4 className="page-title"> Appointments List</h4>
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <AppointmentTabHeader />
                </div>
                <AppointmentTabContent />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
export default Appointments;
