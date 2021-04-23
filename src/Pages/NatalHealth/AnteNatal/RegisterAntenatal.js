import React, { Fragment } from "react";
import { observer } from "mobx-react";
import RecordForm from "./AntenatalComponents/RecordForm";

const RegisterAntenatal = observer(() => {
  return (
    <Fragment>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="page-header justify-content-between d-flex align-items-center mb-2">
            <h4 className="page-title">Antenatal</h4>
          </header>
          <div className="page-content">
            <RecordForm />
          </div>
        </div>
      </main>
    </Fragment>
  );
});

export default RegisterAntenatal;
