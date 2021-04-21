import React, { useState, Fragment, useContext } from "react";
import { observer } from "mobx-react";
import RecordForm from "./AntenatalComponents/RecordForm";

const RegisterAntenatal = observer(() => {
//   if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      {/* <PageLoader /> */}
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Antenatal</h4>
          </header>
          <div className="page-content">
              <div className="container">
                  <div className="row">
                    <div className="col-md-6">
                    </div>
                    <div className="col-md-6">
                      <div className="card border-light">
                        <div className="card-body">
                          <RecordForm/>
                        </div> 
                      </div>
                    </div>
                  </div>
              </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
});

export default RegisterAntenatal;
