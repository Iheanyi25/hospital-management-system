import React from "react";
import { PreConsultationHistory } from "../../Components/Clarking";

class ViewPreConsultationHistory extends React.Component {
  componentDidMount() {
    console.log(JSON.parse(localStorage.getItem("authenticatedUser")));
  }

  render() {
    const { firstName, lastName, id } = JSON.parse(
      localStorage.getItem("authenticatedUser")
    );
    return (
      <PreConsultationHistory patientDetails={{ firstName, lastName, id }} />
    );
  }
}

export default ViewPreConsultationHistory;
