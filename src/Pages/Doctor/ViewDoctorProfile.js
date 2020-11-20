import React from "react";
import { DoctorProfile } from '../../Components/Profiles'
class ViewDoctorProfile extends React.Component {

  render() {
    return (
      <DoctorProfile doctorId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
    );
  }
}

export default ViewDoctorProfile;
