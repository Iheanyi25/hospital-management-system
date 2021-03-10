import React from "react";
import { useHistory, useParams } from "react-router-dom";
import CreateServiceRequest from "../../Pages/Admin/Util_Services/CreateServiceRequest";

const ServiceRequest = () => {
  const history = useHistory();
  const { id } = useParams();
  return <CreateServiceRequest admissionId={id} history={history} />;
};

export default ServiceRequest;
