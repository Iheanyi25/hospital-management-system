import React, { useContext } from "react";
import { PageLoader } from "../../Components";
import { useRequest } from "../../api/fetcher";
import { fetchConfig } from "../../api/fetchConfig";
import { labDashboardUrl } from "../../api/URLs";
import { getAllServiceRequestInvoiceUrl } from "../../api/URLs";
import { UserContext } from "../../mobx/UserState";
import { observer } from "mobx-react";
import LabDashboardSummary from "./lab-dashboard-components/LabDashboardSummary";
import LabDashboardHeader from "./lab-dashboard-components/LabDashboardHeader";
import LabDashboardRequests from "./lab-dashboard-components/LabDashboardRequests";

const Dashboard = () => {
  const {user} = useContext(UserContext);

  const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl(1, 200);
  const getAllServiceRequestInvoiceConfig = fetchConfig({
    url: getAllServiceRequestInvoice,
    method: "get",
  });
  const { data: data1 } = useRequest(getAllServiceRequestInvoiceConfig, {
    revalidateOnFocus: false,
  });
  // serviceRequestInvoices: data.serviceInvoices

  const getLabDashboardCounters = labDashboardUrl();
  const getLabDashboardCountersConfig = fetchConfig({
    url: getLabDashboardCounters,
    method: "get",
  });
  const { data: data2 } = useRequest(getLabDashboardCountersConfig, {
    revalidateOnFocus: false,
  });

  return (
    <>
      <PageLoader />

      <main className="main-content">
        <div className="app-loader">
          <i className="icofont-spinner-alt-4 rotate" />
        </div>
        <div className="main-content-wrap">
          <div className="page-content">
            <LabDashboardSummary
              serviceCategory={data2?.serviceCategoryCount || 0}
              service={data2?.servicesCount || 0}
              completedServiceRequest={data2?.serviceRequestPaidAndDoneCount}
              uncompletedServiceRequest={data2?.serviceRequestPaidAndNotDoneCount || 0}
            />
            <LabDashboardHeader firstName={user?.firstName || ""} lastName={user?.lastName || ""} />
            {data1 && <LabDashboardRequests serviceRequestInvoices={data1.serviceInvoices} />}
          </div>
        </div>
      </main>
    </>
  );
};

export default observer(Dashboard);
