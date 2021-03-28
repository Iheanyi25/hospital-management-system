import React from "react";
import { PatientProfile } from "../../Components/Profiles";

class ViewPatientProfile extends React.Component {

  render() {
    return <PatientProfile patientId= {this.props.location.state.patientId} state={this.props.location.state}/>;
  }
}

export default ViewPatientProfile;
