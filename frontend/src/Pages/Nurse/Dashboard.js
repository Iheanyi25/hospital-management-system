import React, { useContext } from "react";
import { observer } from "mobx-react";
import { PageLoader } from "../../Components";
import { UserContext } from "../../mobx/UserState";
import {
  NurseDashboardSummary,
  NurseDashboardHeader,
} from "./nurse-dashboard-components";
import ConsultationsWithDoctors from "../Admin/consultation-components/ConsultationsWithDoctors";

const Dashboard = observer(() => {
  const {
    user: { firstName, lastName },
  } = useContext(UserContext);
  return (
    <>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <NurseDashboardSummary />
            <NurseDashboardHeader firstName={firstName} lastName={lastName} />
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Consulations with Doctors</h4>
            </header>
            <ConsultationsWithDoctors />
          </div>
        </div>
      </main>
    </>
  );
});

export default Dashboard;
