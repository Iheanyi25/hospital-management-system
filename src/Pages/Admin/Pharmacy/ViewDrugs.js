import React, { useContext } from "react";
import { observer } from "mobx-react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../mobx/UserState";
import {
  DrugSummary,
  DrugTabContent,
  DrugTabHeader,
} from "./Components/viewdrugs-components/page-components";
const ViewDrugs = observer(() => {
  const {
    user: { userType },
  } = useContext(UserContext);
  return (
    <>
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <header className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="page-title">Drug catalog</h4>
            <Link
              to={
                userType === "Admin"
                  ? "/AdminRegisterDrug"
                  : "/PharmacyRegisterDrug"
              }
              className="btn btn-primary"
            >
              Register Drug
            </Link>
          </header>
          <DrugSummary />
          <div className="page-content">
            <div>
              <DrugTabHeader />
              <DrugTabContent userType={userType} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default ViewDrugs;
