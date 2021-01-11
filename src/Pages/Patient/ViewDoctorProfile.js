import React from "react";
import { DoctorProfile } from "../../Components/Profiles";
const ViewDoctorProfile = ({ match }) => {
  const { id } = match.params;
  return <DoctorProfile doctorId={id} />;
};

export default ViewDoctorProfile;
