import { observer } from "mobx-react";
import React, { Fragment, useState, useContext } from "react";
import { useHistory } from "react-router";
import { fetchConfig } from "../../../api/fetchConfig";
import { fetchWrapper, useRequest } from "../../../api/fetcher";
import {
  getAdmissionServiceRequestUrl,
  uploadServiceRequestResultUrl,
} from "../../../api/URLs";
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
    params: { id: serviceRequestId },
  } = match;

  const serviceRequestUrl = getAdmissionServiceRequestUrl(serviceRequestId);
  const getAdmissionServiceRequestConfig = fetchConfig({
    url: serviceRequestUrl,
    method: "get",
  });
  const { data, error } = useRequest(getAdmissionServiceRequestConfig, {
    revalidateOnFocus: false,
  });
  console.log(data);
  const uploadServiceRequestResult = async (data) => {
    //append others
    setLoading(true);
    const { result, additionalComments, images } = data;
    const requestResultData = new FormData();
    requestResultData.append("serviceRequestId", serviceRequestId);
    requestResultData.append("result", result);
    requestResultData.append("additionalComments", additionalComments);

    images.forEach((image) => requestResultData.append("images", image));

    const serviceRequestUrl = uploadServiceRequestResultUrl();
    const postServiceRequest = fetchConfig({
      url: serviceRequestUrl,
      method: "post",
      data: requestResultData,
    });
    try {
      const resServiceRequestUpdate = await fetchWrapper(postServiceRequest);
      if (resServiceRequestUpdate.status === 200) {
        notification.success({
          message: resServiceRequestUpdate.data.message,
        });
        console.log(resServiceRequestUpdate, 5775);
        history.push({
          pathname:
            userType === "Admin"
              ? `/AdminViewAdmissionsServiceRequestResults/${serviceRequestId}`
              : `/LabViewAdmissionsServiceRequestResults/${serviceRequestId}`,
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
                        serviceRequest={data?.admissionServiceRequest}
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
