import React from "react";
import { PageLoader } from "../../Components";
import { ClarkingHistory } from "../../Components/Clarking";

class ViewClarkingHistory extends React.Component {
  render() {
    const { firstName, lastName, id } = JSON.parse(
      localStorage.getItem("authenticatedUser")
    );
    return <ClarkingHistory patientDetails={{ firstName, lastName, id }} />;
  }
}

export default ViewClarkingHistory;
