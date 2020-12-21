import React from "react";
import { AdminProfile } from '../../Components/Profiles'

class ViewAdminProfile extends React.Component {

  render() {
    return (
      <AdminProfile adminId={JSON.parse(localStorage.getItem("authenticatedUser")).id}/>
    );
  }
}

export default ViewAdminProfile;
