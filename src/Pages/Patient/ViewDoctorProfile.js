import React from "react";
import { DoctorProfile } from "../../Components/Profiles";

const apiUrl = process.env.REACT_APP_API_URL;

class ViewDoctorProfile extends React.Component {

  render() {
    const { params } = this.props.match;
    return <DoctorProfile doctorId={params.id} user />;
  }
}

export default ViewDoctorProfile;
