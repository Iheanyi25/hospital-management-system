import React from "react";
import { useParams } from "react-router-dom";
import CreateServiceRequest from "../../Pages/Admin/Util_Services/CreateServiceRequest";

const ServiceRequest = () => {
  const { id } = useParams();
  return <CreateServiceRequest admissionId={id} />;
};

export default ServiceRequest;
