import React, { Fragment, useContext } from "react";
import { observer } from "mobx-react";
import { PageLoader } from "../../../Components";
import {
  HMODashboardHeader,
  HMODashboardSummary,
} from "./hmo-dashboard-components";
import { UserContext } from "../../../mobx/UserState";
import ManageHealthPlans from "./ManageHealthPlans";

const Dashboard = observer(() => {
  const {
    user: { firstName, lastName },
  } = useContext(UserContext);
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <HMODashboardSummary />
            <HMODashboardHeader firstName={firstName} lastName={lastName} />
          </div>
          <div className="page-content">
            <ManageHealthPlans dashboard />
          </div>
        </div>
      </main>
    </Fragment>
  );
});

export default Dashboard;
