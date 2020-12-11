import React, { Fragment, useState } from "react";
import { fetchConfig } from "../../../api/fetchConfig";
import { useRequest } from "../../../api/fetcher";
import { getServiceRequestUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { Success as Notification } from "../../../Components/Alerts";
import UploadLabResultForm from "./components/ServiceRequestForm";

export default function UploadServiceRequestResult(props) {
  const [ notification, setNotification ] = useState({ show: false, message: '', isError:false });
  const {
    match: { params },
  } = props;

  const serviceRequestUrl = getServiceRequestUrl(params.serviceRequestId);
  const getServiceRequestUrlConfig = fetchConfig({
    url: serviceRequestUrl,
    method: "get",
  });
  const { data, error } = useRequest(getServiceRequestUrlConfig,{
    revalidateOnFocus: false,
  });

  const resetShowState = () => setNotification((state) => ({ ...state, show: false }));
  if (error) return <div>failed to load service request details</div>;
  return (
    <Fragment>
      {!data ? (
        <PageLoader />
      ) : (
        <main className="main-content">
          <div className="app-loader">
            <i className="icofont-spinner-alt-4 rotate" />
          </div>
         
          <div className="main-content-wrap">
          {notification.show && <Notification message={notification.message} callback={resetShowState} />}
            <header className="page-header justify-content-between d-flex align-items-center mb-2">
              <h4 className="page-title">Upload Results for (Lab) Services</h4>
            </header>
            <div className="page-content">
              <div className="card-body"></div>
            </div>
            <div className="page-content">
              <div className="row justify-content-center">
                <div className="col col-12 col-xl-8">
                  <div className="card border-light p-4">
                    <div className="card-body">
                      <UploadLabResultForm
                        serviceRequest={data?.serviceRequest}
                        setNotification={setNotification}
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </Fragment>
  );
}
