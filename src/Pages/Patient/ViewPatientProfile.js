import React from "react";
import { PatientProfile } from "../../Components/Profiles";

class ViewPatientProfile extends React.Component {
	componentDidMount(){
		console.log(JSON.parse(localStorage.getItem("authenticatedUser")).id);
	}
  render() {
	return <PatientProfile patientId={JSON.parse(localStorage.getItem("authenticatedUser")).id} />
  }
}

export default ViewPatientProfile;
