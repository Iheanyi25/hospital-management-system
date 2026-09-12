import { observer } from "mobx-react";
import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import { getServiceRequestUrl, postServiceRequestUrl } from "../../../api/URLs";
import { PageLoader } from "../../../Components";
import { UserContext } from "../../../mobx/UserState";
import { notification } from "../../../utils/notification";
import UploadLabResultForm from "../../../Components/LabServices/ServiceRequestForm";

const UploadServiceRequestResult = observer(({ match }) => {
  const {
    user: { userType },
  } = useContext(UserContext);
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const {
    params: { serviceRequestId },
  } = match;

  const serviceRequestUrl = getServiceRequestUrl(serviceRequestId);
  const getServiceRequestUrlConfig = fetchConfig({
    url: serviceRequestUrl,
    method: "get",
  });
  const { data, error } = useRequest(getServiceRequestUrlConfig, {
    revalidateOnFocus: false,
  });
  const uploadServiceRequestResult = async (data) => {
    //append others
    setLoading(true);
    const { result, additionalComments, images } = data;
    const requestResultData = new FormData();
    requestResultData.append("serviceRequestId", serviceRequestId);
    requestResultData.append("result", result);
    requestResultData.append("additionalComments", additionalComments);

    images.forEach((image) => requestResultData.append("images", image));

    const serviceRequesyUrl = postServiceRequestUrl();
    const postServiceRequest = fetchConfig({
      url: serviceRequesyUrl,
      method: "post",
      data: requestResultData,
    });
    try {
      const resServiceRequestUpdate = await fetchWrapper(postServiceRequest);
      if (resServiceRequestUpdate.status === 200) {
        notification.success({
          message: resServiceRequestUpdate.data.message,
        });
        history.push({
          pathname:
            userType === "Admin"
              ? `/AdminViewLabResults/${serviceRequestId}`
              : `/LabViewLabResults/${serviceRequestId}`,
          state: resServiceRequestUpdate.data.serviceRequestResult.id,
        });
      }
    } catch (error) {
      console.log(error);
      notification.error({ message: error?.response?.data?.message });
    }
    setLoading(false);
  };

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
                        loading={loading}
                        uploadServiceRequestResult={uploadServiceRequestResult}
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
});

export default UploadServiceRequestResult;
