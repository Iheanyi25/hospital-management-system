import React from "react";
import { PageLoader } from "../../Components";
import { fetchConfig } from "../../api/fetchConfig";
import {
  getAllAccountsUrl,
  getAllServiceRequestInvoiceUrl,
  getRegistrationFeeInvoiceUrl,
} from "../../api/URLs";
import SurveyEcharts from "./accountant-dashboard-components/SurveyEcharts";
import ManagePrescriptionInvoice from "../Admin/Pharmacy/ManagePrescriptionInvioice";
import AccountantDashboardSummary from "./accountant-dashboard-components/AccountantDashboardSummary";
import { useRequest } from "../../api/fetcher";


const Dashboard = () => {
  const getRegistrationFeeInvoice = getRegistrationFeeInvoiceUrl();
  const getRegistrationFeeInvoiceConfig = fetchConfig({
    url: getRegistrationFeeInvoice,
    method: "get",
  });
  const { data: data1 } = useRequest(getRegistrationFeeInvoiceConfig, {
    revalidateOnFocus: false,
  });

  const getAllServiceRequestInvoice = getAllServiceRequestInvoiceUrl(1,50);
  const getAllServiceRequestInvoiceConfig = fetchConfig({
    url: getAllServiceRequestInvoice,
    method: "get",
  });
  const { data: data2 } = useRequest(getAllServiceRequestInvoiceConfig, {
    revalidateOnFocus: false,
  });

  const getAllAccounts = getAllAccountsUrl(1,50);
  const getAllAccountsUrlConfig = fetchConfig({
    url: getAllAccounts,
    method: "get",
  });
  const { data: data3 } = useRequest(getAllAccountsUrlConfig, {
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
            {<AccountantDashboardSummary
                registrationInvoices={data1?.registrationInvoices || []}
                serviceRequestInvoices={data2?.serviceInvoices || []}
                accounts={data3?.accounts || []}
              />
            }
            <SurveyEcharts /> 
            <ManagePrescriptionInvoice isDashboard={true} />
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
