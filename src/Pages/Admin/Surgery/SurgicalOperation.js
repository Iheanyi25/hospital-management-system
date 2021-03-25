import React, { Fragment } from "react";
import { useLocation, useParams } from "react-router";
import { PageLoader } from "../../../Components";
import SurgicalOperationTabContent from "./SurgicalOperationTabContent";
import SurgicalOperationTabHeader from "./SurgicalOperationTabHeader";

export default function SurgicalOperationNotes(props) {
  const { id: surgeryId } = useParams();
  const { state } = useLocation();

  if (!state?.id) {
    props.history.push("/AdminManageSurgeries");
  }
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header">
            <h3 className="page-title">Surgical post operative orders</h3>
          </header>
          <div className="page-content">
            <div className="card mb-0">
              <div className="card-body">
                <div>
                  <div
                    // style={{ position: "absolute" }}
                    className="col text-right"
                  >
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => props.history.goBack()}
                    >
                      Back to manage surgeries
                    </button>
                  </div>
                  <SurgicalOperationTabHeader />
                </div>
                <SurgicalOperationTabContent surgeryId={surgeryId} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
