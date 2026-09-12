import React from "react";
import {
  PageLoader,
  TemplateSettings,
} from "../../Components";
import { getAllPrescriptionsUrl, pharmacyDashboardUrl } from "../../api/URLs";
import { fetchConfig } from "../../api/fetchConfig";
import DashboardPrescriptionList from "./dashboard-components/DashboardPrescriptionList";
import PharmacyDashboardSummary from "./dashboard-components/PharmacyDashboardSummary";
import PharmacyDashboardHeader from "./dashboard-components/PharmacyDashboardHeader";
import { useRequest } from "../../api/fetcher";

const DashBoard = () => {
  const getPrescriptionsUrl = getAllPrescriptionsUrl();
  const getAllPrescriptionsConfig = fetchConfig({
    url: getPrescriptionsUrl,
    method: "get",
  });
  const { data: data1 } = useRequest(getAllPrescriptionsConfig, {
    revalidateOnFocus: false,
  });

  const getPharmacyDashboard = pharmacyDashboardUrl();
  const getPharmacyDashboardConfig = fetchConfig({
    url: getPharmacyDashboard,
    method: "get",
  });
  const { data: data2 } = useRequest(getPharmacyDashboardConfig, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <PageLoader />
      <>
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
          <div className="main-content-wrap">
            <div className="page-content">
              <PharmacyDashboardSummary
                drugCount={data2?.drugCount || 0}
                prescriptionsCount={data1?.prescriptions?.length || 0}
              />
              <PharmacyDashboardHeader />
            </div>
            {data1 && (
              <DashboardPrescriptionList
                prescriptions={data1.prescriptions || []}
              />
            )}
          </div>
        </main>
      </>
      {/* App Settings modals */}
      <TemplateSettings />
    </>
  );
};

export default DashBoard;