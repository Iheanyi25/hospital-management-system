import React from "react";
import { observer } from "mobx-react";
import { DoctorProfile } from "../../Components/Profiles";
import { UserContext } from "../../mobx/UserState";
class ViewDoctorProfile extends React.Component {
  static contextType = UserContext;
  render() {
    const content = this.context;
    const { user } = content;
    return <DoctorProfile doctorId={user.id} />;
  }
}

export default observer(ViewDoctorProfile);
