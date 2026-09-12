import { observer } from "mobx-react";
import React, { Fragment } from "react";
import { useParams } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getNurseReportUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import NursingReportTabContent from "./nursing-report-components/NursingReportTabContent";
import NursingReportTabHeader from "./nursing-report-components/NursingReportTabHeader";

const ViewNursingReport = observer(() => {
  const { id } = useParams();
  const getNurseReport = getNurseReportUrl(id);
  const getNurseReportConfig = fetchConfig({
    url: getNurseReport,
    method: "get",
  });
  const { data, error } = useRequest(getNurseReportConfig, {
    revalidateOnFocus: false,
  });
  if (error) return <div>failed to load</div>;
  return (
    <Fragment>
      <PageLoader />
      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h3 className="page-title mb-5">Nursing report</h3>
            </header>
            <NursingReportTabHeader />
            <NursingReportTabContent view report={data?.report} />
          </div>
        </div>
      </main>
    </Fragment>
  );
});

export default ViewNursingReport;
