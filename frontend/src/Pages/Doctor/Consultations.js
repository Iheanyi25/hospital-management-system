import React, { useContext } from "react";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import {
  ConsultationSummary,
  ConsultationTabContent,
  ConsultationTabHeader,
} from "./consultation-components";

const Consultations = ({ doctorId }) => {
  const {
    user: { id },
  } = useContext(UserContext);
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <ConsultationSummary doctorId={doctorId || id} />

          <header className="page-header">
            <h4 className="page-title">My Consultation List</h4>
          </header>
          <div className="page-content">
            <div className="card-body"></div>
          </div>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <ConsultationTabHeader />
                  <ConsultationTabContent doctorId={doctorId || id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Consultations);
